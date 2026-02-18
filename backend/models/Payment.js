import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Payment = sequelize.define("Payment", {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  hostel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  month: {
    type: DataTypes.INTEGER, // 1-12
    allowNull: false,
  },
  
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  fine_amount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  transaction_id: {
    type: DataTypes.STRING,
  },
  stripe_session_id: {
    type: DataTypes.STRING,
  },

  status: {
    type: DataTypes.ENUM("pending", "paid", "failed"),
    defaultValue: "pending",
  },

  paid_at: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
});

export default Payment;
