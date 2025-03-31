import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AssignmentData = () => {
  const location = useLocation();

  // Demo data with class information added
  const demoData = [
    {
      studentId: "S001",
      name: "Alice",
      assignment: "Math Exam",
      subject: "Math",
      class: "Class 1", // Added class information
      attempts: 3,
      status: "Passed",
    },
    {
      studentId: "S002",
      name: "Bob",
      assignment: "Math Exam",
      subject: "Math",
      class: "Class 1", // Added class information
      attempts: 2,
      status: "Passed",
    },
    {
      studentId: "S003",
      name: "Charlie",
      assignment: "History Quiz",
      subject: "History",
      class: "Class 2", // Added class information
      attempts: 4,
      status: "Passed",
    },
    {
      studentId: "S004",
      name: "David",
      assignment: "Math Exam",
      subject: "Math",
      class: "Class 3", // Added class information
      attempts: 5,
      status: "Failed",
    },
    {
      studentId: "S005",
      name: "Eve",
      assignment: "History Quiz",
      subject: "History",
      class: "Class 2", // Added class information
      attempts: 1,
      status: "Passed",
    },
  ];

  const subjects = ["Math", "History", "Science"];
  const classes = ["Class 1", "Class 2", "Class 3"]; // Example classes

  // State for the selected subject and class
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  // Handle subject change
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  // Handle class change
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  // Filter demo data based on the selected subject and class
  const filteredData = demoData.filter((student) => {
    return (
      (!selectedSubject || student.subject === selectedSubject) &&
      (!selectedClass || student.class === selectedClass)
    );
  });

  // Calculate average attempts for the passed students
  const passedStudents = filteredData.filter(
    (student) => student.status === "Passed"
  );
  const averageAttempts =
    passedStudents.length > 0
      ? passedStudents.reduce((acc, student) => acc + student.attempts, 0) /
        passedStudents.length
      : 0;

  return (
    <div className="p-6 flex flex-col h-full justify-between">
      {/* Title Section */}
      <h1 className="text-xl font-semibold  mb-4 bg-gradient-to-r from-red-500 to-red-300 text-white p-2 rounded-md shadow-md font-serif text-center">
        Student Assignment Attempts Dashboard
      </h1>

      {/* Class and Subject Selection Dropdown */}
      <div className="mb-6 flex justify-start space-x-4">
        {/* Class Dropdown */}
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="w-56 p-2 border rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="">Select Class</option>
          {classes.map((classItem, index) => (
            <option key={index} value={classItem}>
              {classItem}
            </option>
          ))}
        </select>

        {/* Subject Dropdown */}
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
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                Assignment
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                Attempts
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => (
              <tr
                key={student.studentId}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-t border-b border-gray-300`}
              >
                <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-300">
                  {student.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-300">
                  {student.assignment}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-300">
                  {student.attempts}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {student.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View More Button */}
      {location.pathname !== "/admin-dashboard/ass_stat" && (
        <div className="text-center mt-auto">
          <Link
            className="btn bg-red-400 hover:bg-red-500 text-white mt-2 py-2 px-4 rounded-full"
            to="/admin-dashboard/ass_stat"
          >
            View More
          </Link>
        </div>
      )}
    </div>
  );
};

export default AssignmentData;
