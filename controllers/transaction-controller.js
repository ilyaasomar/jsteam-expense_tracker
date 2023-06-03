import mongoose from "mongoose";
import Transaction from "../model/Transaction.js";
import Account from "../model/Account.js";

export const newTransaction = async (req, res) => {
  const { type, action, amount, desc } = req.body;
  try {
    const existingAccount = await Account.find().where({
      user: req.userId,
    });
    let accountId = existingAccount[0]._id;
    let balance = existingAccount[0].balance;
    if (!existingAccount) {
      return res.status(404).json({ message: "No user" });
    } else {
      const transaction = new Transaction({
        type,
        action,
        amount,
        desc,
        account_id: accountId,
        user: req.userId,
      });
      if (type === "income") {
        await transaction.save();
        if (transaction) {
          let newBalance;
          newBalance = balance + amount;
          await Account.findByIdAndUpdate(
            accountId,
            { $set: { balance: newBalance } },
            { new: true }
          );
        }
        return res.status(201).json(transaction);
      } else if (type === "expense") {
        if (balance === 0) {
          return res
            .status(404)
            .json({ message: "You don't have any Balance" });
        } else if (balance < amount) {
          return res.status(404).json({ message: `You have only $${balance}` });
        }
        await transaction.save();
        if (transaction) {
          let newBalance;
          newBalance = balance - amount;
          await Account.findByIdAndUpdate(
            accountId,
            { $set: { balance: newBalance } },
            { new: true }
          );
        }
        return res.status(201).json(transaction);
      }
    }
    // return res.status(201).json(existingAccount);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  let transactions;
  try {
    transactions = await Transaction.find().where({ user: req.userId });
  } catch (error) {
    return console.log(error);
  }
  if (!transactions) {
    return res.status(404).json({ message: "No transactions found!" });
  }
  return res.status(200).json({ transactions });
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Unknown ID" });
    }
    const updatedData = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
    }).where({ user: req.userId });
    return res.status(201).json(updatedData);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      res.status(400).json({
        message: "The transaction your trying to delete doesn't exist!",
      });
      return;
    }
    res.status(200).json({ message: `Transaction has been deleted` });
  } catch (err) {
    return console.log(err);
  }
};
