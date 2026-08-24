import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../api/auth/authApi";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handleLogin

  const handleLogin = async () => {
    try {
      const response = await loginApi({
        official_email: email,
        password: password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Reset Inputs
      setEmail("");
      setPassword("");

      if (response.data.role === "HR") {
        navigate("/hr/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <div className="min-h-screen flex bg-slate-100">
        {/* Left Section */}
        <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center p-10">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mt-8">
              Human Resource Management
            </h1>

            <p className="mt-4 text-lg text-blue-100 max-w-md mx-auto">
              A centralized platform for employees, managers, HR teams, and
              administrators to manage workforce operations efficiently.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                Attendance Tracking
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                Leave Management
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                Payroll Access
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                Employee Records
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800">
                  Welcome Back
                </h2>

                <p className="text-slate-500 mt-2">Sign in to continue</p>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-2 font-medium">Email Address</label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block mb-2 font-medium">Password</label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Remember Me */}
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember Me
                </label>

                <button type="button" className="text-blue-600 hover:underline">
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
