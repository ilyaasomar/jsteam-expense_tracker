import mongoose from "mongoose";
import Account from "../model/Account.js";

// to get all Account
export const getAllAccount = async (req, res) => {
  let account; //define tne  account
  try {
    account = await Account.find().where({ user: req.userId });
  } catch (err) {
    return console.log(err);
  }
  //if we don't have account
  if (!account) {
    return res.status(404).json({ message: "no account found" });
  }
  //if every think oky
  return res.status(200).json(account);
};

export const insert = async (req, res) => {
  const { name, acc_no, bank, amount, desc } = req.body;
  try {
    const existAccount = await Account.findOne({ acc_no });
    if (existAccount) {
      return res.status(404).json({ message: "Account already exist" });
    }
    const account = await Account.create({
      name,
      acc_no,
      bank,
      balance: amount,
      desc,
      user: req.userId,
    });
    return res.status(201).json(account);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//edit account
export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { acc_no } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(500).json({ message: "Invalid id" });
    }
    const account_exist = await Account.findOne({ acc_no });
    if (account_exist) {
      return res.status(400).json({ message: "Account Already Exists" });
    }
    const accountUpdated = await Account.findByIdAndUpdate(id, req.body, {
      new: true,
    }).where({ user: req.userId });
    return res.status(201).json(accountUpdated);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//delete account
export const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      res.status(400).json({
        message: "The account your trying to delete doesn't exist!",
      });
      return;
    }
    res.status(200).json({ message: `Account has been deleted` });
  } catch (err) {
    return console.log(err);
  }
};
