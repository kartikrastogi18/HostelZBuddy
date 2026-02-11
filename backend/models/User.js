import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("super_admin", "manager", "student"),
    allowNull: false,
  },

  hostel_id: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },

  room_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default User;
