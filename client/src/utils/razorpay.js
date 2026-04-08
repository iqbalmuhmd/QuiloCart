export const openRazorpayCheckout = ({
  keyId,
  razorpayOrderId,
  amount,
  currency,
}) => {
  return new Promise((resolve, reject) => {
    const options = {
      key: keyId,
      order_id: razorpayOrderId,
      amount: amount * 100,
      currency,
      handler: (response) => {
        resolve({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      modal: {
        ondismiss: () => {
          reject(new Error("Payment cancelled"));
        },
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  });
};
