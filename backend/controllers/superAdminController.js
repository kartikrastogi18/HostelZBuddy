import { Hostel, User, Payment } from "../models/index.js";
import { Op } from "sequelize";

export const getSuperAdminDashboard = async (req, res) => {
  try {

    const totalHostels = await Hostel.count();

    const totalStudents = await User.count({
      where: { role: "student" },
    });

    const totalManagers = await User.count({
      where: { role: "manager" },
    });

    const totalRevenue = await Payment.sum("amount", {
      where: { status: "paid" },
    });

    const revenueByHostel = await Payment.findAll({
      attributes: [
        "hostel_id",
        [Payment.sequelize.fn("SUM", Payment.sequelize.col("amount")), "total_revenue"]
      ],
      where: { status: "paid" },
      group: ["hostel_id"],
    });

    res.json({
      totalHostels,
      totalStudents,
      totalManagers,
      totalRevenue: totalRevenue || 0,
      revenueByHostel,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching super admin dashboard",
    });
  }
};
