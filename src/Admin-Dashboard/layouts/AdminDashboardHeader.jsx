// import { useTheme } from "../hooks/use-theme";

import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";

import profileImg from "../assets/profile-image.jpg";

import PropTypes from "prop-types";
import AdminModal from "./AdminModal";
import { useEffect, useState } from "react";
import axios from "axios";

export const AdminDashboardHeader = ({ collapsed, setCollapsed }) => {
  // const { theme, setTheme } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.userName || "Guest");
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  return (
    <>
      <header className="relative z-10 flex h-[60px] items-center justify-between bg-gradient-to-br from-blue-100 to-purple-300 px-4 shadow-md transition-colors ">
        <div className="flex items-center gap-x-3">
          <button
            className="btn-ghost size-10 text-gray-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronsLeft className={collapsed && "rotate-180"} />
          </button>
          {/* <div className="input">
                        <Search
                            size={20}
                            className="text-slate-300"
                        />
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search..."
                            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                        />
                    </div> */}
        </div>

        <div className="flex items-center justify-center text-gray-600 gap-2 font-bold ">
          <p>Welcome Back,</p>
          <h2 className=" text-gray-800 "> {userName} </h2>
          
          {/* Display other user data as needed */}
        </div>

        <div className="flex items-center gap-x-3">
          {/* <button
                        className="btn-ghost size-10"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        <Sun
                            size={20}
                            className="dark:hidden"
                        />
                        <Moon
                            size={20}
                            className="hidden dark:block"
                        />
                    </button> */}
          {/* <button className="btn-ghost size-10 text-gray-100">
                        <Bell size={20} />

                    </button> */}

          <button className="size-10 overflow-hidden rounded-full">
            <img
              src={profileImg}
              onClick={toggleModal} // Toggle modal visibility
              alt="profile image"
              className="size-full object-cover"
            />
          </button>
        </div>
      </header>
      {isModalOpen && <AdminModal onClose={toggleModal} />}
    </>
  );
};

AdminDashboardHeader.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};
