import { MealAttendance, User } from "../models/index.js";
import { Op } from "sequelize";

export const getAttendanceAnalytics = async (req, res) => {
  try {

    const hostel_id = req.user.hostel_id;
    const today = new Date().toISOString().split("T")[0];

    /* ==========================
       TODAY MEAL COUNTS
    ========================== */

    const todayBreakfast = await MealAttendance.count({
      where: {
        hostel_id,
        meal_type: "breakfast",
        date: today,
      },
    });

    const todayLunch = await MealAttendance.count({
      where: {
        hostel_id,
        meal_type: "lunch",
        date: today,
      },
    });

    const todayDinner = await MealAttendance.count({
      where: {
        hostel_id,
        meal_type: "dinner",
        date: today,
      },
    });

    /* ==========================
       MONTHLY TOTAL MEALS
    ========================== */

    const startOfMonth = new Date();
    startOfMonth.setDate(1);

    const monthlyMeals = await MealAttendance.count({
      where: {
        hostel_id,
        scanned_at: {
          [Op.gte]: startOfMonth,
        },
      },
    });

    /* ==========================
       TOP 10 ACTIVE STUDENTS
    ========================== */

    const studentStats = await MealAttendance.findAll({
      where: { hostel_id },
      attributes: [
        "student_id",
        [MealAttendance.sequelize.fn("COUNT", MealAttendance.sequelize.col("student_id")), "meal_count"]
      ],
      group: ["student_id"],
      order: [[MealAttendance.sequelize.literal("meal_count"), "DESC"]],
      limit: 10,
      include: {
        model: User,
        attributes: ["name", "room_number"],
      },
    });

    res.json({
      today: {
        breakfast: todayBreakfast,
        lunch: todayLunch,
        dinner: todayDinner,
      },
      monthlyMeals,
      topStudents: studentStats,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching attendance analytics",
    });
  }
};
