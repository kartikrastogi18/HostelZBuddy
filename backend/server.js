import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
// import { User } from "./models/index.js";
// import bcrypt from "bcrypt";

dotenv.config();
import hostelRoutes from "./routes/hostelRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";


import dashboardRoutes from "./routes/dashboardRoutes.js";

import managerRoutes from "./routes/managerRoutes.js";



import menuRoutes from "./routes/menuRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";

import complaintRoutes from "./routes/complaintRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";






const app = express();
app.use(express.json());
app.use("/api/hostels", hostelRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/qr", qrRoutes);
const PORT = process.env.PORT || 5000;

await sequelize.sync({ alter: true });
// app.get("/create-admin", async (req, res) => {
//   const hashed = await bcrypt.hash("admin123", 10);

//   const admin = await User.create({
//     name: "Super Admin",
//     email: "admin@gmail.com",
//     password: hashed,
//     role: "super_admin",
//     hostel_id: null,
//   });

//   res.json(admin);
// });



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
