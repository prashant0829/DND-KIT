import React, { useState, useEffect } from "react";
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
          isOpen ? "w-64" : "w-12"
        }  text-gray-600 transition-all duration-500 border-r-2 text-[14px] border border-gray-200 shadow-lg rounded-lg box-border m-2`}
        style={{ height: "calc(100vh - 1rem)" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 min-h-14">
          <div className="text font-bold">{isOpen ? "Tasky" : ""}</div>
          <button onClick={toggleSidebar}>
            {isOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
          </button>
        </div>
        <div className="flex flex-col flex-grow overflow-auto navbar">
          <nav className="flex flex-col p-2">
            {[
              { icon: FaTasks, label: "Tasks" },
              { icon: FaCalendarAlt, label: "Calendar" },
              { icon: FaProjectDiagram, label: "Projects" },
              { icon: FaChartPie, label: "Reports" },
              { icon: FaUsers, label: "Team" },
            ].map(({ icon: Icon, label }, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center px-2 py-2 mb-2 transition-all duration-300 hover:bg-gray-100 hover:text-black rounded-md"
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
              </a>
            ))}
            <hr className="my-4 border-gray-200" />
            <a
              href="#"
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
            </a>
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
          <a
            href="#"
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
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
