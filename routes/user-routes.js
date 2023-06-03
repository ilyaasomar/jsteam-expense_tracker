import express from "express";
import {
  deleteUser,
  getAllUsers,
  login,
  signupUser,
  update,
} from "../controllers/user-controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllUsers);
router.post("/signup", signupUser);
router.post("/login", login);
router.put("/update/:id", auth, update);
router.delete("/delete/:id", auth, deleteUser);

export default router;
