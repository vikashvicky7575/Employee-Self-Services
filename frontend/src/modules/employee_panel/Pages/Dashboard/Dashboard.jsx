import React from "react";
import CountUp from "react-countup";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const announcements = [
    "Town Hall Meeting on Friday",
    "New Leave Policy Released",
    "Independence Day Holiday Declared",
  ];

  const notifications = [
    "Leave Request Approved",
    "Payslip Generated",
    "Profile Updated Successfully",
  ];

  const holidays = [
    "15 Aug - Independence Day",
    "02 Oct - Gandhi Jayanti",
    "25 Dec - Christmas",
  ];

  return (
    <div className={`min-h-screen p-8 ${styles.pageWrapper}`}>
      {/* Welcome Banner */}
      <div className={styles.heroSection}>
        <div>
          <h1 className={styles.welcomeTitle}>Welcome Back, Vikash 👋</h1>

          <p className={styles.welcomeText}>
            Here's your employee overview for today.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Present Days</h3>

          <div className={styles.counter}>
            <CountUp end={22} duration={2} />
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Leave Balance</h3>

          <div className={styles.counter}>
            <CountUp end={10} duration={2} />
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Net Salary</h3>

          <div className={styles.counter}>
            ₹<CountUp end={65000} separator="," duration={2} />
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Pending Requests</h3>

          <div className={styles.counter}>
            <CountUp end={2} duration={2} />
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        {/* Attendance */}
        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Attendance Summary</h2>

          <div className="space-y-4 mt-5">
            <div className="flex justify-between">
              <span>Present Days</span>
              <span>22</span>
            </div>

            <div className="flex justify-between">
              <span>Absent Days</span>
              <span>2</span>
            </div>

            <div className="flex justify-between">
              <span>Late Entries</span>
              <span>3</span>
            </div>

            <div className="flex justify-between">
              <span>Working Hours</span>
              <span>176 hrs</span>
            </div>

            <div className="mt-4">
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div className={styles.progressBar}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Quick Links</h2>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <button className={styles.actionBtn}>Apply Leave</button>

            <button className={styles.actionBtn}>Attendance</button>

            <button className={styles.actionBtn}>My Profile</button>

            <button className={styles.actionBtn}>Download Payslip</button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* Announcements */}
        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Announcements</h2>

          <ul className="mt-4 space-y-3">
            {announcements.map((item, index) => (
              <li key={index} className={styles.listItem}>
                📢 {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Notifications */}
        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Notifications</h2>

          <ul className="mt-4 space-y-3">
            {notifications.map((item, index) => (
              <li key={index} className={styles.listItem}>
                🔔 {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Holidays */}
        <div className={styles.infoCard}>
          <h2 className={styles.sectionTitle}>Upcoming Holidays</h2>

          <ul className="mt-4 space-y-3">
            {holidays.map((item, index) => (
              <li key={index} className={styles.listItem}>
                🎉 {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
