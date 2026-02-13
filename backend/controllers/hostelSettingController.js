import { HostelSetting } from "../models/index.js";

export const updateHostelSettings = async (req, res) => {
  try {

    const { monthly_charge, fine_per_day, payment_due_day } = req.body;

    const [setting] = await HostelSetting.findOrCreate({
      where: { hostel_id: req.user.hostel_id },
      defaults: {
        monthly_charge,
        fine_per_day,
        payment_due_day,
      },
    });

    if (!setting.isNewRecord) {
      setting.monthly_charge = monthly_charge;
      setting.fine_per_day = fine_per_day;
      setting.payment_due_day = payment_due_day;
      await setting.save();
    }

    res.json({
      message: "Hostel settings updated",
      setting,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating hostel settings",
    });
  }
};
