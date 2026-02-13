// import QRCode from 'qrcode';
// const mealTimings = {
//     breakfast: { start: 7, end: 10 },
//     lunch: { start: 12, end: 15 },
//     dinner: { start: 19, end: 22 },
//   };
  
// export const generateMealQR=async(req,res)=>{
//     try{
//         const{meal_type}=req.body;
//         if(!meal_type){
//             return res.status(400).json({message:'Meal type is required'});
//         }
//         const today = new Date().toISOString().split("T")[0];
//         const qrData={
//             hostel_id:req.user.hostel_id,
//             meal_type,
//             date:today,
//             secret:process.env.QR_SECRET
//         }
//         const qrString=JSON.stringify(qrData);
//         const qrImage=await QRCode.toDataURL(qrString);
//         res.json({
//             message: "QR generated",
//             qrImage,
//             qrData
//           });


//     }catch (error) {
//         res.status(500).json({
//           message: "Error generating QR",
//         });
//       }
//     };
import QRCode from "qrcode";

const mealTimings = {
  breakfast: { start: 7, end: 10 },
  lunch: { start: 12, end: 15 },
  dinner: { start: 19, end: 22 },
};

export const generateMealQR = async (req, res) => {
  try {

    const { meal_type } = req.body;

    if (!mealTimings[meal_type]) {
      return res.status(400).json({
        message: "Invalid meal type",
      });
    }

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const qrData = {
      hostel_id: req.user.hostel_id,
      meal_type,
      date: todayString,
      generated_at: today.getTime(),
      secret: process.env.QR_SECRET
    };

    const qrString = JSON.stringify(qrData);

    const qrImage = await QRCode.toDataURL(qrString);

    res.json({
      message: "QR generated",
      qrImage,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error generating QR",
    });
  }
};
