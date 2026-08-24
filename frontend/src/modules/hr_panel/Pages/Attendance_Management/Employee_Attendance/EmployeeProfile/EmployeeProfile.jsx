import React, { useEffect, useState } from "react";
import api from "../../../../../../api/axios";
import { useNavigate } from "react-router-dom";
import styles from "./EmployeeProfile.module.css";

const EmployeeProfile = () => {
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAttendanceEmployees();
  }, []);

  const fetchAttendanceEmployees = async () => {
    try {
      const response = await api.get(`/attendance`);

      console.log(response.data);

      // Remove duplicate employees
      const uniqueEmployees = [];

      const map = new Map();

      response.data.data.forEach((emp) => {
        if (!map.has(emp.employee_id)) {
          map.set(emp.employee_id, true);
          uniqueEmployees.push(emp);
        }
      });

      setEmployees(uniqueEmployees);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={`${styles.pageWrapper} p-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Attendance Management</h1>

            <p className="text-slate-500 mt-1">
              View Employee Attendance Records
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {employees.map((emp) => {
              console.log("Profile Image =>", emp.profile_image);

              return (
                <div key={emp.employee_id} className={styles.employeeCard}>
                  <img
                    src={
                      emp.profile_image
                        ? `http://localhost:5000/uploads/${emp.profile_image}`
                        : `https://ui-avatars.com/api/?name=${emp.first_name}+${emp.last_name}`
                    }
                    alt="profile"
                    className={styles.profileImage}
                  />

                  <h2 className="text-xl font-bold mt-4">
                    {emp.first_name} {emp.last_name}
                  </h2>

                  <p className="text-slate-500">{emp.employee_code}</p>

                  <button
                    onClick={() =>
                      navigate(`/hr/employeeAttendance/${emp.employee_id}`)
                    }
                    className={styles.viewBtn}
                  >
                    View Attendances
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
