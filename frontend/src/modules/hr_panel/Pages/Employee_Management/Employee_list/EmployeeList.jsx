import React, { useEffect, useState } from "react";
import api from "../../../../../api/axios";
import { Link } from "react-router-dom";
import styles from "./EmployeeList.module.css";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await api.get("/employee");

      console.log("API Response:", response.data);

      // Case 1: API returns { success: true, data: [...] }
      if (response.data?.data && Array.isArray(response.data.data)) {
        setEmployees(response.data.data);
      }

      // Case 2: API returns directly [...]
      else if (Array.isArray(response.data)) {
        setEmployees(response.data);
      }

      // Fallback
      else {
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  const filteredEmployees = (employees || []).filter((emp) => {
    const searchText = search.toLowerCase();

    return (
      emp?.employee_code?.toLowerCase()?.includes(searchText) ||
      emp?.first_name?.toLowerCase()?.includes(searchText) ||
      emp?.last_name?.toLowerCase()?.includes(searchText) ||
      emp?.department?.toLowerCase()?.includes(searchText)
    );
  });

  return (
    <div className={`${styles.pageWrapper} bg-slate-100 p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Employee Management</h1>

            <p className="text-slate-500 mt-1">Manage Employee Records</p>
          </div>

          <Link to="/hr/employeeCreation">
            <button
              className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-5
      py-3
      rounded-xl
      font-semibold
      transition
    "
            >
              + Add Employee
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow p-5 mb-6">
          <input
            type="text"
            placeholder="Search Employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className={styles.tableWrapper}>
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-4 text-left">Photo</th>
                  <th className="p-4 text-left">Employee ID</th>
                  <th className="p-4 text-left">Employee Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Designation</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="border-b">
                    <td className="p-4">
                      <img
                        src={
                          emp.profile_image
                            ? `http://localhost:5000/uploads/${emp.profile_image}`
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                `${emp.first_name || ""} ${
                                  emp.last_name || ""
                                }`,
                              )}`
                        }
                        alt="Employee"
                        className={styles.employeeImage}
                      />
                    </td>

                    <td className="p-4 font-medium">{emp.employee_code}</td>

                    <td className="p-4">
                      {emp.first_name} {emp.last_name}
                    </td>

                    <td className="p-4">{emp.official_email}</td>

                    <td className="p-4">{emp.department}</td>

                    <td className="p-4">{emp.designation}</td>

                    <td className="p-4">
                      <span
                        className={
                          emp.status === "ACTIVE"
                            ? styles.activeStatus
                            : styles.inactiveStatus
                        }
                      >
                        {emp.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => navigate(`/hr/employee/${emp.id}`)}
                          className={styles.viewBtn}
                        >
                          View
                        </button>

                        <button className={styles.editBtn}>Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEmployees.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No Employee Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
