import React, { useEffect, useState } from "react";
import api from "../../../../../api/axios";
import { useParams } from "react-router-dom";
import styles from "./EmployeeAttendance.module.css";

const EmployeeAttendance = () => {
  //useParams used for take specific id
  const { id } = useParams();

  const [attendance, setAttendance] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  //fetching Api for Attendance Details
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        console.log("Employee ID =>", id);

        const response = await api.get(`/attendance/employee/${id}`);

        console.log(response.data);

        setAttendance(response.data.data);

        if (response.data.data.length > 0) {
          setEmployee(response.data.data[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [id]);
  // formatHours
  const formatHours = (hours) => {
    if (!hours || hours <= 0) {
      return "0 mins";
    }

    const totalMinutes = Math.floor(hours * 60);

    const hrs = Math.floor(totalMinutes / 60);

    const mins = totalMinutes % 60;

    if (hrs === 0) {
      return `${mins} mins`;
    }

    if (mins === 0) {
      return `${hrs} hrs`;
    }

    return `${hrs} hrs ${mins} mins`;
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Loading Attendance...
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.pageWrapper} p-6`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}

          <div className={`${styles.headerCard} mb-6`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="flex items-center gap-5">
                <img
                  src={
                    employee?.profile_image
                      ? `http://localhost:5000/uploads/${employee.profile_image}`
                      : `https://ui-avatars.com/api/?name=${employee?.first_name}+${employee?.last_name}`
                  }
                  alt="employee"
                  className={styles.profileImage}
                />

                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    {employee?.first_name} {employee?.last_name}
                  </h1>

                  <p className="text-slate-500 mt-1">
                    {employee?.employee_code}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className={styles.statCard}>
                  <p className="text-slate-500 text-sm">Total Records</p>

                  <h2 className="text-2xl font-bold">{attendance.length}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Table */}

          <div className={styles.tableCard}>
            <div className={styles.tableWrapper}>
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-4 text-left">Date</th>

                    <th className="p-4 text-left">Check In</th>

                    <th className="p-4 text-left">Check Out</th>

                    <th className="p-4 text-left">Working Hours</th>

                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b hover:bg-slate-50 transition"
                    >
                      {/* Date */}

                      <td className="p-4 font-medium">
                        {new Date(row.attendance_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </td>

                      {/* Check In */}

                      <td className="p-4">
                        {row.check_in
                          ? new Date(row.check_in).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "--"}
                      </td>

                      {/* Check Out */}

                      <td className="p-4">
                        {row.check_out ? (
                          new Date(row.check_out).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        ) : (
                          <span className="text-amber-600 font-medium">
                            Pending
                          </span>
                        )}
                      </td>

                      {/* Hours */}

                      <td className="p-4">{formatHours(row.total_hours)}</td>

                      {/* Status */}

                      <td className="p-4">
                        <span
                          className={
                            row.status === "Present"
                              ? styles.present
                              : row.status === "Half Day"
                                ? styles.halfday
                                : styles.absent
                          }
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {attendance.length === 0 && (
                <div className="p-10 text-center text-slate-500">
                  No Attendance Records Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeAttendance;
