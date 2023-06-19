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
  const { amount } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Unknown ID" });
    }
    const existingAccount = await Account.find().where({ user: req.userId });
    const accountID = existingAccount[0]._id;
    const balance = existingAccount[0].balance;
    const updatingTransaction = await Transaction.find().where({
      _id: id,
    });
    const type = updatingTransaction[0].type;

    if (!existingAccount) {
      return res.status(404).json({ message: "Account not found" });
    } else {
      if (type === "income") {
        const updatedData = await Transaction.findByIdAndUpdate(id, req.body, {
          new: true,
        }).where({ user: req.userId });
        let newBalance;
        newBalance = balance + amount;
        await Account.findByIdAndUpdate(
          accountID,
          {
            $set: { balance: newBalance },
          },
          { new: true }
        );
        return res.status(200).json(updatedData);
      } else if (type === "expense") {
        if (balance === 0) {
          return res
            .status(404)
            .json({ message: "You don't have any balance" });
        } else if (balance < amount) {
          return res.status(404).json({
            message: `Your Balance is $${balance} and it's not enough`,
          });
        } else {
          const updatedData = await Transaction.findByIdAndUpdate(
            id,
            req.body,
            {
              new: true,
            }
          ).where({ user: req.userId });
          let newBalance;
          newBalance = balance - amount;
          await Account.findByIdAndUpdate(
            accountID,
            { $set: { balance: newBalance } },
            { new: true }
          );
          return res.status(200).json(updatedData);
        }
      }
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const existingAccount = await Account.find().where({ user: req.userId });
    const accountID = existingAccount[0]._id;
    const balance = existingAccount[0].balance;
    const amountTransaction = await Transaction.find().where({
      _id: id,
    });
    const amount = amountTransaction[0].amount;
    if (id) {
      let zeroBalance;
      if (balance === 0) {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          id
        ).where({
          user: req.userId,
        });
        zeroBalance = balance;
        await Account.findByIdAndUpdate(
          accountID,
          { $set: { balance: zeroBalance } },
          { new: true }
        );
      } else if (balance < amount) {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          id
        ).where({
          user: req.userId,
        });
        zeroBalance = balance;
        await Account.findByIdAndUpdate(
          accountID,
          { $set: { balance: zeroBalance } },
          { new: true }
        );
      } else {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          id
        ).where({
          user: req.userId,
        });
        let newBalance;
        newBalance = balance - amount;
        await Account.findByIdAndUpdate(
          accountID,
          { $set: { balance: newBalance } },
          { new: true }
        );
      }
    }
    return res
      .status(201)
      .json({ message: "Transaction deleted successfully" });
  } catch (err) {
    return console.log(err);
  }
};
