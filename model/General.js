import mongoose from "mongoose";

const Schema = mongoose.Schema;
const generalSchema = new Schema({
  action: {
    type: "string",
  },
  type: {
    type: "string",
  },
  desc: {
    type: "string",
  },
  user: {
    type: "string",
  },
  date: {
    type: "Date",
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default mongoose.model("General", generalSchema);
