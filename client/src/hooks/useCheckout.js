import { useState, useEffect } from "react";
import orderApi from "@/features/order/orderApi";

const useCheckout = () => {
  const [checkoutSummary, setCheckoutSummary] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  useEffect(() => {
    const runCheckout = async () => {
      try {
        setCheckoutLoading(true);
        setCheckoutError(null);
        const summary = await orderApi.checkout();
        setCheckoutSummary(summary);
      } catch (err) {
        setCheckoutError(
          err.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      } finally {
        setCheckoutLoading(false);
      }
    };

    runCheckout();
  }, []);

  return { checkoutSummary, checkoutLoading, checkoutError };
};

export default useCheckout;
