import cron from "node-cron";
import { Payment, HostelSetting } from "../models/index.js";

export const startDailyFineCron = () => {

  // Run every day at 12:10 AM
  cron.schedule("10 0 * * *", async () => {

    console.log("Running Daily Fine Cron...");

    try {

      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      const pendingPayments = await Payment.findAll({
        where: {
          status: "pending",
          month: currentMonth,
          year: currentYear,
        },
      });

      for (let payment of pendingPayments) {

        const setting = await HostelSetting.findOne({
          where: { hostel_id: payment.hostel_id },
        });

        if (!setting) continue;

        const dueDate = new Date(
          currentYear,
          currentMonth - 1,
          setting.payment_due_day
        );

        if (today > dueDate) {

          payment.fine_amount += setting.fine_per_day;
          payment.amount += setting.fine_per_day;

          await payment.save();

          console.log(`Fine added for payment ${payment.id}`);
        }
      }

      console.log("Daily Fine Cron Completed");

    } catch (error) {
      console.error("Fine Cron Error:", error);
    }

  });

};
