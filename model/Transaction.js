import mongoose, { Mongoose } from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
  account_id: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Transaction", transactionSchema);
