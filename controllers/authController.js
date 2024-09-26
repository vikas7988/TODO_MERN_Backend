import User from '../database/model/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { jwtSecret } from '../config/config.js';


export async function registerUser(req, res) {
    const { username, password } = req.body;
    try {

        const existingUser = await User.find({username:username})
        if(existingUser.length>0){
            return res.status(409).json({ error: 'User Already exist with this Name' });
        }
       

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', username });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
}


export async function loginUser(req, res) {
    const { username, password } = req.body;
    try {        
        const user = await User.findOne({ username });

        // console.log(user)
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }                
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
        // console.log("token",token)

        res.cookie('token', token, {
            maxAge: 3600000
        });

        res.status(200).json({success:true, message: 'Login successful', name: user.username });
    } catch (error) {
        res.status(500).json({ success:false,error: 'Login failed' });
    }
}
export async function logoutUser(req, res) {
    return res
      .status(200)
      .clearCookie("token")
      .json({
        success: true,
        message: "Customer logged out successfully",
      });
}
