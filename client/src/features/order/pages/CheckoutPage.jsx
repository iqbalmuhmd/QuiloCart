import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { clearCart } from "@/features/cart/cartSlice";
import orderApi from "../orderApi";
import { loadRazorpayScript, openRazorpayCheckout } from "@/utils/razorpay";
import useCheckout from "@/hooks/useCheckout";
import useAddresses from "@/hooks/useAddresses";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PAYMENT_METHOD } from "@/constants";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, totalAmount } = useSelector((state) => state.cart);
  const { checkoutSummary, checkoutLoading, checkoutError } = useCheckout();
  const {
    addresses,
    addressLoading,
    selectedAddressId,
    setSelectedAddressId,
    showAddressForm,
    setShowAddressForm,
    addressForm,
    handleAddressFormChange,
    handleAddressFormSubmit,
    savingAddress,
  } = useAddresses();

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.COD);

  const [placingOrder, setPlacingOrder] = useState(false);
  const [addressError, setAddressError] = useState(null);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setAddressError("Please add a delivery address to continue");
      return;
    }

    setAddressError(null);

    try {
      setPlacingOrder(true);
      const order = await orderApi.placeOrder(selectedAddressId, paymentMethod);

      if (paymentMethod === PAYMENT_METHOD.COD) {
        toast({
          title: "Order placed",
          description: "Your cash on delivery order has been confirmed.",
        });
        dispatch(clearCart());
        navigate(`/profile/orders/${order.id}`);
        return;
      }

      const paymentData = await orderApi.initiatePayment(order.id);

      await loadRazorpayScript();

      const razorpayResponse = await openRazorpayCheckout({
        keyId: paymentData.keyId,
        razorpayOrderId: paymentData.razorpayOrderId,
        amount: paymentData.amount,
        currency: paymentData.currency,
      });

      await orderApi.verifyPayment(order.id, razorpayResponse);

      toast({
        title: "Payment successful",
        description: "Your order has been confirmed and paid online.",
      });
      dispatch(clearCart());
      navigate(`/profile/orders/${order.id}`);
    } catch (err) {
      if (err.message === "Payment cancelled") {
        toast({
          title: "Payment cancelled",
          description: "Your order was not completed. You can try again.",
        });
        return;
      }

      toast({
        variant: "destructive",
        title: "Order Failed",
        description:
          err.response?.data?.message || "Something went wrong. Try again.",
      });
    } finally {
      setPlacingOrder(false);
    }
  };

  if (addressLoading || checkoutLoading) {
    return <p className="p-6 text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-[1fr_380px] gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          {/* Address Section */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Delivery address
            </p>

            {/* Existing address cards */}
            {addresses.map((addr) => (
              <div
                key={addr._id}
                onClick={() => setSelectedAddressId(addr._id)}
                className={`border rounded-xl p-4 mb-2 cursor-pointer transition-colors ${
                  selectedAddressId === addr._id
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                <p className="text-sm font-medium">
                  {addr.name}
                  {addr.isDefault && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                      default
                    </span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{addr.phone}</p>
                <p className="text-sm text-muted-foreground">
                  {addr.addressLine1}
                  {addr.addressLine2 && `, ${addr.addressLine2}`}, {addr.city},{" "}
                  {addr.country}
                </p>
              </div>
            ))}

            {/* Add new address — dashed card or inline form */}
            {!showAddressForm ? (
              <div
                onClick={() => setShowAddressForm(true)}
                className="border-2 border-dashed border-gray-200 rounded-xl p-4 mb-2 cursor-pointer flex items-center gap-2 text-sm text-muted-foreground hover:border-gray-400 hover:text-black transition-colors"
              >
                <span className="text-lg leading-none">+</span>
                {addresses.length === 0
                  ? "Add a delivery address"
                  : "Add new address"}
              </div>
            ) : (
              <div className="border border-gray-200 rounded-xl p-4 mb-2 space-y-3">
                <p className="text-sm font-medium">
                  {addresses.length === 0
                    ? "Add a delivery address"
                    : "New address"}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="name"
                    placeholder="Full name"
                    value={addressForm.name}
                    onChange={handleAddressFormChange}
                    className="col-span-2"
                  />
                  <Input
                    name="phone"
                    placeholder="Phone"
                    value={addressForm.phone}
                    onChange={handleAddressFormChange}
                  />
                  <Input
                    name="city"
                    placeholder="City"
                    value={addressForm.city}
                    onChange={handleAddressFormChange}
                  />
                  <Input
                    name="addressLine1"
                    placeholder="Address line 1"
                    value={addressForm.addressLine1}
                    onChange={handleAddressFormChange}
                    className="col-span-2"
                  />
                  <Input
                    name="state"
                    placeholder="State"
                    value={addressForm.state}
                    onChange={handleAddressFormChange}
                  />
                  <Input
                    name="postalCode"
                    placeholder="Postal code"
                    value={addressForm.postalCode}
                    onChange={handleAddressFormChange}
                  />
                  <Input
                    name="country"
                    placeholder="Country"
                    value={addressForm.country}
                    onChange={handleAddressFormChange}
                    className="col-span-2"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <Button
                    onClick={handleAddressFormSubmit}
                    disabled={savingAddress}
                  >
                    {savingAddress ? "Saving..." : "Save address"}
                  </Button>
                  {addresses.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setShowAddressForm(false)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Address validation error — only when Place Order clicked with no address */}
            {addressError && (
              <p className="text-sm text-red-600 mt-1">{addressError}</p>
            )}
          </div>

          {/* Order Items */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Order items
            </p>
            <div className="border border-gray-200 rounded-xl divide-y">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center p-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-lg object-cover border border-gray-100"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ${item.product.price} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ${item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — sticky summary */}
        <div className="sticky top-6 h-fit space-y-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Order summary
          </p>
          <div className="border border-gray-200 rounded-xl p-4 space-y-3">
            {/* Cart error — inline block */}
            {checkoutError ? (
              <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg p-3 space-y-1">
                <p className="text-sm font-medium">Cannot place order</p>
                <p className="text-xs">{checkoutError}</p>
                <Link to="/cart" className="text-xs underline block">
                  Go to cart to fix this
                </Link>
              </div>
            ) : (
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="text-sm">
                  ${checkoutSummary ? checkoutSummary.totalAmount : totalAmount}
                </p>
              </div>
            )}

            {!checkoutError && (
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Total</p>
                <p className="text-base font-medium">
                  ${checkoutSummary ? checkoutSummary.totalAmount : totalAmount}
                </p>
              </div>
            )}

            {!checkoutError && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Payment method
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() => setPaymentMethod(PAYMENT_METHOD.COD)}
                    className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                      paymentMethod === PAYMENT_METHOD.COD
                        ? "border-black bg-gray-50"
                        : "border-gray-200"
                    }`}
                  >
                    Cash on Delivery
                  </div>

                  <div
                    onClick={() => setPaymentMethod(PAYMENT_METHOD.ONLINE)}
                    className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                      paymentMethod === PAYMENT_METHOD.ONLINE
                        ? "border-black bg-gray-50"
                        : "border-gray-200"
                    }`}
                  >
                    Pay Online
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={!!checkoutError || placingOrder || !checkoutSummary}
              className="w-full py-3 bg-black text-white text-sm font-medium rounded-lg disabled:opacity-40 mt-2"
            >
              {placingOrder
                ? "Placing order..."
                : paymentMethod === PAYMENT_METHOD.ONLINE
                  ? "Place & pay"
                  : "Place order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
