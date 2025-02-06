import { Request, Response } from "express";
import { User } from "@shared/user.interface";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwtUtils";
const userModel = require("../models/userModel");

//Function to handle user login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: User = await userModel.getUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    const isPasswordCorrect: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    const token: string = createToken(user.email, user.password);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error logging in" });
  }
};
//Function to handle user registration
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser: User = await userModel.getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    //Hash the password
    const hashedPassword: string = await bcrypt.hash(password, 10);
    //Create the user
    const newUser: User = await userModel.createUser(email, hashedPassword);
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating user" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { userId, newPassword } = req.body;

  try {
    const response = await userModel.updateUser(userId, newPassword);
    res.status(201).json({
      message: response.message,
    });
  } catch (error) {
    res.status(400).json({ message: "Error updating password" });
  }
};
