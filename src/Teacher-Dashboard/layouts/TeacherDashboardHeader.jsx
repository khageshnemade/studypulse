import { Bell, ChevronsLeft, Menu, Moon, Search, Sun } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useLocation, Link, useNavigate } from "react-router-dom";  // Import useLocation for breadcrumb functionality

export const TeacherDashboardHeader = ({ collapsed, setCollapsed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [userName, setUserName] = useState("");
  const location = useLocation();  // Hook to get the current location
  const navigate=useNavigate();
  const toggleModal = () => {
    navigate('/teacher-dashboard/get_data');
  };

  // Get user data from localStorage and set the user name
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      getPreviousData();
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
      setProfilePic(res?.data?.data?.profilePic);
    } catch (error) {
      console.error("Error fetching Teacher data:", error.message);
    }
  };

  // Create breadcrumb items based on the location pathname
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
    <header className="relative z-10 flex h-[60px] items-center justify-between px-4 shadow-md transition-colors bg-blue-500">
    <div className="flex self-end gap-x-3  relative bottom-2 ">
    <button
      className="btn-ghost size-10 text-gray-100"
      onClick={() => setCollapsed(!collapsed)}
    >
      <Menu className={collapsed && "rotate-180"} />
    </button>
  </div>

  {/* Breadcrumb section aligned to the left */}
  <div className="flex-1 flex items-center justify-start">
  <nav aria-label="breadcrumb">
    <ol className="hidden sm:flex flex-wrap space-x-2 text-sm bg-light-blue-500 text-white">
      {/* Always display Home */}
      <li>
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
      </li>
      {/* Render breadcrumbs for pathnames excluding the first item */}
      {pathnames.slice(1).map((segment, index) => {
        const to = `/${pathnames.slice(0, index + 2).join("/")}`; // index + 2 to account for Home being excluded
        return (
          <li key={to} className="flex items-center space-x-2">
            <span>/</span>
            <Link
              to={to}
              className="text-white hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </Link>
          </li>
        );
      })}
    </ol>
  </nav>
</div>

 {/* Centered welcome text */}
  <div className="flex items-center justify-center text-white gap-1 font-bold mr-4">
          <p className="">Welcome Back,</p>
    <h2 className="text-inherit">{userName}</h2>
  </div>

  {/* Profile button */}
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



      {/* Breadcrumb */}


    </>
  );
};

TeacherDashboardHeader.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};
