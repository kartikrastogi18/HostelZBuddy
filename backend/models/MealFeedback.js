import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const MealFeedback = sequelize.define("MealFeedback", {
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

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },

  comment: {
    type: DataTypes.TEXT,
  },

  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

export default MealFeedback;
