import express from "express";
import {
  checkIn,
  checkOut,
  getEmployeeAttendance,
  getAllAttendance,
} from "../controller/attendance.controller.js";

const router = express.Router();

router.post("/checkin", checkIn);

router.post("/checkout", checkOut);

router.get("/employee/:id", getEmployeeAttendance);

router.get("/", getAllAttendance);

export default router;
