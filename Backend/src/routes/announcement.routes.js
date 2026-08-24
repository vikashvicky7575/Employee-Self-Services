import express from "express";

import {
  createAnnouncementController,
  getAnnouncementsController,
} from "../controller/announcement.controller.js";

const router = express.Router();

// CREATE
router.post("/", createAnnouncementController);

// GET ALL
router.get("/", getAnnouncementsController);

export default router;
