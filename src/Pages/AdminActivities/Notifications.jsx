import React, { useState, useEffect } from 'react';
import makeRequest from '../../axios';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const NotificationCard = ({
    _id,
    title,
    text,
    startDate,
    endDate,
    notificationFor,
    isActive,
    createdAt,
    updatedAt,
    onToggle,
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
  
    const formatCompactDate = (dateStr) =>
      new Date(dateStr).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
  
    const compactCreatedAt = formatCompactDate(createdAt);
    const compactUpdatedAt = formatCompactDate(updatedAt);
  
    return (
      <div
        key={_id}
        className="bg-white shadow-md rounded-lg p-4 transition duration-300 transform hover:scale-[1.02] hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="relative group inline-block w-fit">
              <p className="text-lg font-bold text-gray-900 cursor-default">{title}</p>
              <div className="absolute z-50 hidden group-hover:block bg-white text-gray-800 text-xs rounded-md px-3 py-2 bottom-full left-0 mb-2 whitespace-nowrap shadow-lg border border-gray-200 transition-all duration-200">
                <span className="font-medium">Created:</span> {compactCreatedAt}
                <br />
                <span className="font-medium">Updated:</span> {compactUpdatedAt}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{text}</p>
          </div>
  
          <button
            onClick={() => onToggle(_id, isActive)}
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              isActive ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </button>
        </div>
  
        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <strong>Start:</strong>{' '}
            <span className="text-gray-600">{formattedStartDate}</span>
          </p>
          <p>
            <strong>End:</strong>{' '}
            <span className="text-gray-600">{formattedEndDate}</span>
          </p>
          <p>
            <strong>For:</strong>{' '}
            <span className="text-gray-600">{notificationFor}</span>
          </p>
        </div>
      </div>
    );
  };
  
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const toggleNotificationStatus = async (notificationId, currentStatus) => {
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
    } 
  };

  const formatCompactDate = (dateStr) =>
    new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900">Notifications</h2>

        <Link
          to="/admin-dashboard/announce"
          className="group relative flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 bg-gray-900 text-white text-sm rounded px-2 py-1 transition-all duration-300 whitespace-nowrap z-10">
            Add Notification
          </span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          <p className="ml-4 text-gray-600">Loading...</p>
        </div>
      ) : notifications.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No notifications available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            {...notification}
            onToggle={toggleNotificationStatus}
          />
        ))}
      </div>
      
      )}
    </div>
  );
};

export default Notifications;
