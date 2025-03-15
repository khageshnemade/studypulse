import React, { useEffect, useState } from 'react';

// Demo data to simulate API response
const mockApiResponse = [
  {
    name: 'John Doe',
    subject: 'Math',
    dailyUploadedVideos: 5,
    monthlyUploadedVideos: 100,
    dailyLimit: 10,
    monthlyLimit: 200,
    subjectSalary: {
      Math: 15, // per video
      Science: 12,
      History: 10,
    }
  },
  
  {
    name: 'Jane Smith',
    subject: 'Science',
    dailyUploadedVideos: 8,
    monthlyUploadedVideos: 150,
    dailyLimit: 10,
    monthlyLimit: 200,
    subjectSalary: {
      Math: 15, // per video
      Science: 12,
      History: 10,
    }
  }
];

export default function UploadedCount() {
  const [teachersData, setTeachersData] = useState([]);
  const [expandedTeacherId, setExpandedTeacherId] = useState(null); // Track expanded teacher's ID
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [currentTeacher, setCurrentTeacher] = useState(null); // Store the teacher data for the modal

  useEffect(() => {
    // Simulating API call here
    setTeachersData(mockApiResponse);
  }, []);

  // Toggle function to show/hide teacher details and open modal
  const toggleTeacherDetails = (teacher) => {
    setCurrentTeacher(teacher);
    setIsModalOpen(true); // Open the modal when a card is clicked
  };

  // Calculate salary based on uploaded videos and subject salary
  const calculateSalary = (uploadedVideos, subject, teacher) => {
    const salaryPerVideo = teacher.subjectSalary[subject];
    return uploadedVideos * salaryPerVideo;
  };

  // Calculate total salary for all teachers (daily and monthly)
  const calculateTotalSalary = () => {
    let totalDailySalary = 0;
    let totalMonthlySalary = 0;

    teachersData.forEach(teacher => {
      totalDailySalary += calculateSalary(teacher.dailyUploadedVideos, teacher.subject, teacher);
      totalMonthlySalary += calculateSalary(teacher.monthlyUploadedVideos, teacher.subject, teacher);
    });

    return { totalDailySalary, totalMonthlySalary };
  };

  const { totalDailySalary, totalMonthlySalary } = calculateTotalSalary();

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTeacher(null);
  };

  // Calculate remaining videos
  const calculateRemainingVideos = (uploadedVideos, limit) => {
    return limit - uploadedVideos;
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-xl">
      <h1 className="text-4xl font-extrabold text-white text-center mb-8">Teachers Video Upload Overview</h1>
  
      {/* Total Salary Section */}
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl mb-12">
        <h2 className="text-2xl font-semibold text-gray-800">Total Salary Overview</h2>
        <div className="flex justify-between font-medium text-lg mt-6">
          <div>Total Daily Salary:</div>
          <div className="text-xl text-green-600">${totalDailySalary.toFixed(2)}</div>
        </div>
        <div className="flex justify-between font-medium text-lg mt-4">
          <div>Total Monthly Salary:</div>
          <div className="text-xl text-green-600">${totalMonthlySalary.toFixed(2)}</div>
        </div>
      </div>
  
      {/* Teachers List Section */}
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-2xl mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Teachers List</h2>
        <div className="space-y-6">
          {teachersData.map((teacher, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition duration-200"
              onClick={() => toggleTeacherDetails(teacher)}
            >
              <div className="text-xl font-semibold text-gray-800">{teacher.name}</div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Daily Uploaded: {teacher.dailyUploadedVideos}</span> |
                <span className="font-medium"> Monthly Uploaded: {teacher.monthlyUploadedVideos}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Modal for displaying teacher details */}
      {isModalOpen && currentTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg w-96 shadow-2xl animate__animated animate__fadeIn">
            <div className="flex justify-between items-center mb-6">
              <div className="text-3xl font-semibold text-gray-800">{currentTeacher.name}</div>
              <button className="text-3xl text-gray-600 hover:text-gray-900" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between text-lg font-medium">
                <div>Subject:</div>
                <div className="text-gray-600">{currentTeacher.subject}</div>
              </div>
              {/* Display Remaining Videos instead of Limits */}
              <div className="flex justify-between text-lg font-medium">
                <div>Remaining Daily Videos:</div>
                <div className="text-gray-600">{calculateRemainingVideos(currentTeacher.dailyUploadedVideos, currentTeacher.dailyLimit)}</div>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <div>Remaining Monthly Videos:</div>
                <div className="text-gray-600">{calculateRemainingVideos(currentTeacher.monthlyUploadedVideos, currentTeacher.monthlyLimit)}</div>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <div>Salary per Video:</div>
                <div className="text-gray-600">${currentTeacher.subjectSalary[currentTeacher.subject]}</div>
              </div>
              <div className="flex justify-between font-semibold text-xl text-blue-600 mt-4">
                <div>Total Daily Salary:</div>
                <div>${calculateSalary(currentTeacher.dailyUploadedVideos, currentTeacher.subject, currentTeacher).toFixed(2)}</div>
              </div>
              <div className="flex justify-between font-semibold text-xl text-blue-600">
                <div>Total Monthly Salary:</div>
                <div>${calculateSalary(currentTeacher.monthlyUploadedVideos, currentTeacher.subject, currentTeacher).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
