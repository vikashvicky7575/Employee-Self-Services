import { parsePdfFile } from "../models/FileConveter.model.js";

export const uploadPdfController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload PDF",
      });
    }

    const result = await parsePdfFile(req.file.buffer);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
