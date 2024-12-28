import uploadImageController from "../controllers/imageUpload.js";
import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/upload-image",upload.single("image"),uploadImageController);

export default router;