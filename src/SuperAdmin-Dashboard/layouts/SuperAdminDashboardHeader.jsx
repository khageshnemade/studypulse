// import { useTheme } from "../hooks/use-theme";

import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";

import profileImg from "../assets/profile-image.jpg";

import PropTypes from "prop-types";
import AdminModal from "./SuperAdminModal";
import { useEffect, useState } from "react";
import axios from "axios";

export const SuperAdminDashboardHeader = ({ collapsed, setCollapsed }) => {
  // const { theme, setTheme } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [userName, setUserName] = useState("");
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
      <header className="relative z-10 flex h-[60px] items-center justify-between bg-blue-500 px-4 shadow-md transition-colors ">
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
          <p></p>
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

<button
            onClick={toggleModal}
            className="w-10 h-10 overflow-hidden rounded-full cursor-pointer"
          >
            
              <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-2xl font-bold">
                {userName.split(" ").map(name => name[0]).join("").toUpperCase()}
              </div>
          
          </button>
        </div>
      </header>
      {isModalOpen && <AdminModal onClose={toggleModal} />}
    </>
  );
};

SuperAdminDashboardHeader.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};
