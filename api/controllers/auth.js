import User from "../models/User.js";
import bcrypt from "bcryptjs";
import axios from "axios";
import { generateToken } from "../middlewares/verify.js";

export const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    res.status(500).json(err);
  }
};
// function to login
export const login = async (req, res) => {
    // const encodedAuthHeader = base64.encode(authHeader)
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).json("User not found!");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return res.status(400).json("Wrong password or username!");

    const token = generateToken(user)

    const { password, ...info } = user._doc;
    res.cookie("token", token, {httpOnly: true}).status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

  // LOG OUT
  export const logout = (req, res) => {
    res.clearCookie("token",{
      secure:true,
      sameSite:"none"
    }).status(200).json("User has been logged out.")
  };
  