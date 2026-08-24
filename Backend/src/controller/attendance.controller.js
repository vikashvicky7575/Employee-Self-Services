import db from "../config/db.js";

//Check in Api for employee Attendance
export const checkIn = async (req, res) => {
  try {
    const { employee_id } = req.body;

    const today = new Date().toISOString().split("T")[0];

    // Check whether employee already checked in today
    const [existing] = await db.query(
      `
      SELECT id
      FROM attendance
      WHERE employee_id = ?
      AND attendance_date = CURDATE()
      `,
      [employee_id],
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Already checked in today",
      });
    }

    const checkInTime = new Date();

    await db.query(
      `
      INSERT INTO attendance
      (
        employee_id,
        attendance_date,
        check_in
      )
      VALUES (?, ?, ?)
      `,
      [employee_id, today, checkInTime],
    );

    res.json({
      success: true,
      message: "Check In Successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Check Out Api for employee Attendance
export const checkOut = async (req, res) => {
  try {
    const { employee_id } = req.body;

    const [rows] = await db.query(
      `
      SELECT *
      FROM attendance
      WHERE employee_id = ?
      AND attendance_date = CURDATE()
      `,
      [employee_id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Attendance Not Found",
      });
    }

    const attendance = rows[0];

    // Already Checked Out
    if (attendance.check_out) {
      return res.status(400).json({
        success: false,
        message: "Already Checked Out",
      });
    }

    const checkOutTime = new Date();

    const totalMinutes = Math.floor(
      (checkOutTime - new Date(attendance.check_in)) / (1000 * 60),
    );

    const totalHours = totalMinutes / 60;

    let status = "Absent";

    if (totalHours >= 8) {
      status = "Present";
    } else if (totalHours >= 5) {
      status = "Half Day";
    }

    await db.query(
      `
      UPDATE attendance
      SET
      check_out = ?,
      total_minutes = ?,
      total_hours = ?,
      status = ?
      WHERE id = ?
      `,
      [
        checkOutTime,
        totalMinutes,
        totalHours.toFixed(2),
        status,
        attendance.id,
      ],
    );

    res.json({
      success: true,
      message: "Check Out Successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// employeeAttendance for specific person
export const getEmployeeAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        a.*,

        e.employee_code,
        e.first_name,
        e.last_name,
        e.profile_image

      FROM attendance a

      INNER JOIN employee_master e
      ON a.employee_id = e.id

      WHERE a.employee_id = ?

      ORDER BY a.attendance_date DESC
      `,
      [id],
    );

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// hr saw all attendance list
export const getAllAttendance = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
        SELECT
          a.*,
          e.employee_code,
          e.first_name,
          e.last_name,
          e.profile_image
        FROM attendance a
        INNER JOIN employee_master e
        ON a.employee_id = e.id
        ORDER BY a.attendance_date DESC
        `,
    );

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
