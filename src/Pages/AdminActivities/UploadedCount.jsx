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

  useEffect(() => {
    // Simulating API call here
    setTeachersData(mockApiResponse);
  }, []);

  // Toggle function to show/hide teacher details
  const toggleTeacherDetails = (id) => {
    setExpandedTeacherId(expandedTeacherId === id ? null : id); // Toggle expanded state
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Teachers Video Upload Details</h1>

      {/* Total Salary Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold">Total Salary Overview</h2>
        <div className="flex justify-between font-bold text-lg mt-2">
          <div>Total Daily Salary:</div>
          <div>${totalDailySalary}</div>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <div>Total Monthly Salary:</div>
          <div>${totalMonthlySalary}</div>
        </div>
      </div>

      {/* Teachers List Section */}
      <div className="space-y-4">
        {teachersData.map((teacher, index) => (
          <div key={index} className="border-b py-3">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleTeacherDetails(index)}
            >
              <div className="font-semibold">{teacher.name}</div>
              <div className="flex items-center space-x-2">
                <div>
                  <span className="font-medium">Daily Uploaded: {teacher.dailyUploadedVideos}</span> |
                  <span className="font-medium"> Monthly Uploaded: {teacher.monthlyUploadedVideos}</span>
                </div>
                <svg
                  className={`w-6 h-6 ${expandedTeacherId === index ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Full Details Section */}
            {expandedTeacherId === index && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <div className="font-semibold">Subject:</div>
                  <div>{teacher.subject}</div>
                </div>

                <div className="flex justify-between">
                  <div className="font-semibold">Daily Limit:</div>
                  <div>{teacher.dailyLimit}</div>
                </div>

                <div className="flex justify-between">
                  <div className="font-semibold">Monthly Limit:</div>
                  <div>{teacher.monthlyLimit}</div>
                </div>

                <div className="flex justify-between">
                  <div className="font-semibold">Salary per Video:</div>
                  <div>${teacher.subjectSalary[teacher.subject]}</div>
                </div>

                <div className="flex justify-between font-bold text-xl">
                  <div>Total Daily Salary:</div>
                  <div>${calculateSalary(teacher.dailyUploadedVideos, teacher.subject, teacher)}</div>
                </div>

                {/* Display Total Monthly Salary */}
                <div className="flex justify-between font-bold text-xl">
                  <div>Total Monthly Salary:</div>
                  <div>${calculateSalary(teacher.monthlyUploadedVideos, teacher.subject, teacher)}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
