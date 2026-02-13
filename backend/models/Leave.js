import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Leave = sequelize.define("Leave", {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  hostel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  total_days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  },

  refund_amount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  is_adjusted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

export default Leave;
