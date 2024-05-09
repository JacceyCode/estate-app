import express from "express";
import { verifyToken } from "./../middleware/verifyToken.js";
import {
  addChat,
  getChat,
  getChats,
  readChat,
} from "../controllers/chatController.js";

const router = express.Router();

router.use(verifyToken);
router.get("/", getChats);
router.get("/:id", getChat);
router.post("/", addChat);
router.put("/read/:id", readChat);

export default router;
