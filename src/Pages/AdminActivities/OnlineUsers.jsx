import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import makeRequest from "../../axios"; // Import the appropriate function for making API requests

export default function OnlineUsers() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    fetchOnlineUsers();
  }, []);

  const fetchOnlineUsers = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get(`/teacher/get-online-users`);
      console.log("Online Users: ", res?.data?.data);
      setOnlineUsers(res?.data?.data);
    } catch (error) {
      console.error("Request Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4 flex flex-col justify-between h-full">
      {/* Title Section */}

      <h2 className="text-lg font-semibold  mb-4 bg-gradient-to-r from-red-400 to-red-300 text-white p-2 rounded-md shadow-md font-serif text-center">
        Online Users
      </h2>
      {/* Loading Spinner */}
      {loading && (
        <div className="mt-2 flex justify-center items-center">
          <div className="animate-spin border-4 border-blue-500 border-t-transparent w-6 h-6 rounded-full"></div>
        </div>
      )}
      {/* Users List */}
      <div className="space-y-4 flex-1">
        {onlineUsers.length > 0 ? (
          onlineUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center space-x-4 p-4 border rounded-lg shadow-md"
            >
              <img
                src={user.profilePic} // Replace this with the correct image URL
                alt={`${user.firstName} ${user.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400">
                  Last Active: {new Date(user.lastActive).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No online users found</p>
        )}
      </div>

      {/* View More Button */}

      {location.pathname !== "/admin-dashboard/users" && (
        <div className="text-center mt-auto">
          <Link
            className="btn bg-red-400 hover:bg-red-500 text-white mt-2 py-2 px-4 rounded-full"
            to="/admin-dashboard/users"
          >
            View More
          </Link>
        </div>
      )}
    </div>
  );
}
