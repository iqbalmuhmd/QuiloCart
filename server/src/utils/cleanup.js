import cron from "node-cron";
import Order from "@/module/order/order.model";
import Product from "@/module/product/product.model";
import { PAYMENT_STATUS, ORDER_STATUS } from "@/utils/constants";

const cleanupPendingOrders = async () => {
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

  const staleOrders = await Order.find({
    paymentStatus: PAYMENT_STATUS.PENDING,
    createdAt: { $lt: thirtyMinutesAgo },
  });

  for (const order of staleOrders) {
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: item.quantity },
      });
    }
    order.status = ORDER_STATUS.CANCELLED;
    order.paymentStatus = PAYMENT_STATUS.FAILED;
    await order.save();

    console.log(`Cleaned up stale order: ${order._id}`);
  }
  console.log(`Cleanup complete. ${staleOrders.length} orders processed.`);
};

export const startCleanupJob = () => {
  cron.schedule("*/15 * * * *", () => {
    console.log("Running pending order cleanup...");
    cleanupPendingOrders();
  });
};
