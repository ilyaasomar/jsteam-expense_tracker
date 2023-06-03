import express from "express";
import {
  deleteTransaction,
  getAllTransactions,
  newTransaction,
  updateTransaction,
} from "../controllers/transaction-controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllTransactions);
router.post("/", auth, newTransaction);
router.put("/:id", auth, updateTransaction);
router.delete("/:id", auth, deleteTransaction);

export default router;
