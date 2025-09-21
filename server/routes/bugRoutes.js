import express from "express";
import { createBug, getBugs, updateBug } from "../controllers/bugController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, createBug);
router.get("/", protect, getBugs);
router.put("/:id", protect, updateBug);

export default router;
