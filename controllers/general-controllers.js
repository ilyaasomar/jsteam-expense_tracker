import mongoose from "mongoose";
import General from "../model/General.js";

// to get all general
export const getAllGeneral = async (req, res, next) => {
  let general; //define tne general
  try {
    general = await General.find().where({ user: req.userId });
  } catch (err) {
    return console.log(err);
  }
  //if we don't have general
  if (!general) {
    return res.status(404).json({ message: "no general found" });
  }
  //if every think oky
  return res.status(200).json({ general });
};

export const insert = async (req, res, next) => {
  const { action, type, desc } = req.body;
  try {
    const general = await General.create({
      action,
      type,
      desc,
      user: req.userId,
    });
    return res.status(200).json({ general });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//edit General
export const updateGeneral = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const updatedGeneral = await General.findByIdAndUpdate(id, req.body, {
      new: true,
    }).where({ user: req.userId });
    return res.status(201).json(updatedGeneral);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//delete General
export const deleteGeneral = async (req, res) => {
  const { id } = req.params;
  try {
    const general = await General.findByIdAndDelete(id);
    if (!general) {
      res.status(400).json({
        message: "The General your trying to delete doesn't exist!",
      });
      return;
    }
    res.status(200).json({ message: `General has been deleted` });
  } catch (err) {
    return console.log(err);
  }
};
