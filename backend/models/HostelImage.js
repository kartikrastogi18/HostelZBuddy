import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const HostelImage = sequelize.define("HostelImage", {
  hostel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  category: {
    type: DataTypes.ENUM("hostel", "mess"),
    allowNull: false,
  },
}, {
  timestamps: false,
});

export default HostelImage;
