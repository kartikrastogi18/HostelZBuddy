import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const MealAttendance = sequelize.define("MealAttendance", {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  hostel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  meal_type: {
    type: DataTypes.ENUM("breakfast", "lunch", "dinner"),
    allowNull: false,
  },

  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },

  scanned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

export default MealAttendance;
