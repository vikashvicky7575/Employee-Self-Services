import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";

const MainLayout = ({ role }) => {
  return (
    <>
      <div className="h-screen bg-slate-100">
        <Sidebar role={role} />

        <Navbar />

        <main className="ml-64 pt-16 p-6 bg-slate-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
