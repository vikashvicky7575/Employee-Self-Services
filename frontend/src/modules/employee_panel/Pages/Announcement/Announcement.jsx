import React, { useEffect, useState } from "react";
import api from "../../../../api/axios";
import styles from "./Announcement.module.css";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  // Fetch Announcement
  const fetchAnnouncement = async () => {
    try {
      const response = await api.get(`/announcement`);

      console.log(response.data);

      if (response.data.success) {
        setAnnouncements(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`min-h-screen p-6 ${styles.pageWrapper}`}>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-3">
          Company Announcements
        </h1>

        <p className="text-700 text-base">
          Latest updates and important company notifications
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {announcements?.map((item) => {
          const isNew =
            new Date(item.created_at) >
            new Date(Date.now() - 24 * 60 * 60 * 1000);
          return (
            <div key={item.id} className={styles.card}>
              {/* Corner Badge */}
              {isNew && <div className={styles.cornerBadge}>NEW</div>}

              {/* Top */}
              <div className="flex items-center justify-between mb-5">
                <span className={styles.badge}>{item.type}</span>

                <span className={styles.date}>
                  {new Date(item.publish_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Title */}
              <h2 className={styles.title}>{item.title}</h2>

              {/* Description */}
              <p className={styles.description}>{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcement;
