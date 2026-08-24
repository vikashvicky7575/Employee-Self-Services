export const roleConfig = {
  employee: {
    title: "Employee Panel",
    theme: {
      sidebar: "bg-gradient-to-b from-blue-900 via-blue-950 to-slate-950",
    },

    menus: [
      { label: "Dashboard", path: "/employee/dashboard" },
      { label: "Profile", path: "/employee/profile" },
      {
        label: "Attendance Management",
        children: [
          {
            label: "My Attendance",
            path: "/employee/myattendance",
          },

          {
            label: "Attendance History",
            path: "/employee/attendanceHistory",
          },
        ],
      },
      { label: "Announcement", path: "/employee/announcement" },
    ],
  },

  hr: {
    title: "HR Panel",
    theme: {
      sidebar: "bg-gradient-to-b from-emerald-700 via-teal-700 to-cyan-800",
    },

    menus: [
      { label: "Dashboard", path: "/hr/HRDashboard" },
      {
        label: "Employee Management",
        children: [
          {
            label: "Employee Creation",
            path: "/hr/employeeCreation",
          },

          {
            label: "Employee List",
            path: "/hr/employeeList",
          },
        ],
      },
      {
        label: "Attendance Management",
        children: [
          {
            label: "Employee Attendance",
            path: "/hr/employeeAttendance",
          },
        ],
      },
      {
        label: "Announcement Managemnet",
        path: "/hr/HrAnnouncement",
      },
      {
        label: "Offer Letter Management",
        children: [
          {
            label: "Offer Letter Creation",
            path: "/hr/OfferLetterCreation",
          },
        ],
      },
      { label: "File Conveter", path: "/hr/fileConveter" },
      { label: "Document Upload", path: "/hr/DocumentEsign" },
      { label: "Document Upload 1", path: "/hr/DocumentEsign1" },
    ],
  },
};
