import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <header
      className="
        fixed
        top-0
        left-64
        right-0
        h-16
        bg-white
        border-b
        shadow-sm
        flex
        items-center
        justify-between
        px-6
        z-30
      "
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-slate-800">
          {role} MANAGEMENT SYSTEM
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.first_name}`}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <p className="font-semibold">{user?.first_name}</p>

            <p className="text-xs text-slate-500">{role}</p>
          </div>
        </div>

        {/* hadle logout */}
        <button
          onClick={handleLogout}
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-4
            py-2
            rounded-lg
            font-medium
            transition
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
