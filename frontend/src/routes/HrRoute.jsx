import HrAnnouncement from "../modules/hr_panel/Pages/Announcement_Management/HrAnnouncement";
import EmployeeAttendance from "../modules/hr_panel/Pages/Attendance_Management/Employee_Attendance/EmployeeAttendance";
import EmployeeProfile from "../modules/hr_panel/Pages/Attendance_Management/Employee_Attendance/EmployeeProfile/EmployeeProfile";
import HrDashboard from "../modules/hr_panel/Pages/Dashboard/HrDashboard";
import DocumentEsign from "../modules/hr_panel/Pages/Document_E-Sign/DocumentEsign";
import DocumentEsign1 from "../modules/hr_panel/Pages/Document_E-Sign/DocumentEsign1";
import EmployeeCreation from "../modules/hr_panel/Pages/Employee_Management/Employee_Creation/EmployeeCreation";
import EmployeeList from "../modules/hr_panel/Pages/Employee_Management/Employee_list/EmployeeList";
import FileConveter from "../modules/hr_panel/Pages/File_Conveter/FileConveter";
import OfferLetterCreation from "../modules/hr_panel/Pages/Offer_Letter_Management/OfferLetterCreation";

export const HrRoutes = [
  {
    path: "employeeCreation",
    element: <EmployeeCreation />,
  },
  {
    path: "employeeList",
    element: <EmployeeList />,
  },
  {
    path: "employeeAttendance",
    element: <EmployeeProfile />,
  },
  {
    path: "employeeAttendance/:id",
    element: <EmployeeAttendance />,
  },
  {
    path: "HrAnnouncement",
    element: <HrAnnouncement />,
  },
  {
    path: "HRDashboard",
    element: <HrDashboard />,
  },
  {
    path: "OfferLetterCreation",
    element: <OfferLetterCreation />,
  },
  {
    path: "fileConveter",
    element: <FileConveter />,
  },
  {
    path: "DocumentEsign",
    element: <DocumentEsign />,
  },
  {
    path: "DocumentEsign1",
    element: <DocumentEsign1 />,
  },
];
