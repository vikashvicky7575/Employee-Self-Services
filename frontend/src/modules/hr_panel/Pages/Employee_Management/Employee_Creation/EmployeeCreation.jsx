import React, { useState } from "react";
import api from "../../../../../api/axios";
import { toast } from "react-toastify";
import styles from "./EmployeeCreation.modules.css";

const EmployeeCreation = () => {
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee_code: `EMP${Date.now().toString().slice(-4)}`,

    first_name: "",
    last_name: "",
    official_email: "",
    password: "",
    mobile_number: "",

    department: "",
    designation: "",
    joining_date: "",

    role: "EMPLOYEE",
    status: "ACTIVE",
  });

  const inputStyle =
    "w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.first_name) {
        toast.error("First Name Required");
        return false;
      }

      if (!formData.last_name) {
        toast.error("Last Name Required");
        return false;
      }

      if (!formData.official_email) {
        toast.error("Email Required");
        return false;
      }

      if (!formData.password) {
        toast.error("Password Required");
        return false;
      }

      if (!formData.mobile_number) {
        toast.error("Mobile Number Required");
        return false;
      }
    }

    if (step === 2) {
      if (!formData.department) {
        toast.error(" Department Required");
        return false;
      }

      if (!formData.designation) {
        toast.error(" Designation Required");
        return false;
      }
    }

    if (step === 3) {
      if (!formData.role) {
        toast.error(" Role Required");
        return false;
      }

      if (!formData.status) {
        toast.error(" Status Required");
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    toast.success("Step Completed");

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const submitData = new FormData();

      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      const response = await api.post("/employee", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Employee Creation Failed");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    "Employee Information",
    "Department Information",
    "Employment Information",
    "Review & Submit",
  ];

  return (
    <div className={`${styles.pageWrapper} bg-slate-100 p-8`}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Employee Creation</h1>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((stepName, index) => {
            const currentStep = index + 1;

            return (
              <React.Fragment key={currentStep}>
                <div className="flex flex-col items-center">
                  <div
                    className={`
              ${styles.stepCircle}
              ${
                currentStep < step
                  ? styles.completedStep
                  : currentStep === step
                    ? styles.activeStep
                    : styles.pendingStep
              }
            `}
                  >
                    {currentStep < step ? "✓" : currentStep}
                  </div>

                  <span className="text-xs font-medium mt-2 text-center w-24">
                    {stepName}
                  </span>
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className={`
              flex-1 h-1 mx-2 rounded-full
              ${currentStep < step ? "bg-green-500" : "bg-slate-300"}
            `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className={`${styles.card} bg-white p-6 rounded-2xl shadow`}>
          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-4">
              <input
                value={formData.employee_code}
                disabled
                className={inputStyle}
              />

              <input
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className={inputStyle}
              />

              <input
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className={inputStyle}
              />

              <input
                name="official_email"
                placeholder="Official Email"
                value={formData.official_email}
                onChange={handleChange}
                className={inputStyle}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={inputStyle}
              />

              <input
                name="mobile_number"
                placeholder="Mobile Number"
                value={formData.mobile_number}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Enter Your Department"
              />

              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Enter Your Designation"
              />

              <input
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={inputStyle}
              />
            </div>
          )}

          {/* Step 3 */}

          {step === 3 && (
            <div className="grid md:grid-cols-2 gap-4">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="">Select Role</option>

                <option value="EMPLOYEE">Employee</option>

                <option value="HR">Hr</option>

                <option value="MANAGER">Manager</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="">Select Status</option>

                <option value="ACTIVE">Active</option>

                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <h2 className="font-semibold text-xl mb-4">
                Review Employee Details
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-sm text-slate-500">Employee Code</p>
                  <p className="font-semibold">{formData.employee_code}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-sm text-slate-500">Full Name</p>
                  <p className="font-semibold">
                    {formData.first_name} {formData.last_name}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-semibold">{formData.official_email}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-sm text-slate-500">Mobile Number</p>
                  <p className="font-semibold">{formData.mobile_number}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-sm text-slate-500">Department</p>
                  <p className="font-semibold">{formData.department}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-sm text-slate-500">Designation</p>
                  <p className="font-semibold">{formData.designation}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-sm text-slate-500">Role</p>
                  <p className="font-semibold">{formData.role}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="font-semibold">{formData.status}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="bg-slate-500 text-white px-6 py-3 rounded-xl"
            >
              Previous
            </button>
          )}

          {step < 4 ? (
            <button
              onClick={nextStep}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              {loading ? "Submitting..." : "Create Employee"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreation;
