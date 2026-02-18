import { Hostel, HostelImage } from "../models/index.js";

export const getHostelDetails = async (req, res) => {
  try {

    const { id } = req.params;

    const hostel = await Hostel.findByPk(id, {
      include: HostelImage,
    });

    if (!hostel) {
      return res.status(404).json({
        message: "Hostel not found",
      });
    }

    res.json(hostel);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching hostel details",
    });
  }
};
