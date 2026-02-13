import { Payment, Leave, HostelSetting } from "../models/index.js";
import { Op } from "sequelize";

export const generateMonthlyBill = async (req, res) => {
    try{
        const today=new Date(); 
        const currentMonth=today.getMonth();
        const currentYear=today.getFullYear();
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];
          const monthString=`${monthNames[currentMonth]}-${currentYear}`;
          const existingBill = await Payment.findOne({
            where: {
              student_id: req.user.id,
              month: monthString,
            },
          });
          if(existingBill){
            return res.status(400).json({message:'Monthly bill already generated for this month'});
          }
          const hostelSetting=await HostelSetting.findOne({where:{hostel_id:req.user.hostel_id}});
          if(!hostelSetting){
            return res.status(400).json({message:'Hostel settings not found'});
          }
          const leaves = await Leave.findAll({
            where: {
              student_id: req.user.id,
              status: "approved",
              is_adjusted: false,
            },
          });
          let totalRefund = 0;

          leaves.forEach((leave) => {
            totalRefund += leave.refund_amount;
          });
          let fineAmount = 0;

          const dueDate = new Date(currentYear, currentMonth, setting.payment_due_day);
      
          if (today > dueDate) {
            const daysLate =
              Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
      
            fineAmount = daysLate * setting.fine_per_day;
          }
          
    const baseAmount = setting.monthly_charge;
    const finalAmount = baseAmount - totalRefund + fineAmount;
    const payment = await Payment.create({
        student_id: req.user.id,
        hostel_id: req.user.hostel_id,
        month: monthString,
        amount: finalAmount,
        fine_amount: fineAmount,
        status: "pending",
      });
      for (let leave of leaves) {
        leave.is_adjusted = true;
        await leave.save();
      }
      
    res.json({
        message: "Monthly bill generated",
        baseAmount,
        totalRefund,
        fineAmount,
        finalAmount,
        payment,
      });
  
    }catch(error){
        console.error('Error generating monthly bill:',error);
        res.status(500).json({message:'Server error while generating monthly bill'});
    }
}