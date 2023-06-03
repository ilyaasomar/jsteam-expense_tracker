import express from "express";
import {
  getAllAccount,
  insert,
  deleteAccount,
  updateAccount,
} from "../controllers/account-controllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getAllAccount);
router.post("/", auth, insert);
router.delete("/:id", auth, deleteAccount);
router.put("/:id", auth, updateAccount);

export default router;
