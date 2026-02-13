import { User, Leave, Payment, HostelSetting } from "../models/index.js";
import { Op } from "sequelize";

export const getManagerDashboard = async (req, res) => {
  try {

    const hostel_id = req.user.hostel_id;

    

    const totalStudents = await User.count({
      where: { hostel_id, role: "student" },
    });

   

    const pendingLeaves = await Leave.findAll({
      where: {
        hostel_id,
        status: "pending",
      },
      include: {
        model: User,
        attributes: ["id", "name", "room_number"],
      },
    });


    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todayLeaves = await Leave.findAll({
      where: {
        hostel_id,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      include: {
        model: User,
        attributes: ["id", "name", "room_number"],
      },
    });

  

    const pendingBills = await Payment.count({
      where: {
        hostel_id,
        status: "pending",
      },
    });

  

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthNames = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const monthString = `${monthNames[currentMonth]}-${currentYear}`;

    const monthlyRevenue = await Payment.sum("amount", {
      where: {
        hostel_id,
        month: monthString,
        status: "paid",
      },
    });

    

    const settings = await HostelSetting.findOne({
      where: { hostel_id },
    });

    res.json({
      totalStudents,
      pendingLeaves,
      todayLeaves,
      pendingBills,
      monthlyRevenue: monthlyRevenue || 0,
      settings,
    });

  } catch (error) {
    console.error("Manager dashboard error:", error);
    res.status(500).json({
      message: "Server error fetching manager dashboard",
    });
  }
};
