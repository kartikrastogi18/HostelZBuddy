import sequelize from "../db.js";

// Import all models
import User from "./User.js";
import Hostel from "./hostel.js";
import Leave from "./Leave.js";
import MealAttendance from "./MealAttendance.js";
import Complaint from "./Complaint.js";
import MealFeedback from "./MealFeedback.js";
import Payment from "./Payment.js";
import HostelSetting from "./HostelSetting.js";
import Announcement from "./Announcement.js";
import MessMenu from "./Messmenu.js";
import HostelImage from "./HostelImage.js";







/* ==============================
   RELATIONS START HERE
================================= */

// Hostel ↔ Users
Hostel.hasMany(User, { foreignKey: "hostel_id", onDelete: "CASCADE" });
User.belongsTo(Hostel, { foreignKey: "hostel_id" });

// User ↔ Leave
User.hasMany(Leave, { foreignKey: "student_id", onDelete: "CASCADE" });
Leave.belongsTo(User, { foreignKey: "student_id" });

// Hostel ↔ Leave
Hostel.hasMany(Leave, { foreignKey: "hostel_id" });
Leave.belongsTo(Hostel, { foreignKey: "hostel_id" });

// User ↔ Meal Attendance
User.hasMany(MealAttendance, { foreignKey: "student_id" });
MealAttendance.belongsTo(User, { foreignKey: "student_id" });

// Hostel ↔ Meal Attendance
Hostel.hasMany(MealAttendance, { foreignKey: "hostel_id" });
MealAttendance.belongsTo(Hostel, { foreignKey: "hostel_id" });

// User ↔ Complaint
User.hasMany(Complaint, { foreignKey: "student_id" });
Complaint.belongsTo(User, { foreignKey: "student_id" });

// Hostel ↔ Complaint
Hostel.hasMany(Complaint, { foreignKey: "hostel_id" });
Complaint.belongsTo(Hostel, { foreignKey: "hostel_id" });

// User ↔ Feedback
User.hasMany(MealFeedback, { foreignKey: "student_id" });
MealFeedback.belongsTo(User, { foreignKey: "student_id" });

// Hostel ↔ Feedback
Hostel.hasMany(MealFeedback, { foreignKey: "hostel_id" });
MealFeedback.belongsTo(Hostel, { foreignKey: "hostel_id" });

// User ↔ Payment
User.hasMany(Payment, { foreignKey: "student_id" });
Payment.belongsTo(User, { foreignKey: "student_id" });

// Hostel ↔ Payment
Hostel.hasMany(Payment, { foreignKey: "hostel_id" });
Payment.belongsTo(Hostel, { foreignKey: "hostel_id" });

// Hostel ↔ HostelSetting (1:1)
Hostel.hasOne(HostelSetting, { foreignKey: "hostel_id" });
HostelSetting.belongsTo(Hostel, { foreignKey: "hostel_id" });


Hostel.hasMany(Announcement, { foreignKey: "hostel_id" });
Announcement.belongsTo(Hostel, { foreignKey: "hostel_id" });

Hostel.hasMany(MessMenu, { foreignKey: "hostel_id" });
MessMenu.belongsTo(Hostel, { foreignKey: "hostel_id" });

Hostel.hasMany(HostelImage, { foreignKey: "hostel_id" });
HostelImage.belongsTo(Hostel, { foreignKey: "hostel_id" });
/* ==============================
   EXPORT EVERYTHING
================================= */

export {
  sequelize,
  User,
  Hostel,
  Leave,
  MealAttendance,
  Complaint,
  MealFeedback,
  Payment,
  HostelSetting,
  Announcement,
  MessMenu,
  HostelImage,
};
