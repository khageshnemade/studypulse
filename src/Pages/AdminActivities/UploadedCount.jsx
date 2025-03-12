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

  return (
    <div className="max-w-5xl mx-auto p-6 bg-blue-300 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-white text-center mb-6">Teachers Video Upload Overview</h1>

      {/* Total Salary Section */}
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Total Salary Overview</h2>
        <div className="flex justify-between font-semibold text-lg mt-4">
          <div>Total Daily Salary:</div>
          <div className="text-xl text-green-500">${totalDailySalary.toFixed(2)}</div>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-2">
          <div>Total Monthly Salary:</div>
          <div className="text-xl text-green-500">${totalMonthlySalary.toFixed(2)}</div>
        </div>
      </div>

      {/* Teachers Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachersData.map((teacher, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => toggleTeacherDetails(teacher)}
          >
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold text-gray-800">{teacher.name}</div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Daily: {teacher.dailyUploadedVideos}</span> |
                <span className="font-medium"> Monthly: {teacher.monthlyUploadedVideos}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying teacher details */}
      {isModalOpen && currentTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <div className="flex justify-between">
              <div className="text-2xl font-semibold text-gray-800">{currentTeacher.name}</div>
              <button className="text-2xl text-gray-600" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <div className="font-semibold text-gray-700">Subject:</div>
                <div className="text-gray-600">{currentTeacher.subject}</div>
              </div>

              <div className="flex justify-between">
                <div className="font-semibold text-gray-700">Daily Limit:</div>
                <div className="text-gray-600">{currentTeacher.dailyLimit}</div>
              </div>

              <div className="flex justify-between">
                <div className="font-semibold text-gray-700">Monthly Limit:</div>
                <div className="text-gray-600">{currentTeacher.monthlyLimit}</div>
              </div>

              <div className="flex justify-between">
                <div className="font-semibold text-gray-700">Salary per Video:</div>
                <div className="text-gray-600">${currentTeacher.subjectSalary[currentTeacher.subject]}</div>
              </div>

              <div className="flex justify-between font-bold text-xl text-blue-600">
                <div>Total Daily Salary:</div>
                <div>${calculateSalary(currentTeacher.dailyUploadedVideos, currentTeacher.subject, currentTeacher).toFixed(2)}</div>
              </div>

              <div className="flex justify-between font-bold text-xl text-blue-600">
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
