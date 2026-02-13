import { Announcement } from "../models/index.js";


export const createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;

    const announcement = await Announcement.create({
      hostel_id: req.user.hostel_id,
      title,
      message,
    });

    res.status(201).json({
      message: "Announcement created",
      announcement,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating announcement",
    });
  }
};


export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByPk(id);

    if (!announcement) {
      return res.status(404).json({ message: "Not found" });
    }

    if (announcement.hostel_id !== req.user.hostel_id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await announcement.destroy();

    res.json({ message: "Announcement deleted" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting announcement" });
  }
};
