import express from "express";
import upload from "../middleware/upload.js";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controller/employee.controller.js";

const router = express.Router();

//img upload route
router.post("/", upload.single("profile_image"), create);

router.post("/", create);

router.get("/", getAll);

router.get("/:id", getById);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
