import { MessMenu } from "../models/index.js";


export const upsertMenu = async (req, res) => {
  try {
    const { day, breakfast, lunch, dinner } = req.body;

    if (!day) {
      return res.status(400).json({ message: "Day is required" });
    }

    const [menu] = await MessMenu.findOrCreate({
      where: {
        hostel_id: req.user.hostel_id,
        day,
      },
      defaults: {
        hostel_id: req.user.hostel_id,
        breakfast,
        lunch,
        dinner,
      },
    });

    if (!menu.isNewRecord) {
      menu.breakfast = breakfast;
      menu.lunch = lunch;
      menu.dinner = dinner;
      await menu.save();
    }

    res.json({
      message: "Menu updated successfully",
      menu,
    });

  } catch (error) {
    console.error("Menu error:", error);
    res.status(500).json({ message: "Server error updating menu" });
  }
};


export const getFullMenu = async (req, res) => {
  try {
    const menu = await MessMenu.findAll({
      where: { hostel_id: req.user.hostel_id },
    });

    res.json(menu);

  } catch (error) {
    res.status(500).json({ message: "Error fetching menu" });
  }
};
