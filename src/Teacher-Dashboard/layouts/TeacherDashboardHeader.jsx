import { Bell, Menu } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { makeRequest } from "../../axios";
import { useLocation, Link, useNavigate } from "react-router-dom";

export const TeacherDashboardHeader = ({ collapsed, setCollapsed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState([]); // State to hold notifications
  const [unreadNotifications, setUnreadNotifications] = useState(true); // Flag to show unread notifications
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State to handle notification dropdown visibility
  const notificationRef = useRef(null); // Ref for the notification dropdown
  const location = useLocation();  // Hook to get the current location
  const navigate = useNavigate();

  const toggleModal = () => {
    navigate('/teacher-dashboard/get_data');
  };

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

  const handleBellClick = () => {
    setUnreadNotifications(false); // Mark notifications as read
    setNotifications([
      { id: 1, message: "New Assignment available!" },
      { id: 2, message: "Your class schedule has been updated." },
    ]);
    setIsNotificationOpen((prev) => !prev); // Toggle notification dropdown visibility
  };

  // Handle clicks outside the notification dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false); // Close the dropdown when clicking outside
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup on unmount
    };
  }, []);

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between px-4 shadow-md transition-colors bg-blue-500">
      <div className="flex self-end gap-x-3 relative bottom-2">
        <button
          className="btn-ghost size-10 text-gray-100"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className={collapsed && "rotate-180"} />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-start">
        <nav aria-label="breadcrumb">
          <ol className="hidden sm:flex flex-wrap space-x-2 text-sm bg-light-blue-500 text-white">
            <li>
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
            </li>
            {pathnames.slice(1).map((segment, index) => {
              const to = `/${pathnames.slice(0, index + 2).join("/")}`;
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

      <div className="flex items-center justify-center text-white gap-1 font-bold mr-4">
        <p>Welcome Back,</p>
        <h2 className="text-inherit">{userName}</h2>
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

      <div className="relative">
        <button onClick={handleBellClick} className="w-10 h-10 flex items-center justify-center">
          <Bell
            className={`text-white ${unreadNotifications ? "scale-110" : ""} transition-transform duration-300`}
            size={24}
          />
          {unreadNotifications && (
            <span className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
          )}
        </button>
        {isNotificationOpen && notifications.length > 0 && (
          <div
            ref={notificationRef}
            className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-4 max-w-xs w-64"
          >
            <h3 className="font-semibold text-gray-800">Notifications</h3>
            <ul className="space-y-2 mt-2">
              {notifications.map((notification) => (
                <li key={notification.id} className="text-sm text-gray-700">
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

TeacherDashboardHeader.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};
