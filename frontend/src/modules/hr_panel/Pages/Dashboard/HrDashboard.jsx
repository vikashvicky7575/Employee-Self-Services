import React from "react";
import styles from "./HrDashboard.module.css";

const HrDashboard = () => {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>HR Dashboard</h1>
          <p className={styles.subtitle}>
            Manage Employees, Leave Requests & Announcements
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Employees</h3>
          <h2>245</h2>
        </div>

        <div className={styles.statCard}>
          <h3>Pending Leaves</h3>
          <h2>12</h2>
        </div>

        <div className={styles.statCard}>
          <h3>Approved Leaves</h3>
          <h2>45</h2>
        </div>

        <div className={styles.statCard}>
          <h3>Announcements</h3>
          <h2>8</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.contentGrid}>
        {/* Employee Overview */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Employee Overview</h2>

          <div className={styles.employeeStats}>
            <div>
              <span>Total Employees</span>
              <strong>245</strong>
            </div>

            <div>
              <span>Active Today</span>
              <strong>220</strong>
            </div>

            <div>
              <span>New Joiners</span>
              <strong>8</strong>
            </div>

            <div>
              <span>Resigned</span>
              <strong>2</strong>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Recent Activities</h2>

          <ul className={styles.timeline}>
            <li>John checked in at 09:00 AM</li>
            <li>Lisa updated profile</li>
            <li>David applied leave request</li>
            <li>Michael completed onboarding</li>
            <li>Sarah checked in at 10:15 AM</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.contentGrid}>
        {/* Leave Requests */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Pending Leave Requests</h2>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Days</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>John</td>
                <td>Sick Leave</td>
                <td>2</td>
                <td>
                  <button className={styles.approveBtn}>Approve</button>
                </td>
              </tr>

              <tr>
                <td>Lisa</td>
                <td>Casual Leave</td>
                <td>1</td>
                <td>
                  <button className={styles.approveBtn}>Approve</button>
                </td>
              </tr>

              <tr>
                <td>Robert</td>
                <td>Earned Leave</td>
                <td>3</td>
                <td>
                  <button className={styles.approveBtn}>Approve</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Announcements */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Announcements</h2>

          <div className={styles.announcement}>
            📢 Independence Day Celebration
          </div>

          <div className={styles.announcement}>
            📢 New Leave Policy Released
          </div>

          <div className={styles.announcement}>
            📢 Office Closed on August 15
          </div>

          <div className={styles.announcement}>
            📢 Quarterly Performance Reviews
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
