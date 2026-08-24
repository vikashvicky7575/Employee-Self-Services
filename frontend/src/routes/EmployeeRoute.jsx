import Announcement from "../modules/employee_panel/Pages/Announcement/Announcement";
import Dashboard from "../modules/employee_panel/Pages/Dashboard/Dashboard";
import AttendanceHistory from "../modules/employee_panel/Pages/EmployeeAttendance/AttendanceHistory/AttendanceHistory";
import MyAttendance from "../modules/employee_panel/Pages/EmployeeAttendance/MyAttendance/MyAttendance";
import Profile from "../modules/employee_panel/Pages/Profile/Profile";

export const employeeRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "myattendance",
    element: <MyAttendance />,
  },
  {
    path: "attendanceHistory",
    element: <AttendanceHistory />,
  },
  {
    path: "announcement",
    element: <Announcement />,
  },
];
