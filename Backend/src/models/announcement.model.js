import db from "../config/db.js";

// CREATE ANNOUNCEMENT
export const createAnnouncement = async (
  title,
  description,
  type,
  publish_date,
  created_by,
) => {
  const sql = `
    INSERT INTO announcements
    (
      title,
      description,
      type,
      publish_date,
      created_by
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  return db.query(sql, [title, description, type, publish_date, created_by]);
};

//Get All Announcement
export const getAllAnnouncements = async () => {
  const sql = `
    SELECT *
    FROM announcements
    ORDER BY id DESC
  `;

  return db.query(sql);
};
