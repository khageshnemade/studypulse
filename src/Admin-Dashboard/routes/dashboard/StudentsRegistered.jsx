import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Importing only the necessary icons

const demoData = [
  { id: 1, name: 'John Doe', class: 'Class A', status: 'Pass', subjects: [{ subject: 'Math', marks: 80 }, { subject: 'Science', marks: 75 }] },
  { id: 2, name: 'Jane Smith', class: 'Class B', status: 'Fail', subjects: [{ subject: 'Math', marks: 45 }, { subject: 'Science', marks: 50 }] },
  { id: 3, name: 'Sam Brown', class: 'Class A', status: 'Pass', subjects: [{ subject: 'Math', marks: 90 }, { subject: 'Science', marks: 85 }] },
  { id: 4, name: 'Alice Green', class: 'Class B', status: 'Pass', subjects: [{ subject: 'Math', marks: 95 }, { subject: 'Science', marks: 92 }] },
  { id: 5, name: 'Tom White', class: 'Class A', status: 'Fail', subjects: [{ subject: 'Math', marks: 60 }, { subject: 'Science', marks: 65 }] },
];

export default function StudentsRegistered() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const navigate = useNavigate();

  // Filter the students based on the selected criteria
  const filteredStudents = demoData.filter(student => {
    const isClassMatch = selectedClass ? student.class === selectedClass : true;
    const isStatusMatch = selectedStatus ? student.status === selectedStatus : true;
    const isSubjectMatch = selectedSubject
      ? student.subjects.some(f => f.subject === selectedSubject)
      : true;

    return isClassMatch && isStatusMatch && isSubjectMatch;
  });

  // Go back function for navigation
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
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
        <div className="w-1/3">
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
        <div className="w-1/3">
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

        {/* Dropdown for Select Subject */}
        <div className="w-1/3">
          <label className="block text-lg font-semibold mb-2">Select Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-1 border-2 border-red-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          >
            <option value="">All Subjects</option>
            {Array.from(
              new Set(demoData.flatMap((student) => student.subjects.map((subject) => subject.subject)))
            ).map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
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
            <th className="border p-3">Subject Marks</th> {/* Column for specific subject marks */}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => {
              // Find the selected subject's marks
              const selectedSubjectMarks = student.subjects.find(
                (subject) => subject.subject === selectedSubject
              );
              return (
                <tr key={student.id} className="hover:bg-gray-100 transition-all">
                  <td className="border p-3">{student.name}</td>
                  <td className="border p-3">{student.class}</td>
                  <td className="border p-3">{student.status}</td>
                  <td className="border p-3">
                    {/* Display only the selected subject's marks */}
                    {selectedSubjectMarks ? (
                      <div className="flex items-center">
                        <span className="mr-2">
                          {selectedSubjectMarks.subject} - {selectedSubjectMarks.marks}
                        </span>
                      </div>
                    ) : (
                      <span>No data available</span>
                    )}
                  </td>
                </tr>
              );
            })
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
