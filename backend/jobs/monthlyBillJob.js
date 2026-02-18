import cron from "node-cron";
import { User, Payment, Leave, HostelSetting } from "../models/index.js";
import { sendEmail } from "../utils/emailService.js";

export const startMonthlyBillCron = () => {
  cron.schedule("5 0 1 * *", async () => {
    console.log("Running Monthly Bill Cron Job...");

    try {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      const students = await User.findAll({
        where: { role: "student" },
      });

      for (let student of students) {
        const existingBill = await Payment.findOne({
          where: {
            student_id: student.id,
            month,
            year,
          },
        });

        if (existingBill) continue;

        const setting = await HostelSetting.findOne({
          where: { hostel_id: student.hostel_id },
        });

        if (!setting) continue;

        const leaves = await Leave.findAll({
          where: {
            student_id: student.id,
            status: "approved",
            is_adjusted: false,
          },
        });

        let totalRefund = 0;

        for (let leave of leaves) {
          totalRefund += leave.refund_amount;
        }

        const baseAmount = setting.monthly_charge;
        const finalAmount = baseAmount - totalRefund;

        const payment = await Payment.create({
          student_id: student.id,
          hostel_id: student.hostel_id,
          month,
          year,
          amount: finalAmount,
          fine_amount: 0,
          status: "pending",
        });
        await sendEmail(
            student.email,
            "New Monthly Hostel Bill Generated",
            `Dear ${student.name},
          
          Your hostel bill for ${month}/${year} has been generated.
          
          Total Amount: ₹${finalAmount}
          
          Please pay before due date to avoid fine.
          
          Regards,
          Hostel Management`
          );
          
        for (let leave of leaves) {
          leave.is_adjusted = true;
          await leave.save();
        }

        console.log(`Bill generated for student ${student.id}`);
      }

      console.log("Monthly Bill Cron Completed");
    } catch (error) {
      console.error("Cron Job Error:", error);
    }
  });
};
