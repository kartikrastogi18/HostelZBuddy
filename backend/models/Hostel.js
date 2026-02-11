import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Hostel = sequelize.define("Hostel", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  code: {
    type: DataTypes.STRING,
    unique: true,
  },
});

export default Hostel;
