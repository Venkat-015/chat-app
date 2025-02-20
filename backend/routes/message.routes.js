import express from "express";
import upload from "../cloudinaryConfig.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router=express.Router();
router.get("/:id",protectRoute,getMessage);
router.post("/send/:id", protectRoute, upload.single('file'), sendMessage);
export default router;


/*

import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import multer from "multer";

// Set up Multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(), // Use memory storage for handling file uploads
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

const router = express.Router();

// Get messages route
router.get("/:id", protectRoute, getMessage);

// Send message route (with optional file upload)
router.post("/send/:id", protectRoute, upload.single('file'), sendMessage);

export default router;
*/
