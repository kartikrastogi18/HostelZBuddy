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
    type: DataTypes.STRING,
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
