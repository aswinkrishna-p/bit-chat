import { Req,Res ,Next } from "../types/serverPackageTypes";
import bcrypt from 'bcrypt'
 const User = require ('../models/userModel')

export const userRegister = async (req:Req ,res:Res ,Next:Next) =>{
    try {
        const { username, email, password } = req.body;

        // Check if the email is already used
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ message: 'Email is already used', status: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });

        return res.json({ status: true, user });
    } catch (error) {
        Next(error); // Pass the error to the error handling middleware
    }
}