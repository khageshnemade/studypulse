import React, { useState } from "react";

const StudentList = () => {
  // Dummy data for organizations, classes, subjects, and students
  const organizations = ["Organization A", "Organization B", "Organization C"];
  const classes = ["Class 1", "Class 2", "Class 3"];
  const subjects = ["Math", "Science", "History"];

  // Dummy students data
  const studentsData = [
    { id: 1, name: "John Doe", organization: "Organization A", class: "Class 1", subject: "Math", marks: 85, status: "Passed" },
    { id: 2, name: "Jane Smith", organization: "Organization A", class: "Class 1", subject: "Science", marks: 45, status: "Failed" },
    { id: 3, name: "Sam Brown", organization: "Organization B", class: "Class 2", subject: "History", marks: 75, status: "Passed" },
    { id: 4, name: "Lucy Green", organization: "Organization C", class: "Class 3", subject: "Math", marks: 65, status: "Passed" },
    { id: 5, name: "Mark White", organization: "Organization C", class: "Class 2", subject: "Math", marks: 32, status: "Failed" },
  ];

  // State for dropdowns
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track which dropdown is open

  // Filter students based on selected dropdowns
  const filteredStudents = studentsData.filter(student => {
    return (
      (selectedOrganization ? student.organization === selectedOrganization : true) &&
      (selectedClass ? student.class === selectedClass : true) &&
      (selectedSubject ? student.subject === selectedSubject : true)
    );
  });

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown) => {
    setDropdownOpen(dropdownOpen === dropdown ? null : dropdown); // Toggle dropdown visibility
  };

  return (
    <div className="space-y-6 p-8 bg-gray-50 rounded-lg shadow-lg">
  {/* Dropdown 1: Organization */}
  <h1 className="flex-grow text-center text-xl font-semibold">Student List</h1>

  <div className="flex items-center space-x-4">
  {/* Centered Title */}
  
  {/* Dropdown 1: Organization */}
  <div className="flex-1">
    <select
      onChange={(e) => setSelectedOrganization(e.target.value)}
      value={selectedOrganization || ""}
      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none hover:bg-gray-100"
    >
      <option value="" disabled>Select Organization</option>
      {organizations.map((organization, index) => (
        <option key={index} value={organization}>
          {organization}
        </option>
      ))}
    </select>
  </div>

  {/* Dropdown 2: Class Selection */}
  <div className="flex-1">
    <select
      onChange={(e) => setSelectedClass(e.target.value)}
      value={selectedClass || ""}
      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none hover:bg-gray-100"
    >
      <option value="" disabled>Select Class</option>
      {classes.map((classItem, index) => (
        <option key={index} value={classItem}>
          {classItem}
        </option>
      ))}
    </select>
  </div>

  {/* Dropdown 3: Subject Selection */}
  <div className="flex-1">
    <select
      onChange={(e) => setSelectedSubject(e.target.value)}
      value={selectedSubject || ""}
      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none hover:bg-gray-100"
    >
      <option value="" disabled>Select Subject</option>
      {subjects.map((subject, index) => (
        <option key={index} value={subject}>
          {subject}
        </option>
      ))}
    </select>
  </div>
</div>


  {/* Display filtered students */}
  <div className="mt-6">
    {filteredStudents.length > 0 ? (
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Marks</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-700">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.marks}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`${
                      student.status === "Passed" ? "text-green-500" : "text-red-500"
                    } font-semibold`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-gray-500">No students found based on the selected filters.</p>
    )}
  </div>
</div>

  );
};

export default StudentList;
