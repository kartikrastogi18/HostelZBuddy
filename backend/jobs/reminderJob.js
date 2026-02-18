import cron from "node-cron";
import { Payment, User } from "../models/index.js";
import { sendEmail } from "../utils/emailService.js";


export const startReminderCron = () => {

  // Run every day at 9 AM
  cron.schedule("0 9 * * *", async () => {

    await sendEmail(
        payment.User.email,
        "Hostel Fee Payment Reminder",
        `Dear ${payment.User.name},
      
      Your hostel mess bill for ${payment.month}/${payment.year} is still pending.
      
      Please clear your dues to avoid additional fine.
      
      Thank you,
      Hostel Management`
      );
      

    try {

      const pendingPayments = await Payment.findAll({
        where: { status: "pending" },
        include: {
          model: User,
          attributes: ["email", "name"],
        },
      });

      for (let payment of pendingPayments) {

        console.log(
          `Reminder: ${payment.User.name} (${payment.User.email}) has pending bill`
        );

        // Later: integrate nodemailer here
      }

      console.log("Reminder Cron Completed");

    } catch (error) {
      console.error("Reminder Cron Error:", error);
    }

  });

};
