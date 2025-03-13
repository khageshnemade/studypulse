import React, { useEffect, useState } from 'react';
import makeRequest from '../../axios';

export default function OnlineUsers({users}) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    fetchOnlineUsers();
    if(users) setOnlineUsers(users);
  }, []);

  
  const fetchOnlineUsers = async () => {
    try {
      const res = await makeRequest.get(`/admin/get-online-users`);
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
            src={user.profilePic} // Ensure this is a valid image URL
            alt={`${user?.userDetails?.firstName || 'User'} ${user?.userDetails?.lastName || ''}`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="font-semibold">{`${user?.userDetails?.firstName || 'No First Name'} ${user?.userDetails?.lastName || 'No Last Name'}`}</p>
            <p className="text-sm text-gray-500">{user?.userDetails?.email || 'No Email'}</p>
            <p className="text-xs text-gray-400">
              Last Active: {user?.userDetails?.lastActive ? new Date(user.userDetails.lastActive).toLocaleString() : 'Unknown'}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p>No online users</p>
    )}
  </div>
  
        ))
      ) : (
        <p className="text-gray-500">No online users found</p>
      )}
    </div>
  );
}
