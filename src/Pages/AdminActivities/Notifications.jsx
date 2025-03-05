import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Make sure to install react-toastify
import makeRequest from '../../axios'; // Your axios setup for API calls (makeRequest)

export default function Notifications() {
  // State to hold the notification ID and the active status
  const [notificationId, setNotificationId] = useState('');
  const [isActive, setIsActive] = useState(true); // Default is 'true'

  // Function to toggle isActive (from true to false or vice versa)
  const toggleIsActive = () => {
    setIsActive((prevState) => !prevState);
  };

  // Function to update notification
  const updateNotification = async (e) => {
    e.preventDefault();
    try {
      const response = await makeRequest.patch(`admin/active-inactive-notification?notificationId=${notificationId}&isActive=${isActive}`);

      if (response.data.success) {
        toast.success(`Notification ${isActive ? 'Activated' : 'Deactivated'} successfully!`);
      } else {
        toast.error('Notification update failed. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to update notification.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Update Notification Status</h2>

      <form onSubmit={updateNotification} className="space-y-4">
        {/* Notification ID */}
        <div className="flex flex-col">
          <label htmlFor="notificationId" className="text-sm font-medium text-gray-600">Notification ID</label>
          <input
            id="notificationId"
            type="text"
            value={notificationId}
            onChange={(e) => setNotificationId(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Notification ID"
            required
          />
        </div>

        {/* Active Status Toggle */}
        <div className="flex items-center space-x-2">
          <label htmlFor="isActive" className="text-sm font-medium text-gray-600">Activate Notification</label>
          <button
            type="button"
            onClick={toggleIsActive}
            className={`px-4 py-2 text-white rounded-md ${isActive ? 'bg-green-500' : 'bg-red-500'} focus:outline-none`}
          >
            {isActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Notification Status
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}

