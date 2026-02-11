import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

await sequelize.sync({ alter: true });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
