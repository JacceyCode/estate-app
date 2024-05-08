import express from "express";
import { verifyToken } from "./../middleware/verifyToken.js";
import {
  deleteUser,
  // getUser,
  getUsers,
  updateUser,
  savePost,
  profilePosts,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);

router.use(verifyToken);

// router.get("/:id", getUser);
router.get("/profilePosts", profilePosts);
router.post("/save", savePost);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
