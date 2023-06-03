import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const secret = "expense";

export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
    // .where({ _id: req.userId })
  } catch (error) {
    return console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

export const signupUser = async (req, res) => {
  let existingUser;
  const { name, tell, email, username, password, image } = req.body;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }
  const HashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    tell,
    email,
    username,
    password: HashedPassword,
    image,
  });
  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  res.status(201).json({ user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "Couldn't find user by this username" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  const payload = { userID: existingUser._id, username: existingUser.username };
  const token = jwt.sign(payload, secret, { expiresIn: "3h" });
  return res.status(200).json({ userData: existingUser, token });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  // const updatingUser = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID!" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "This Email already exists!" });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).where({ _id: req.userId });

    return res.status(200).json(updatedUser);
  } catch (err) {
    return console.log(err);
  }
};

// DELETE a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json({ message: `User has been deleted` });
  } catch (err) {
    res
      .status(400)
      .json({ message: "The user your trying to delete doesn't exist!" });
  }
};
