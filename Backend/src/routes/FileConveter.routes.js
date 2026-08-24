import express from "express";
import FileConveterupload from "../middleware/upload.middleware.js";
import { uploadPdfController } from "../controller/FileConveter.controller.js";

const router = express.Router();

router.post("/", FileConveterupload.single("pdf"), uploadPdfController);

export default router;
