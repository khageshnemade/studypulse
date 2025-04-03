import { Bell, Menu } from "lucide-react"; // Import X (close) icon
import { X } from "react-feather";

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { makeRequest } from "../../axios";
import { useLocation, Link, useNavigate } from "react-router-dom";

export const TeacherDashboardHeader = ({ collapsed, setCollapsed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState([]); // State to hold notifications
  const [unreadNotifications, setUnreadNotifications] = useState(true); // Flag to show unread notifications
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State to handle notification dropdown visibility
  const notificationRef = useRef(null); // Ref for the notification dropdown
  const location = useLocation(); // Hook to get the current location
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    profilePic: "",
    organizationName: "",
  });

  useEffect(() => {
    // Fetch the data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setProfile({
        profilePic: userData.profilePic,
        organizationName: userData.organizationName,
      });
    }
  }, []);
  const toggleModal = () => {
    navigate("/teacher-dashboard/get_data");
  };

  const closeModal = () => {
    setIsNotificationOpen(false);
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

  const handleBellClick = async () => {
    try {
      const response = await makeRequest.get("/get-notifications");
      const { success, data } = response.data;
      console.log("Data received", data);
      if (success) {
        setNotifications(data);
      } else {
        setError("Failed to fetch notifications");
      }
    } catch {
      setError("Error fetching notifications");
    }
    setUnreadNotifications(false);

    setIsNotificationOpen((prev) => !prev); // Toggle notification dropdown visibility
  };

  // Handle clicks outside the notification dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
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
    <header className="relative z-10 flex h-[70px] items-center justify-between px-6 shadow-xl transition-colors bg-gradient-to-r from-teal-500 via-teal-600 to-blue-600 rounded-b-xl">
      {/* Menu Button */}
      <div className="flex items-center gap-x-3 mr-2">
        <button
          className="p-2 rounded-full bg-transparent text-white hover:bg-teal-600 transition-colors duration-200"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex-1 flex items-center justify-start">
        <nav aria-label="breadcrumb">
          <ol className="hidden sm:flex space-x-3 text-sm text-white">
            <li>
              <Link
                to="/"
                className="hover:text-blue-300 text-white font-medium"
              >
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
                    className="hover:text-blue-300 text-white font-medium"
                  >
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Organization and User Name (on hover) */}
      <div className="flex items-center gap-2 text-white font-semibold mr-6 group relative">
        {/* Profile Picture with Hover Effect */}

        <button
          onClick={toggleModal}
          className="w-12 h-12 rounded-full overflow-hidden cursor-pointer bg-teal-600 flex items-center justify-center"
        >
          {profile.profilePic ? (
            <img
              src={profile.profilePic}
              alt="Profile"
              className="w-full h-full object-cover rounded-full transition-opacity duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-lg font-bold">
              {userName
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </div>
          )}
        </button>

        {/* Show Organization Name and Username on Hover (Only the Text) */}
        <div className="absolute bottom-full top-8 transform -translate-x-2/3 mb-2 group-hover:block group-hover:opacity-80 hidden rounded-xl w-[300px] text-center transition-opacity duration-300 opacity-0">
          <div className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 p-4 rounded-lg shadow-lg">
            <p className="text-white">{profile?.organizationName}</p>
            <p className="text-white mt-1">{userName}</p>
          </div>
        </div>
      </div>

      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={handleBellClick}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-teal-600 transition-colors duration-200"
        >
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
            className="absolute top-12 right-0 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-xl rounded-xl p-4 max-w-xs w-[300px] transition-all duration-300 ease-in-out"
          >
            <h3 className="font-bold text-gray-800 text-lg mb-3">
              Announcements
            </h3>
            <ul className="space-y-4">
              {notifications.map((notification) => {
                const formattedDate = new Date(
                  notification.endDate
                ).toLocaleDateString();
                return (
                  <li
                    key={notification._id}
                    className="flex items-center space-x-3 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition duration-200"
                  >
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {notification.text}
                      </p>
                      <span className="text-xs text-gray-500">
                        {formattedDate}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            {/* Close Button for Notifications */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition-transform transform hover:scale-125"
            >
              <X size={18} />
            </button>
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
