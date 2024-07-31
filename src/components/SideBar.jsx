import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTasks,
  FaCalendarAlt,
  FaProjectDiagram,
  FaChartPie,
  FaUsers,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaTrello,
  FaTachometerAlt,
  FaStickyNote,
} from "react-icons/fa";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showText, setShowText] = useState(isOpen);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setShowText(true);
      }, 300); // Delay in milliseconds
    } else {
      setShowText(false);
    }
  }, [isOpen]);

  return (
    <div className="">
      <div
        className={`flex flex-col ${
          isOpen ? "w-56" : "w-12"
        }  text-customGray-1 transition-all duration-500 text-[14px] border border-gray-200 shadow-lg rounded-lg box-border my-2 ml-2 font-thin`}
        style={{ height: "calc(100vh - 1rem)" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 min-h-14">
          <div className="text-[18px] font-bold text-customBlue-1 transition-opacity duration-300 animate-fadeIn">
            {showText ? "Tasky" : ""}
          </div>
          <button onClick={toggleSidebar}>
            {isOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
          </button>
        </div>
        <div className="flex flex-col flex-grow overflow-auto navbar">
          <nav className="flex flex-col p-2">
            {[
              { icon: FaTachometerAlt, label: "Dashboard", path: "/dashboard" },
              { icon: FaTrello, label: "Tasks", path: "/tasks" },
              { icon: FaTasks, label: "Boards", path: "/boards" },
              { icon: FaCalendarAlt, label: "Calendar", path: "/calendar" },
              { icon: FaProjectDiagram, label: "Projects", path: "/projects" },
              { icon: FaChartPie, label: "Reports", path: "/reports" },
              { icon: FaUsers, label: "Team", path: "/team" },
              { icon: FaStickyNote, label: "Notes", path: "/notes" },
            ].map(({ icon: Icon, label, path }, index) => (
              <Link
                key={index}
                to={path}
                className="flex items-center px-2 py-2 mb-2 transition-all duration-300 hover:bg-customBlue-2 hover:text-customBlue-1 rounded-md"
              >
                <div className="">
                  <Icon size={15} />
                </div>

                {showText && (
                  <span
                    className={`ml-4 leading-none transition-opacity duration-300 animate-fadeIn`}
                  >
                    {label}
                  </span>
                )}
              </Link>
            ))}
            <hr className="my-4 border-gray-200" />
            <Link
              to="/settings"
              className="flex items-center px-2 py-2 mb-2 transition-all duration-300 hover:bg-gray-100 hover:text-black rounded-md"
            >
              <FaCog size={15} />
              {showText && (
                <span
                  className={`ml-4 leading-none transition-opacity duration-300 animate-fadeIn`}
                >
                  Settings
                </span>
              )}
            </Link>
            <hr className="my-4 border-gray-200" />
          </nav>
        </div>
        <div className="p-2">
          <div className="flex items-center px-2 py-2 mb-2 transition-all duration-300 delay-300 hover:bg-gray-100 hover:text-black rounded-md">
            <img
              src="https://avatars.githubusercontent.com/u/106346460?v=4"
              alt="Profile Picture"
              className="w-8 h-8 rounded-full mr-4"
            />
            {showText && (
              <span
                className={`ml-4 leading-none transition-opacity duration-300 ${
                  isOpen ? "delay-300" : ""
                } ${showText ? "opacity-100" : "opacity-0"}`}
              >
                Caitlyn King
              </span>
            )}
          </div>
          <Link
            to="/signout"
            className="flex items-center px-2 py-2 mb-2 transition-all duration-300 hover:bg-gray-100 hover:text-black rounded-md"
          >
            <FaSignOutAlt size={15} />
            {showText && (
              <span
                className={`ml-4 leading-none transition-opacity duration-300 ${
                  isOpen ? "delay-300" : ""
                } ${showText ? "opacity-100" : "opacity-0"}`}
              >
                Sign out
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
