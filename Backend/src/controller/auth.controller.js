import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { findUserByEmail } from "../models/auth.model.js";

dotenv.config();

export const login = async (req, res) => {
  try {
    const { official_email, password } = req.body;

    const user = await findUserByEmail(official_email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Account Inactive",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.status(200).json({
      success: true,
      token,
      role: user.role,
      user: {
        id: user.id,
        employee_code: user.employee_code,
        first_name: user.first_name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
