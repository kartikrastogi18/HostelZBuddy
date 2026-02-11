import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const HostelSetting = sequelize.define("HostelSetting", {
  hostel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },

  monthly_charge: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  fine_per_day: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  min_leave_days: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },

  payment_due_day: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

export default HostelSetting;
