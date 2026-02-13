import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import {User,Hostel} from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();
const generateToken = (user) => {
    return jwt.sign(
        {
            id:user.id,
            role:user.role,
            hostel_id:user.hostel_id,
        },
        process.env.JWT_SECRET,
        {expiresIn:'7d'}

    );
};
export const register = async (req, res) => {
    try {
      const { name, email, password, role, room_number } = req.body;
  
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All required fields missing" });
      }
  
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      let hostel_id = null;
  
   
      if (req.user.role === "super_admin" && role === "manager") {
        hostel_id = req.body.hostel_id;
      }
  
    
      if (req.user.role === "manager" && role === "student") {
        hostel_id = req.user.hostel_id; 
      }
  
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        hostel_id,
        room_number,
      });
  
      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:'Email and password are required'});
        }
        const user=await User.findOne({where:{email},include:Hostel});
        if(!user){
            return res.status(400).json({message:'Invalid email or password'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid email or password'});
        }
        const token=generateToken(user);
        res.status(200).json({
            message:'Login successful',
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role,
                hostel_id:user.hostel_id,
                room_number:user.room_number,
                hostel_name:user.Hostel?user.Hostel.name:null,
            },
            token,
        });

    }catch(error){
        console.error('Login error:',error);
        res.status(500).json({message:error.message});
    }
}