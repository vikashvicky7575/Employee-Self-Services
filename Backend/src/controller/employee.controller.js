import bcrypt from "bcryptjs";

import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../models/employee.model.js";

// CREATE
export const create = async (req, res) => {
  try {
    const password_hash = await bcrypt.hash(req.body.password, 10);

    await createEmployee({
      ...req.body,
      password_hash,

      profile_image: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      success: true,
      message: "Employee Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL
export const getAll = async (req, res) => {
  const data = await getAllEmployees();

  res.json(data);
};

// READ ONE
export const getById = async (req, res) => {
  const data = await getEmployeeById(req.params.id);

  res.json(data);
};

// UPDATE
export const update = async (req, res) => {
  await updateEmployee(req.params.id, req.body);

  res.json({
    success: true,
    message: "Employee Updated Successfully",
  });
};

// DELETE
export const remove = async (req, res) => {
  await deleteEmployee(req.params.id);

  res.json({
    success: true,
    message: "Employee Deleted Successfully",
  });
};
