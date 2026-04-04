import crypto from "crypto";

export const verifyRazorpaySignature = (
  orderId,
  paymentId,
  signature,
  secret,
) => {
  const body = orderId + "|" + paymentId;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
};
