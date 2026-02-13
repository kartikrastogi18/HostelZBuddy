import { Op } from "sequelize";
import {Leave ,HostelSetting} from '../models/index.js';
import { Payment } from "../models/index.js";
export const applyLeave = async (req, res) => {
    try {
      const { start_date, end_date } = req.body;
  
      if (!start_date || !end_date) {
        return res.status(400).json({ message: "Dates are required" });
      }
  
      const start = new Date(start_date);
      const end = new Date(end_date);
  
      if (end < start) {
        return res.status(400).json({ message: "End date must be after start date" });
      }
  
      const total_days =
        Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  
      if (total_days <= 0) {
        return res.status(400).json({ message: "Invalid date range" });
      }
  
      if (total_days > 4) {
        return res.status(400).json({ message: "Leave cannot exceed 4 days" });
      }
  
     
  
      const existingLeave = await Leave.findOne({
        where: {
          student_id: req.user.id,
          start_date: {
            [Op.gte]: new Date(start.getFullYear(), start.getMonth(), 1),
            [Op.lte]: new Date(start.getFullYear(), start.getMonth() + 1, 0),
          },
        },
      });
  
      if (existingLeave) {
        return res.status(400).json({
          message: "Only one leave allowed per month",
        });
      }
  
    
  
      const today = new Date();
      let targetMonth = today.getMonth() - 2;
      let targetYear = today.getFullYear();
  
      if (targetMonth < 0) {
        targetMonth += 12;
        targetYear -= 1;
      }
  
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
  
      const monthString = `${monthNames[targetMonth]}-${targetYear}`;
  
      const oldDue = await Payment.findOne({
        where: {
          student_id: req.user.id,
          month: monthString,
          status: "pending",
        },
      });
  
      if (oldDue) {
        return res.status(400).json({
          message: `Clear dues of ${monthString} before applying leave`,
        });
      }
  
     
  
      const leave = await Leave.create({
        student_id: req.user.id,
        hostel_id: req.user.hostel_id,
        start_date,
        end_date,
        total_days,
      });
  
      res.status(201).json({
        message: "Leave applied successfully",
        leave,
      });
  
    } catch (error) {
      console.error("Error applying leave:", error);
      res.status(500).json({
        message: "Server error while applying leave",
      });
    }
  };
  
export const updateLeaveStatus=async(req,res)=>{
    try{
        const{leave_id}=req.params;
        const{status}=req.body;
        const leave=await Leave.findByPk(leave_id);
        if(!leave){
            return res.status(404).json({message:'Leave request not found'});
        }
        if (leave.hostel_id !== req.user.hostel_id) {
            return res.status(403).json({ message: "Access denied" });
          }
      
          leave.status = status;
          if(status==="approved"){
            const setting=await HostelSetting.findOne({where:{hostel_id:leave.hostel_id}});
          
          const per_day_cost = Math.floor(setting.monthly_charge / 30);
          leave.refund_amount = leave.total_days * per_day_cost;
          }
    
        await leave.save();
        res.json({
            message: "Leave updated",
            leave,
          });
    }catch(error){
        console.error('Error updating leave status:',error);
        res.status(500).json({message:'Server error while updating leave status'});
    }
}
export const getMyLeaves=async(req,res)=>{
    try{
        const leaves=await Leave.findAll({where:{student_id:req.user.id}});
        res.json(leaves);
    }catch(error){
        console.error('Error fetching leaves:',error);
        res.status(500).json({message:'Server error while fetching leaves'});
    }
}
export const getHostelLeaves=async(req,res)=>{
    try{
        const leaves=await Leave.findAll({where:{hostel_id:req.user.hostel_id},include:'Student'});
        res.json(leaves);
    }catch(error){
        console.error('Error fetching hostel leaves:',error);
        res.status(500).json({message:'Server error while fetching hostel leaves'});
    }
}