import { Payment, Leave, HostelSetting } from "../models/index.js";

export const generateMonthlyBill = async (req, res) => {
  try {

    const today = new Date();
    const month = today.getMonth() + 1; // 1-12
    const year = today.getFullYear();

   

    const existingBill = await Payment.findOne({
      where: {
        student_id: req.user.id,
        month,
        year,
      },
    });

    if (existingBill) {
      return res.status(400).json({
        message: "Monthly bill already generated",
      });
    }

   

    const setting = await HostelSetting.findOne({
      where: { hostel_id: req.user.hostel_id },
    });

    if (!setting) {
      return res.status(400).json({
        message: "Hostel settings not configured",
      });
    }

    

    const leaves = await Leave.findAll({
      where: {
        student_id: req.user.id,
        status: "approved",
        is_adjusted: false,
      },
    });

    let totalRefund = 0;

    for (let leave of leaves) {
      totalRefund += leave.refund_amount;
    }

    

    let fineAmount = 0;

    const dueDate = new Date(
      year,
      month - 1,
      setting.payment_due_day
    );

    if (today > dueDate) {
      const daysLate =
        Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));

      fineAmount = daysLate * setting.fine_per_day;
    }

    

    const baseAmount = setting.monthly_charge;
    const finalAmount = baseAmount - totalRefund + fineAmount;

    

    const payment = await Payment.create({
      student_id: req.user.id,
      hostel_id: req.user.hostel_id,
      month,
      year,
      amount: finalAmount,
      fine_amount: fineAmount,
      status: "pending",
    });

  

    for (let leave of leaves) {
      leave.is_adjusted = true;
      await leave.save();
    }

    res.json({
      message: "Monthly bill generated",
      baseAmount,
      totalRefund,
      fineAmount,
      finalAmount,
      payment,
    });

  } catch (error) {
    console.error("Bill generation error:", error);
    res.status(500).json({
      message: "Server error generating bill",
    });
  }
};

export const downloadInvoice = async (req, res) => {
  try {

    const { payment_id } = req.params;

    const payment = await Payment.findByPk(payment_id, {
      include: {
        model: User,
        attributes: ["name", "email", "room_number"],
      },
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    if (payment.status !== "paid") {
      return res.status(400).json({
        message: "Invoice available only for paid payments",
      });
    }

    res.json({
      message: "Use frontend invoice generator endpoint",
      payment,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching invoice data",
    });
  }
};

