import React, { useState } from "react";
import styles from "./HrAnnouncement.module.css";
import api from "../../../../api/axios";

const HrAnnouncement = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    publish_date: "",
  });

  //handleChanges for valueChanges
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`/announcement`, formData);

      if (response.data.success) {
        // Notification Dot Enable
        localStorage.setItem("newAnnouncement", "true");

        alert("Announcement Created Successfully");

        setFormData({
          title: "",
          description: "",
          type: "",
          publish_date: "",
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center p-6 ${styles.pageWrapper}`}
      >
        <div className={`${styles.formCard} w-full max-w-4xl`}>
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-green-900 mb-3">
              HR Announcement
            </h1>

            <p className="text-green-700 text-base">
              Create and publish announcements professionally
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className={styles.label}>Announcement Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter announcement title"
                className={styles.input}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className={styles.label}>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Write announcement details..."
                className={styles.textarea}
                required
              />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type */}
              <div>
                <label className={styles.label}>Announcement Type</label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={styles.input}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Leave">Leave</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Meeting">Meeting</option>
                  <option value="General">General</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className={styles.label}>Publish Date</label>

                <input
                  type="date"
                  name="publish_date"
                  value={formData.publish_date}
                  onChange={handleChange}
                  className={styles.input}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className={`block mx-auto ${styles.submitBtn}`}
            >
              Publish Announcement
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HrAnnouncement;
