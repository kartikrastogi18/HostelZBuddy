import Stripe from "stripe";
import { Payment } from "../models/index.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* ==========================================
   CREATE STRIPE CHECKOUT SESSION
========================================== */

export const createStripeSession = async (req, res) => {
  try {

    const { payment_id } = req.body;

    const payment = await Payment.findByPk(payment_id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    if (payment.status === "paid") {
      return res.status(400).json({
        message: "Already paid",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Hostel Fee ${payment.month}/${payment.year}`,
            },
            unit_amount: payment.amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/payment-cancel`,
    });

    payment.stripe_session_id = session.id;
    await payment.save();

    res.json({
      url: session.url,
    });

  } catch (error) {
    console.error("Stripe Session Error:", error);
    res.status(500).json({
      message: "Error creating Stripe session",
    });
  }
};

/* ==========================================
   VERIFY STRIPE SESSION AFTER SUCCESS
========================================== */

export const verifyStripeSession = async (req, res) => {
  try {

    const { session_id } = req.params;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        message: "Payment not completed",
      });
    }

    const payment = await Payment.findOne({
      where: { stripe_session_id: session_id },
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment record not found",
      });
    }

    if (payment.status === "paid") {
      return res.json({
        message: "Already verified",
      });
    }

    payment.status = "paid";
    payment.transaction_id = session.payment_intent;
    payment.paid_at = new Date();

    await payment.save();

    res.json({
      message: "Payment verified successfully",
      payment,
    });

  } catch (error) {
    console.error("Stripe Verify Error:", error);
    res.status(500).json({
      message: "Error verifying payment",
    });
  }
};
