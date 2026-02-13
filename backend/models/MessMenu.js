import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const MessMenu = sequelize.define("MessMenu", {
  hostel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  day: {
    type: DataTypes.STRING, // Monday, Tuesday
    allowNull: false,
  },

  breakfast: {
    type: DataTypes.TEXT,
  },

  lunch: {
    type: DataTypes.TEXT,
  },

  dinner: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
});

export default MessMenu;
