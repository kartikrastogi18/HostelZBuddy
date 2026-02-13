import { Payment, Announcement, MessMenu, Leave } from "../models/index.js";

export const getStudentDashboard = async (req, res) => {
  try {

   

    const pendingBill = await Payment.findOne({
      where: {
        student_id: req.user.id,
        status: "pending",
      },
    });

    

    const announcements = await Announcement.findAll({
      where: {
        hostel_id: req.user.hostel_id,
      },
      order: [["createdAt", "DESC"]],
    });

   

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const todayName = days[new Date().getDay()];

    const todayMenu = await MessMenu.findOne({
      where: {
        hostel_id: req.user.hostel_id,
        day: todayName,
      },
    });

    

    const myLeaves = await Leave.findAll({
      where: { student_id: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json({
      student: {
        id: req.user.id,
        name: req.user.name,
        hostel_id: req.user.hostel_id,
      },
      pendingBill,
      announcements,
      todayMenu,
      myLeaves,
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      message: "Server error fetching dashboard",
    });
  }
};
