import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Complaint = sequelize.define("Complaint", {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  hostel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("pending", "in_progress", "resolved"),
    defaultValue: "pending",
  },

  admin_response: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
});

export default Complaint;
