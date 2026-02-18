import { Payment, User, Hostel } from "../models/index.js";
// import { generateInvoicePDF } from "../utils/invoiceGenerator.js";

export const downloadInvoice = async (req, res) => {
  try {

    const { payment_id } = req.params;

    const payment = await Payment.findByPk(payment_id, {
      include: [User, Hostel],
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.status !== "paid") {
      return res.status(400).json({
        message: "Invoice available only for paid payments",
      });
    }

    const invoiceData = {
      id: payment.id,
      hostelName: payment.Hostel.name,
      studentName: payment.User.name,
      email: payment.User.email,
      room: payment.User.room_number,
      month: payment.month,
      year: payment.year,
      amount: payment.amount,
      transactionId: payment.transaction_id,
      paymentDate: payment.paid_at.toISOString().split("T")[0],
    };

    const filePath = await generateInvoicePDF(invoiceData);

    res.download(filePath);

  } catch (error) {
    console.error("Invoice error:", error);
    res.status(500).json({
      message: "Error generating invoice",
    });
  }
};
