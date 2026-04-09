let razorpayScriptPromise = null;

export const loadRazorpayScript = () => {
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve, reject) => {
    if (document.getElementById("razorpay-script")) {
      return resolve();
    }

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));

    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
};

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
