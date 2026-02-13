import { User } from "../models/index.js";

export const getMyHostelStudents = async (req, res) => {
  try {

    const students = await User.findAll({
      where: {
        hostel_id: req.user.hostel_id,
        role: "student",
      },
      attributes: { exclude: ["password"] }
    });

    res.json(students);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
