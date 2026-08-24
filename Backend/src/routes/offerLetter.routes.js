import express from "express";
import { create_offer_letter_controller } from "../controller/offerLetter.controller.js";

const router = express.Router();

router.post("/", create_offer_letter_controller);

export default router;
