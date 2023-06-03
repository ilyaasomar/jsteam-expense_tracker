import express from "express";
import {
  getAllGeneral,
  insert,
  deleteGeneral,
  updateGeneral,
} from "../controllers/general-controllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getAllGeneral);
router.post("/", auth, insert);
router.delete("/:id", auth, deleteGeneral);
router.put("/:id", auth, updateGeneral);

export default router;
