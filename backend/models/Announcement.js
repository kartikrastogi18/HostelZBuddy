import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Announcement = sequelize.define("Announcement", {
  hostel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Announcement;
