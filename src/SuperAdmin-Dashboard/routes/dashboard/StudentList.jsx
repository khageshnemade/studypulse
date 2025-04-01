import React, { useState } from "react";

const StudentList = () => {
  // Dummy data for organizations, classes, subjects, and students
  const organizations = ["Organization A", "Organization B", "Organization C"];
  const classes = ["Class 1", "Class 2", "Class 3"];
  const subjects = ["Math", "Science", "History"];

  // Dummy students data
  const studentsData = [
    {
      id: 1,
      name: "John Doe",
      organization: "Organization A",
      class: "Class 1",
      subject: "Math",
      marks: 85,
      status: "Passed",
    },
    {
      id: 2,
      name: "Jane Smith",
      organization: "Organization A",
      class: "Class 1",
      subject: "Science",
      marks: 45,
      status: "Failed",
    },
    {
      id: 3,
      name: "Sam Brown",
      organization: "Organization B",
      class: "Class 2",
      subject: "History",
      marks: 75,
      status: "Passed",
    },
    {
      id: 4,
      name: "Lucy Green",
      organization: "Organization C",
      class: "Class 3",
      subject: "Math",
      marks: 65,
      status: "Passed",
    },
    {
      id: 5,
      name: "Mark White",
      organization: "Organization C",
      class: "Class 2",
      subject: "Math",
      marks: 32,
      status: "Failed",
    },
    {
      id: 6,
      name: "Anna Black",
      organization: "Organization A",
      class: "Class 2",
      subject: "Math",
      marks: 92,
      status: "Passed",
    },
    {
      id: 7,
      name: "Chris Blue",
      organization: "Organization B",
      class: "Class 3",
      subject: "History",
      marks: 68,
      status: "Passed",
    },
    {
      id: 8,
      name: "Diana Red",
      organization: "Organization C",
      class: "Class 1",
      subject: "Science",
      marks: 55,
      status: "Failed",
    },
    {
      id: 9,
      name: "Steven Yellow",
      organization: "Organization A",
      class: "Class 3",
      subject: "Math",
      marks: 79,
      status: "Passed",
    },
    {
      id: 10,
      name: "Julia Orange",
      organization: "Organization B",
      class: "Class 1",
      subject: "Math",
      marks: 65,
      status: "Passed",
    },
    {
      id: 11,
      name: "Liam Gray",
      organization: "Organization C",
      class: "Class 2",
      subject: "History",
      marks: 58,
      status: "Failed",
    },
    {
      id: 12,
      name: "Olivia Violet",
      organization: "Organization A",
      class: "Class 1",
      subject: "Math",
      marks: 90,
      status: "Passed",
    },
    {
      id: 13,
      name: "Mia Green",
      organization: "Organization B",
      class: "Class 2",
      subject: "Science",
      marks: 65,
      status: "Failed",
    },
  ];

  // State for filters
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [viewMore, setViewMore] = useState(false); // State for showing full list or not

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Filter students based on selected dropdowns
  const filteredStudents = studentsData.filter((student) => {
    return (
      (selectedOrganization
        ? student.organization === selectedOrganization
        : true) &&
      (selectedClass ? student.class === selectedClass : true) &&
      (selectedSubject ? student.subject === selectedSubject : true)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  // Handle pagination change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Toggle the "View More" state
  const handleViewMore = () => {
    setViewMore(true);
  };

  return (
    <div className="space-y-6 p-8 bg-gray-50 rounded-lg shadow-lg max-h-[650px] overflow-y-auto text-center">
      <h1 className="text-center text-xl font-semibold">Student List</h1>

      {/* Dropdown filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <select
            onChange={(e) => setSelectedOrganization(e.target.value)}
            value={selectedOrganization || ""}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="" disabled>
              Select Organization
            </option>
            {["Organization A", "Organization B", "Organization C"].map(
              (org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              )
            )}
          </select>
        </div>

        <div className="flex-1">
          <select
            onChange={(e) => setSelectedClass(e.target.value)}
            value={selectedClass || ""}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="" disabled>
              Select Class
            </option>
            {["Class 1", "Class 2", "Class 3"].map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <select
            onChange={(e) => setSelectedSubject(e.target.value)}
            value={selectedSubject || ""}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="" disabled>
              Select Subject
            </option>
            {["Math", "Science", "History"].map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display filtered students */}
      <div className="mt-6">
        {currentStudents.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Marks
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {student.marks}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`${
                          student.status === "Passed"
                            ? "text-green-500"
                            : "text-red-500"
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
          <p className="text-gray-500">
            No students found based on the selected filters.
          </p>
        )}
      </div>

      {/* View More button */}
      {!viewMore && filteredStudents.length > 10 && (
        <div className="text-center mt-4">
          <button
            onClick={handleViewMore}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            View More
          </button>
        </div>
      )}

      {/* Pagination controls */}
      {viewMore && filteredStudents.length > 10 && (
        <div className="flex justify-center space-x-4 mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
