import db from "../config/db.js";

export const createAttendance = async (
  employee_id,
  attendance_date,
  check_in,
) => {
  const sql = `
    INSERT INTO attendance
    (
      employee_id,
      attendance_date,
      check_in
    )
    VALUES (?, ?, ?)
  `;

  return db.query(sql, [employee_id, attendance_date, check_in]);
};
