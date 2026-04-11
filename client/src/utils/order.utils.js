import { ORDER_STATUS, PAYMENT_STATUS } from "@/constants";

export const statusStyles = {
  [ORDER_STATUS.CREATED]: "bg-blue-50 text-blue-700",
  [ORDER_STATUS.CONFIRMED]: "bg-purple-50 text-purple-700",
  [ORDER_STATUS.SHIPPED]: "bg-yellow-50 text-yellow-700",
  [ORDER_STATUS.DELIVERED]: "bg-green-50 text-green-700",
  [ORDER_STATUS.CANCELLED]: "bg-red-50 text-red-700",
};

export const paymentStatusStyles = {
  [PAYMENT_STATUS.PAID]: "bg-green-50 text-green-700",
  [PAYMENT_STATUS.COD]: "bg-gray-100 text-gray-600",
  [PAYMENT_STATUS.PENDING]: "bg-yellow-50 text-yellow-700",
  [PAYMENT_STATUS.FAILED]: "bg-red-50 text-red-700",
  [PAYMENT_STATUS.REFUNDED]: "bg-blue-50 text-blue-700",
};

export const NEXT_TRANSITION = {
  CREATED: { label: "Confirm", next: "CONFIRMED" },
  CONFIRMED: { label: "Mark as Shipped", next: "SHIPPED" },
  SHIPPED: { label: "Mark as Delivered", next: "DELIVERED" },
};