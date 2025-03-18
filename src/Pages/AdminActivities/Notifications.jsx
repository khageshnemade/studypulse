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
      const response = await makeRequest.get('/admin/get-all-notifications');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">Notifications</h2>

      {/* No notifications message */}
      {notifications.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No notifications available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {notifications.map(
            ({
              _id,
              text,
              startDate,
              endDate,
              notificationFor,
              isActive,
              createdAt,
              updatedAt,
            }) => {
              // Date formatting
              const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              });
              const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              });
              const formattedCreatedAt = new Date(createdAt).toLocaleString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
              });
              const formattedUpdatedAt = new Date(updatedAt).toLocaleString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
              });

              return (
                <div
                  key={_id}
                  className="bg-white shadow-xl rounded-lg p-6 transition duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{text}</h3>
                    </div>
                    <div
                      className={`px-3 py-1 text-sm font-medium rounded-full ${isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <strong className="text-gray-700">Start Date: </strong>
                      <span className="text-gray-600">{formattedStartDate}</span>
                    </div>
                    <div>
                      <strong className="text-gray-700">End Date: </strong>
                      <span className="text-gray-600">{formattedEndDate}</span>
                    </div>
                    <div>
                      <strong className="text-gray-700">Notification For: </strong>
                      <span className="text-gray-600">{notificationFor}</span>
                    </div>
                    <div>
                      <strong className="text-gray-700">Created At: </strong>
                      <span className="text-gray-600">{formattedCreatedAt}</span>
                    </div>
                    <div>
                      <strong className="text-gray-700">Updated At: </strong>
                      <span className="text-gray-600">{formattedUpdatedAt}</span>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;










