import React, { useState, useEffect } from 'react';
import makeRequest from '../../axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  // Corrected useEffect hook to call fetchNotifications function
  useEffect(() => {
    fetchNotifications();
  }, []);  // Empty dependency array means this runs only once when the component mounts

  const fetchNotifications = async () => {
    try {
      const response = await makeRequest.get('/get-notifications');
      const { success, data } = response.data;
      console.log("Data received", data);
      if (success) {
        setNotifications(data);
      } else {
        setError('Failed to fetch notifications');
      }
    } catch (error) {
      setError('Error fetching notifications');
    }
  };

  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notifications.map(({ _id, text, startDate, endDate }) => {
            const formattedStartDate = new Date(startDate).toLocaleDateString();
            const formattedEndDate = new Date(endDate).toLocaleDateString();
            return (
              <div
                key={_id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="text-lg font-medium text-gray-800">{text}</div>
                <div className="text-sm text-gray-600 mt-4">
                  <p>
                    <strong className="text-gray-900">Start Date:</strong> {formattedStartDate}
                  </p>
                  <p>
                    <strong className="text-gray-900">End Date:</strong> {formattedEndDate}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;










