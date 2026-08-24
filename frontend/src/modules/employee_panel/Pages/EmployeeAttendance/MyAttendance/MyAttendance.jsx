import React, { useEffect, useState } from "react";
import api from "../../../../../api/axios";
import styles from "./MyAttendance.module.css";

const MyAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  //   get user details from loacal Stroage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadAttendance();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // fetch the specific employee details attendance for daily base
  const loadAttendance = async () => {
    try {
      const res = await api.get(`/attendance/employee/${user.id}`);

      setAttendance(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Check In
  const handleCheckIn = async () => {
    try {
      await api.post("/attendance/checkin", {
        employee_id: user.id,
      });

      alert("Check In Successful");

      loadAttendance();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  //check Out
  const handleCheckOut = async () => {
    try {
      await api.post("/attendance/checkout", {
        employee_id: user.id,
      });

      alert("Check Out Successful");

      loadAttendance();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const todayAttendance = attendance[0];

  const formatHours = (hours) => {
    if (!hours || hours <= 0) {
      return "Not Checked In";
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

  return (
    <div className={`${styles.pageWrapper} p-6`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className={styles.attendanceCard}>
          <h1 className="text-3xl font-bold mb-2">Attendance Punch</h1>

          <p className="text-slate-500">Mark your daily attendance</p>

          <div className="text-4xl font-bold mt-6 text-blue-600">
            {currentTime.toLocaleTimeString()}
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <div className={`${styles.infoCard} ${styles.checkInCard}`}>
              <h4>Check In</h4>
              <p>
                {todayAttendance?.check_in ? (
                  new Date(todayAttendance.check_in).toLocaleTimeString()
                ) : (
                  <span className="text-amber-600 font-medium">Pending</span>
                )}
              </p>
            </div>

            <div className={`${styles.infoCard} ${styles.checkOutCard}`}>
              <h4>Check Out</h4>
              <p>
                {todayAttendance?.check_out ? (
                  new Date(todayAttendance.check_out).toLocaleTimeString()
                ) : (
                  <span className="text-amber-600 font-medium">Pending</span>
                )}
              </p>
            </div>

            <div className={`${styles.infoCard} ${styles.hoursCard}`}>
              <h4>Total Hours</h4>
              <p>{formatHours(todayAttendance?.total_hours)}</p>
            </div>

            <div className={`${styles.infoCard} ${styles.statusCard}`}>
              <h4>Status</h4>
              <p>{todayAttendance?.status || "Working"}</p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button onClick={handleCheckIn} className={styles.checkInBtn}>
              Check In
            </button>

            <button onClick={handleCheckOut} className={styles.checkOutBtn}>
              Check Out
            </button>
          </div>
        </div>

        {/* History */}

        <div className={`${styles.historyCard} mt-8`}>
          <h2 className="text-2xl font-bold mb-5">Attendance History</h2>

          <table className="w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Check In</th>
                <th className="p-3 text-left">Check Out</th>
                <th className="p-3 text-left">Hours</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="p-3">
                    {new Date(row.attendance_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="p-3">
                    {row.check_in ? (
                      new Date(row.check_in).toLocaleTimeString()
                    ) : (
                      <span className="text-amber-600 font-medium">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    {row.check_out ? (
                      new Date(row.check_out).toLocaleTimeString()
                    ) : (
                      <span className="text-amber-600 font-medium">
                        Pending
                      </span>
                    )}
                  </td>

                  <td>{formatHours(todayAttendance?.total_hours)}</td>
                  <td className="p-3">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAttendance;
