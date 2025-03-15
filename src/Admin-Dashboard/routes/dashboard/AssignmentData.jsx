import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AssignmentData = () => {
  // Demo data for students, assignments, and subjects
  const demoData = [
    { studentId: 'S001', name: 'Alice', assignment: 'Math Exam', subject: 'Math', attempts: 3, status: 'Passed' },
    { studentId: 'S002', name: 'Bob', assignment: 'Math Exam', subject: 'Math', attempts: 2, status: 'Passed' },
    { studentId: 'S003', name: 'Charlie', assignment: 'History Quiz', subject: 'History', attempts: 4, status: 'Passed' },
    { studentId: 'S004', name: 'David', assignment: 'Math Exam', subject: 'Math', attempts: 5, status: 'Failed' },
    { studentId: 'S005', name: 'Eve', assignment: 'History Quiz', subject: 'History', attempts: 1, status: 'Passed' }
  ];

  const subjects = ['Math', 'History', 'Science'];

  // State for the selected subject
  const [selectedSubject, setSelectedSubject] = useState('');

  // Handle subject change
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  // Filter demo data based on the selected subject
  const filteredData = selectedSubject
    ? demoData.filter(student => student.subject === selectedSubject)
    : demoData;

  // Calculate average attempts for the passed students
  const passedStudents = filteredData.filter(student => student.status === 'Passed');
  const averageAttempts = passedStudents.length > 0
    ? passedStudents.reduce((acc, student) => acc + student.attempts, 0) / passedStudents.length
    : 0;

    return (
      <div className="p-6 flex flex-col h-full justify-between">
        {/* Title Section */}
        <h1 className="text-3xl font-semibold mb-6">Student Assignment Attempts Dashboard</h1>
    
        {/* Average Attempts Section */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Average Attempts to Pass: {averageAttempts.toFixed(1)}</h2>
        </div>
    
        {/* Subject Selection Dropdown */}
        <div className="mb-6 flex justify-start">
          <select
            value={selectedSubject}
            onChange={handleSubjectChange}
            className="w-56 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
    
        {/* Assignment Data Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-200">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">Student Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">Assignment</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">Attempts</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student, index) => (
                <tr
                  key={student.studentId}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } border-t border-b border-gray-300`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-300">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-300">{student.assignment}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-300">{student.attempts}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
        {/* View More Button */}
        <div className="text-center mt-auto">
          <Link className="btn bg-gray-500 text-white mt-2 py-2 px-4 rounded-full" to="/admin-dashboard/ass_stat">
            View More
          </Link>
        </div>
      </div>
    );
    
    
};
export default AssignmentData;
