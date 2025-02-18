// import { useTheme } from "../hooks/use-theme";

import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";

import profileImg from "../assets/profile-image.jpg";

import PropTypes from "prop-types";
import AdminModal from "./TeacherModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { makeRequest } from "../../axios";

export const TeacherDashboardHeader = ({ collapsed, setCollapsed }) => {
  // const { theme, setTheme } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      getPreviousData()
      try {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.userName || "Guest");
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  const getPreviousData = async () => {
    try {
      const res = await makeRequest.get("/teacher/get-data");

      console.log("Previous Data from Dashboard:", res?.data?.data?.profilePic);
      
      setProfilePic(res?.data?.data?.profilePic)
    } catch (error) {
      console.error("Error fetching Teacher data:", error.message);
    }
  };
  return (
    <>
      <header className="relative z-10 flex h-[60px] items-center justify-between px-4 shadow-md transition-colors bg-blue-500 ">
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


        <button 
  onClick={toggleModal} 
  className="w-10 h-10 overflow-hidden rounded-full cursor-pointer"
>
  {profilePic ? (
    <img
      src={profilePic}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-2xl font-bold">
      {userName.split(" ").map(name => name[0]).join("").toUpperCase()}
    </div>
  )}
</button>

        </div>
      </header>
      {isModalOpen && <AdminModal onClose={toggleModal} />}
    </>
  );
};

TeacherDashboardHeader.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};
