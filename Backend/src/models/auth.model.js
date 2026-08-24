import db from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM employee_master
    WHERE official_email = ?
    LIMIT 1
    `,
    [email],
  );

  return rows[0];
};
