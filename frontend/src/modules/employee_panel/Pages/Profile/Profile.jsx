import React, { useEffect, useState } from "react";
import api from "../../../../api/axios";

import styles from "./Profile.module.css";

const Profile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      console.log("Logged User =>", user);

      if (!user || !user.id) {
        console.log("Employee ID Not Found");
        setLoading(false);
        return;
      }

      const response = await api.get(`/employee/${user.id}`);

      console.log("Profile Response =>", response.data);

      setEmployee(response.data.data || response.data);
    } catch (error) {
      console.error("Profile Error =>", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading Profile...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-10 text-center text-red-500">
        Employee Profile Not Found
      </div>
    );
  }

  return (
    <div className={`${styles.pageWrapper} p-6`}>
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className={styles.profileCard}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex justify-center">
              <img
                src={
                  employee.profile_image
                    ? `http://localhost:5000/uploads/${employee.profile_image}`
                    : `https://ui-avatars.com/api/?name=${employee.first_name}+${employee.last_name}`
                }
                alt="Profile"
                className={styles.profileImage}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold">
                {employee.first_name} {employee.last_name}
              </h1>

              <p className="text-slate-500 mt-2">{employee.designation}</p>

              <div className="grid md:grid-cols-2 gap-5 mt-6">
                <div>
                  <label className={styles.label}>Employee Code</label>
                  <p>{employee.employee_code}</p>
                </div>

                <div>
                  <label className={styles.label}>Official Email</label>
                  <p>{employee.official_email}</p>
                </div>

                <div>
                  <label className={styles.label}>Mobile Number</label>
                  <p>{employee.mobile_number}</p>
                </div>

                <div>
                  <label className={styles.label}>Gender</label>
                  <p>{employee.gender}</p>
                </div>

                <div>
                  <label className={styles.label}>Department</label>
                  <p>{employee.department}</p>
                </div>

                <div>
                  <label className={styles.label}>Designation</label>
                  <p>{employee.designation}</p>
                </div>

                <div>
                  <label className={styles.label}>Joining Date</label>
                  <p>{employee.joining_date}</p>
                </div>

                <div>
                  <label className={styles.label}>Status</label>
                  <p>{employee.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className={`${styles.sectionCard} mt-6`}>
          <h2 className="text-xl font-bold mb-4">Emergency Contact</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={styles.label}>Contact Name</label>
              <p>{employee.emergency_contact_name}</p>
            </div>

            <div>
              <label className={styles.label}>Contact Number</label>
              <p>{employee.emergency_contact_number}</p>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className={`${styles.sectionCard} mt-6`}>
          <h2 className="text-xl font-bold mb-4">Bank Information</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={styles.label}>Account Holder</label>
              <p>{employee.account_holder_name}</p>
            </div>

            <div>
              <label className={styles.label}>Account Number</label>
              <p>{employee.account_number}</p>
            </div>

            <div>
              <label className={styles.label}>IFSC Code</label>
              <p>{employee.ifsc_code}</p>
            </div>

            <div>
              <label className={styles.label}>Branch Name</label>
              <p>{employee.branch_name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
