import { Payment, User, Hostel } from "../models/index.js";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

export const downloadInvoice = async (req, res) => {
  try {

    const { payment_id } = req.params;

    const payment = await Payment.findByPk(payment_id, {
      include: [
        {
          model: User,
          attributes: ["name", "email", "room_number"],
        },
        {
          model: Hostel,
          attributes: ["name"],
        },
      ],
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

    // Define invoice folder
    const invoicesDir = path.join(process.cwd(), "invoices");

    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir);
    }

    const filePath = path.join(
      invoicesDir,
      `invoice_${payment.id}.pdf`
    );

    // Call Python script to generate invoice
    const pythonScript = `
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4
from datetime import datetime

doc = SimpleDocTemplate("${filePath}", pagesize=A4)
elements = []
styles = getSampleStyleSheet()

elements.append(Paragraph("${payment.Hostel.name}", styles["Heading1"]))
elements.append(Spacer(1, 10))
elements.append(Paragraph("Payment Invoice", styles["Heading2"]))
elements.append(Spacer(1, 20))

data = [
["Student Name:", "${payment.User.name}"],
["Email:", "${payment.User.email}"],
["Room Number:", "${payment.User.room_number}"],
["Billing Month:", "${payment.month}/${payment.year}"],
["Amount Paid:", "₹ ${payment.amount}"],
["Transaction ID:", "${payment.transaction_id}"],
["Payment Date:", "${payment.paid_at.toISOString().split('T')[0]}"],
]

table = Table(data, colWidths=[150, 320])
table.setStyle(TableStyle([
('GRID', (0,0), (-1,-1), 0.5, colors.grey),
]))

elements.append(table)
elements.append(Spacer(1, 30))
elements.append(Paragraph("This is a system-generated invoice.", styles["Normal"]))

doc.build(elements)
`;

const tempScriptPath = path.join(invoicesDir, `temp_invoice_${payment.id}.py`);

fs.writeFileSync(tempScriptPath, pythonScript);

exec(`python "${tempScriptPath}"`, (err) => {

  fs.unlinkSync(tempScriptPath); // delete temp file

  if (err) {
    console.error("Invoice generation error:", err);
    return res.status(500).json({
      message: "Error generating invoice",
    });
  }

  res.download(filePath);
});


  } catch (error) {
    console.error("Invoice error:", error);
    res.status(500).json({
      message: "Server error generating invoice",
    });
  }
};
