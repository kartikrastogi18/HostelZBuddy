import {Hostel} from '../models/index.js';
export const createHostel=async(req,res)=>{
    try{
        const{name,code}=req.body;
        if(!name || !code){
            return res.status(400).json({message:'Name and code are required'});
        }
        const existing=await Hostel.findOne({where:{code}});
        if(existing){
            return res.status(400).json({message:'Hostel with this code already exists'});
        }
        const hostel=await Hostel.create({name,code});
        res.status(201).json({
            message: "Hostel created successfully",
            hostel,});
    }catch(error){
        console.error('Error creating hostel:',error);
        res.status(500).json({message:'Server error while creating hostel'});
    }
}
export const getAllHostels=async(req,res)=>{
    try{
        const hostels=await Hostel.findAll();
        res.status(200).json({hostels});
        
    }catch(error){
        console.error('Error fetching hostels:',error);
        res.status(500).json({message:'Server error while fetching hostels'});
    }
}