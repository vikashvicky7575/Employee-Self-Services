import db from "../config/db.js";

// CREATE
export const createEmployee = async (employeeData) => {
  console.log("the employee datats", employeeData);
  const [result] = await db.execute(
    `
    INSERT INTO employee_master (
      employee_code,
      first_name,
      last_name,
      official_email,
      password_hash,
      mobile_number,
      gender,
      date_of_birth,
      department,
      designation,
      joining_date,
      role,
      status,
      emergency_contact_name,
      emergency_contact_number,
      account_holder_name,
      account_number,
      ifsc_code,
      branch_name,
      education_qualification,
      institution_name,
      year_of_passing,
      profile_image
    )
    VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?
    )
    `,
    [
      employeeData.employee_code,
      employeeData.first_name,
      employeeData.last_name,
      employeeData.official_email,
      employeeData.password_hash,
      employeeData.mobile_number,

      employeeData.gender ?? null,
      employeeData.date_of_birth ?? null,
      employeeData.department,
      employeeData.designation,
      employeeData.joining_date,
      employeeData.role,

      employeeData.status,
      employeeData.emergency_contact_name ?? null,
      employeeData.emergency_contact_number ?? null,
      employeeData.account_holder_name ?? null,
      employeeData.account_number ?? null,

      employeeData.ifsc_code ?? null,
      employeeData.branch_name ?? null,
      employeeData.education_qualification ?? null,
      employeeData.institution_name ?? null,
      employeeData.year_of_passing ?? null,
      employeeData.profile_image ?? null,
    ],
  );

  return result;
};

// READ ALL
export const getAllEmployees = async () => {
  const [rows] = await db.execute(`SELECT * FROM employee_master`);

  return rows;
};

// READ ONE
export const getEmployeeById = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM employee_master
    WHERE id = ?
    `,
    [id],
  );

  return rows[0];
};

// UPDATE
export const updateEmployee = async (id, employeeData) => {
  const [result] = await db.execute(
    `
    UPDATE employee_master
    SET
      first_name=?,
      last_name=?,
      mobile_number=?,
      department=?,
      designation=?,
      role=?,
      status=?
    WHERE id=?
    `,
    [
      employeeData.first_name,
      employeeData.last_name,
      employeeData.mobile_number,
      employeeData.department,
      employeeData.designation,
      employeeData.role,
      employeeData.status,
      id,
    ],
  );

  return result;
};

// DELETE
export const deleteEmployee = async (id) => {
  const [result] = await db.execute(
    `
    DELETE FROM employee_master
    WHERE id=?
    `,
    [id],
  );

  return result;
};
