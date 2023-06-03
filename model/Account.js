import mongoose from "mongoose";

const Schema = mongoose.Schema;
const accountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  acc_no: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Account", accountSchema);
