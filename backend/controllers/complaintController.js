import { Complaint, User } from "../models/index.js";


export const createComplaint = async (req, res) => {
  try {
    const { category, description } = req.body;

    if (!category || !description) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const complaint = await Complaint.create({
      student_id: req.user.id,
      hostel_id: req.user.hostel_id,
      category,
      description,
    });

    res.status(201).json({
      message: "Complaint submitted",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating complaint",
    });
  }
};


export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.findAll({
      where: { student_id: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching complaints",
    });
  }
};



export const getHostelComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.findAll({
      where: { hostel_id: req.user.hostel_id },
      include: {
        model: User,
        attributes: ["id", "name", "room_number"],
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching hostel complaints",
    });
  }
};


export const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_response } = req.body;

    const complaint = await Complaint.findByPk(id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    
    if (complaint.hostel_id !== req.user.hostel_id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    if (status) complaint.status = status;
    if (admin_response) complaint.admin_response = admin_response;

    await complaint.save();

    res.json({
      message: "Complaint updated",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating complaint",
    });
  }
};
