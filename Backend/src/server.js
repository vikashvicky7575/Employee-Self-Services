import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

//Panel Routes
import employeeRoutes from "./routes/employee.route.js";
import authRoutes from "./routes/auth.route.js";
import attendanceRoutes from "./routes/attendance.route.js";
import announcementRoutes from "./routes/announcement.routes.js";
import offerLetterRoutes from "./routes/offerLetter.routes.js";
import fileConveterRoute from "./routes/FileConveter.routes.js";

dotenv.config();

const Port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Img Upload
app.use("/uploads", express.static("uploads"));

//Routes Connection
app.use("/api/employee", employeeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/announcement", announcementRoutes);
app.use("/api/offerLetter", offerLetterRoutes);
app.use("/api/fileconveter", fileConveterRoute);

//Port Listener
app.listen(Port, () => {
  console.log(`Server is Running on ${Port}`);
});
