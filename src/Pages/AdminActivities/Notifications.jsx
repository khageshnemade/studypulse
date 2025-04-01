import React, { useState, useEffect } from 'react';
import makeRequest from '../../axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true); // Show loading
    try {
      const response = await makeRequest.get('/admin/get-all-notifications');
      const { success, data } = response.data;
      if (success) {
        setNotifications(data);
      } else {
        setError('Failed to fetch notifications');
      }
    } catch (error) {
      setError('Error fetching notifications');
    } finally {
      setLoading(false); // Hide loading
    }
  };

  const toggleNotificationStatus = async (notificationId, currentStatus) => {
    setLoading(true); // Show loading
    try {
      const response = await makeRequest.patch(
        `admin/active-inactive-notification?notificationId=${notificationId}&isActive=${!currentStatus}`
      );
      const { success } = response.data;

      if (success) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === notificationId
              ? { ...notification, isActive: !currentStatus }
              : notification
          )
        );
      } else {
        alert('Failed to update notification status');
      }
    } catch (error) {
      console.error('Error toggling notification status:', error);
      alert('An error occurred while updating the notification status');
    } finally {
      setLoading(false); // Hide loading
    }
  };

  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">Notifications</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          <p className="ml-4 text-gray-600">Loading...</p>
        </div>
      ) : notifications.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No notifications available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {notifications.map(
            ({
              _id,
              title,
              text,
              startDate,
              endDate,
              notificationFor,
              isActive,
              createdAt,
              updatedAt,
            }) => {
              const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
              const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
              const formattedCreatedAt = new Date(createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
              const formattedUpdatedAt = new Date(updatedAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={_id}
                  className="bg-white shadow-xl rounded-lg p-6 transition duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xl font-semibold text-gray-800">{title}</p>
                      <p className="text-xl font-semibold text-gray-800">{text}</p>
                    </div>
                    <button
                      onClick={() => toggleNotificationStatus(_id, isActive)}
                      className={`px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap ${
                        isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isActive ? 'Active' : 'Inactive'}
                    </button>
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
