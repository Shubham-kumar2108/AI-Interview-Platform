import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d" ,
    });
};


export const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await UserModel.findOne({email});

        if (
            user && 
            (await bcrypt.compare(password, user.password))
        ){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getUserProfile = async (req,res) => {
    res.json(req.user);
}