import React, { useEffect, useState } from 'react';
import makeRequest from '../../axios';

export default function OnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    fetchOnlineUsers();
  }, []);

  const fetchOnlineUsers = async () => {
    try {
      const res = await makeRequest.get(`/teacher/get-online-users`);
      console.log("Online Users: ", res?.data?.data);
      setOnlineUsers(res?.data?.data);
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };
 

  return (
    <div className="p-6 space-y-4">
      {/* Iterate over the onlineUsers array and render user data */}
      {onlineUsers.length > 0 ? (
        onlineUsers.map((user) => (
          <div key={user._id} className="flex items-center space-x-4 p-4 border rounded-lg shadow-md">
            <img
              src={user.profilePic} // Replace this with the correct image URL
              alt={`${user.userDetails.firstName} ${user.userDetails.lastName}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="font-semibold">{`${user.userDetails.firstName} ${user.userDetails.lastName}`}</p>
              <p className="text-sm text-gray-500">{user.userDetails.email}</p>
              <p className="text-xs text-gray-400">
                Last Active: {new Date(user.userDetails.lastActive).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No online users found</p>
      )}
    </div>
  );
}
