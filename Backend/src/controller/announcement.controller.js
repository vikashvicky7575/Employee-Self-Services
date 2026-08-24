import {
  createAnnouncement,
  getAllAnnouncements,
} from "../models/announcement.model.js";

//Create
export const createAnnouncementController = async (req, res) => {
  try {
    const { title, description, type, publish_date, created_by } = req.body;

    await createAnnouncement(
      title,
      description,
      type,
      publish_date,
      created_by,
    );

    return res.status(201).json({
      success: true,
      message: "Announcement Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getAnnouncementsController = async (req, res) => {
  try {
    const [announcements] = await getAllAnnouncements();

    return res.status(200).json({
      success: true,
      data: announcements,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
