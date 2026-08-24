import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { roleConfig } from "../config/roleConfig";

const SideBar = ({ role }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const config = roleConfig[role];

  //get Notification
  const [hasNewAnnouncement, setHasNewAnnouncement] = useState(
    localStorage.getItem("newAnnouncement"),
  );

  return (
    <aside
      className={`
    fixed
    left-0
    top-0
    h-screen
    w-64
    text-white
    ${config.theme.sidebar}
  `}
    >
      <div className="p-5">
        <h2 className="font-bold text-xl">{config.title}</h2>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {config.menus.map((menu, index) => (
            <li key={index}>
              {menu.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === index ? null : index)
                    }
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 flex justify-between items-center"
                  >
                    <span>{menu.label}</span>

                    <span>{openMenu === index ? "−" : "+"}</span>
                  </button>

                  {openMenu === index && (
                    <ul className="ml-5 mt-2 space-y-1">
                      {menu.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 rounded-lg text-sm transition ${
                                isActive
                                  ? "bg-white text-black"
                                  : "hover:bg-white/20"
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={menu.path}
                  //handleAnnouncement handleclick
                  onClick={() => {
                    if (menu.path === "/employee/announcement") {
                      localStorage.removeItem("newAnnouncement");

                      setHasNewAnnouncement(null);
                    }
                  }}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition ${
                      isActive ? "bg-white text-black" : "hover:bg-white/20"
                    }`
                  }
                >
                  <div className="flex items-center justify-between">
                    {menu.label}

                    {/* Notification Dot */}
                    {menu.path === "/employee/announcement" &&
                      hasNewAnnouncement === "true" && (
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>

                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      )}
                  </div>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
