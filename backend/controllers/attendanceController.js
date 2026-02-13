// import { MealAttendance } from "../models/index.js";
// export const scanMealQR=async(req,res)=>{
//     try{
//         const {qrData}=req.body;
//         if(!qrData){
//             return res.status(400).json({message:'QR data is required'});
//         }
//         const parsed=JSON.parse(qrData);
//         if(parsed.secret!=process.env.QR_SECRET){
//             return res.status(400).json({message:'Invalid QR code'});
//         }
//         if(parsed.hostel_id!=req.user.hostel_id){
//             return res.status(400).json({message:'QR code does not belong to your hostel'});
//         }
//         const existing=await MealAttendance.findOne({
//             where:{
//                 user_id:req.user.id,
//                 meal_type:parsed.meal_type,
//                 date:parsed.date
//             }
//         });
//         if(existing){
//             return res.status(400).json({message:'You have already scanned this QR code for this meal'});
//         }
//         const attendance=await MealAttendance.create({
//             student_id:req.user.id,
//             hostel_id:parsed.hostel_id,
//             meal_type:parsed.meal_type,
//             date:parsed.date,
//         });
//         res.json({
//             message: "Meal attendance marked",
//             attendance,
//           });

//     }catch(error){
//         res.status(500).json({message:'Error scanning meal QR code'});
//     }
// }
import { MealAttendance } from "../models/index.js";

const mealTimings = {
  breakfast: { start: 7, end: 10 },
  lunch: { start: 12, end: 15 },
  dinner: { start: 19, end: 22 },
};

export const scanMealQR = async (req, res) => {
  try {

    const { qrData } = req.body;
    const parsed = JSON.parse(qrData);

    // Secret check
    if (parsed.secret !== process.env.QR_SECRET) {
      return res.status(400).json({ message: "Invalid QR" });
    }

    // Hostel check
    if (parsed.hostel_id !== req.user.hostel_id) {
      return res.status(403).json({ message: "Wrong hostel QR" });
    }

    // Date check
    const today = new Date().toISOString().split("T")[0];
    if (parsed.date !== today) {
      return res.status(400).json({ message: "QR expired" });
    }

    // Time restriction check
    const currentHour = new Date().getHours();
    const timing = mealTimings[parsed.meal_type];

    if (!timing ||
        currentHour < timing.start ||
        currentHour > timing.end) {
      return res.status(400).json({
        message: "Meal time closed",
      });
    }

    // Prevent duplicate
    const existing = await MealAttendance.findOne({
      where: {
        student_id: req.user.id,
        meal_type: parsed.meal_type,
        date: parsed.date,
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "Already marked",
      });
    }

    const attendance = await MealAttendance.create({
      student_id: req.user.id,
      hostel_id: req.user.hostel_id,
      meal_type: parsed.meal_type,
      date: parsed.date,
    });

    res.json({
      message: "Attendance marked",
      attendance,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error scanning QR",
    });
  }
};
