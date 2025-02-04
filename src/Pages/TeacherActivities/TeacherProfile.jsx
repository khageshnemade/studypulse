import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherProfile = () => {
  const [classId, setClassId] = useState(["66fd148ad396bd4c267872dc"]);
  const [subjectId, setSubjectId] = useState([
    "66fd15152e99c5652e80ba0a",
    "66fd152a6eab078cc965a2fa",
  ]);

  const handleClassChange = (event) => {
    const selectedClassIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setClassId(selectedClassIds);
  };

  const handleSubjectChange = (event) => {
    const selectedSubjectIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSubjectId(selectedSubjectIds);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Profile</h1>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Class Selection */}
        <div className="mb-4">
          <label
            htmlFor="classSelect"
            className="block text-sm font-medium text-gray-700"
          >
            Select Classes:
          </label>
          <select
            id="classSelect"
            multiple
            value={classId}
            onChange={handleClassChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {/* Assuming you have class data, populate options here */}
          </select>
        </div>

        {/* Subject Selection */}
        <div className="mb-4">
          <label
            htmlFor="subjectSelect"
            className="block text-sm font-medium text-gray-700"
          >
            Select Subjects:
          </label>
          <select
            id="subjectSelect"
            multiple
            value={subjectId}
            onChange={handleSubjectChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {/* Assuming you have subject data, populate options here */}
          </select>
        </div>
      </form>
    </div>
  );
};

export default TeacherProfile;
