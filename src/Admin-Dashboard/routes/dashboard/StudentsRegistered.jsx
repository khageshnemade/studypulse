import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'; // Importing the icons

// Updated demoData with subjects for students who failed
const demoData = [
  { id: 1, name: 'John Doe', class: 'Class A', status: 'Pass', failedSubjects: [] },
  { id: 2, name: 'Jane Smith', class: 'Class B', status: 'Fail', failedSubjects: ['Math', 'Science'] },
  { id: 3, name: 'Sam Brown', class: 'Class A', status: 'Pass', failedSubjects: [] },
  { id: 4, name: 'Alice Green', class: 'Class B', status: 'Pass', failedSubjects: [] },
  { id: 5, name: 'Tom White', class: 'Class A', status: 'Fail', failedSubjects: ['History', 'Geography', 'Literature'] },
];

export default function StudentsRegistered() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [expandedSubjects, setExpandedSubjects] = useState(null); // State to track expanded subjects
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Filter students based on selected class and status
  const filteredStudents = demoData.filter(student => {
    return (
      (selectedClass ? student.class === selectedClass : true) &&
      (selectedStatus ? student.status === selectedStatus : true)
    );
  });

  // Go back to the previous page when the button is clicked
  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page in the browser history
  };

  // Toggle visibility of failed subjects
  const toggleFailedSubjects = (studentId) => {
    setExpandedSubjects((prev) => (prev === studentId ? null : studentId)); // Toggle between expanded and collapsed
  };

  return (
    <div className="p-6">
      {/* Go Back Button */}
      <button
        onClick={handleGoBack}
        className="mb-4 p-2 text-white bg-blue-500 rounded-lg flex items-center"
      >
        <ArrowLeft className="mr-2" />
        Go Back
      </button>

      <div className="mb-4 flex space-x-4">
        {/* Dropdown for Select Class */}
        <div className="w-1/2">
          <label className="block text-lg font-semibold mb-2">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-1 border-2 border-red-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          >
            <option value="">All Classes</option>
            <option value="Class A">Class A</option>
            <option value="Class B">Class B</option>
          </select>
        </div>

        {/* Dropdown for Select Status */}
        <div className="w-1/2">
          <label className="block text-lg font-semibold mb-2">Select Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-1 border-2 border-red-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          >
            <option value="">Select Status</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
        </div>
      </div>

      {/* Table to display filtered students */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-3">Name</th>
            <th className="border p-3">Class</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Failed Subjects</th> {/* New column for failed subjects */}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100 transition-all">
                <td className="border p-3">{student.name}</td>
                <td className="border p-3">{student.class}</td>
                <td className="border p-3">{student.status}</td>
                <td className="border p-3">
                  {student.status === 'Fail' && student.failedSubjects.length > 0 ? (
                    <div>
                      {/* Show first subject with a toggle button */}
                      <div className="flex items-center">
                        <span className="mr-2 text-red-600">{student.failedSubjects[0]}</span>
                        {student.failedSubjects.length > 1 && (
                          <button
                            onClick={() => toggleFailedSubjects(student.id)}
                            className="text-blue-500"
                          >
                            {expandedSubjects === student.id ? (
                              <ChevronUp className="inline" />
                            ) : (
                              <ChevronDown className="inline" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Show all subjects if expanded */}
                      {expandedSubjects === student.id && (
                        <ul className="mt-2">
                          {student.failedSubjects.slice(1).map((subject, index) => (
                            <li key={index} className="text-red-600">{subject}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <span className="text-green-600">None</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border p-3 text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
