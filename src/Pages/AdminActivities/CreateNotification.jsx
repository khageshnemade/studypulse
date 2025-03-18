import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Make sure to install react-toastify
import makeRequest from '../../axios'; // Your axios setup for API calls (makeRequest)
import { useNavigate } from 'react-router-dom'; // For redirecting after success

export default function CreateNotification() {
    const [title, setTitle] = useState(''); // New state for the title
    const [text, setText] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [notificationFor, setNotificationFor] = useState('all');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); 

    const today = new Date().toISOString().split('T')[0];

    const createNotification = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate startDate and endDate
        if (startDate < today) {
            toast.error('Start Date cannot be in the past.');
            setIsLoading(false);
            return;
        }

        if (endDate < startDate) {
            toast.error('End Date must be greater than or equal to Start Date.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await makeRequest.post('admin/create-notification', {
                title, // Include the title field
                text,
                startDate,
                endDate,
                notificationFor, // can be 'all', 'student', or 'teacher'
            });

            if (response.data.success) {
                toast.success('Notification created successfully!');
                // Redirect to admin dashboard after success
                setTimeout(() => {
                    navigate('/admin-dashboard'); // Redirect to the admin dashboard page
                }, 2000);
            } else {
                toast.error('Notification creation failed. Please try again.');
            }
        } catch (error) {
            toast.error('Failed to create notification.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Create Notification</h2>
            <form onSubmit={createNotification} className="space-y-4">
                {/* Title Input */}
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm font-medium text-gray-600">Notification Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter notification title"
                        required
                    />
                </div>

                {/* Notification Text */}
                <div className="flex flex-col">
                    <label htmlFor="text" className="text-sm font-medium text-gray-600">Notification Text</label>
                    <input
                        id="text"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter notification text"
                        required
                    />
                </div>

                {/* Start Date */}
                <div className="flex flex-col">
                    <label htmlFor="startDate" className="text-sm font-medium text-gray-600">Start Date</label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={today}  // Prevent start date from being before today
                        className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* End Date */}
                <div className="flex flex-col">
                    <label htmlFor="endDate" className="text-sm font-medium text-gray-600">End Date</label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}  // Prevent end date from being before start date
                        className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Notification For */}
                <div className="flex flex-col">
                    <label htmlFor="notificationFor" className="text-sm font-medium text-gray-600">Notification For</label>
                    <select
                        id="notificationFor"
                        value={notificationFor}
                        onChange={(e) => setNotificationFor(e.target.value)}
                        className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="all">All</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Creating...' : 'Create Notification'}
                    </button>
                </div>
            </form><ToastContainer />
        </div>
    );
}
