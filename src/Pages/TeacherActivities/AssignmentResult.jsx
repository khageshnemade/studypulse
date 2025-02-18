import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios"; // Replace with your Axios instance configuration
import { useLocation } from "react-router-dom";

const AssignmentResult = () => {
  const [chapterId, setChapterId] = useState("");
  const location = useLocation(); // Assuming useLocation hook is available from react-router-dom
  const assignment = location.state;
  const {
    _id: assignmentId,
    classId,
    subjectId,
    chapterId: initialchapterId,
  } = assignment.assignment || {};

  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
useEffect(() => {
 console.log("Assertion failed",assignment);
}, [assignment])

  useEffect(() => {
    setChapterId(initialchapterId._id);
    console.log("Values Are", assignmentId, classId, subjectId, chapterId);

    if (assignmentId && classId && subjectId && chapterId) {
      fetchAssignmentResults();
    }
  }, [assignmentId, classId, subjectId, chapterId]);

  const fetchAssignmentResults = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await makeRequest.get(`/teacher/get-assignment-result`, {
        params: { assignmentId, classId, subjectId, chapterId },
      });
      console.log("Assignment Results fetched", res?.data);
      setResults(res.data?.data || {});
    } catch (err) {
      console.error("Error fetching assignment results:", err.message);
      setError("Failed to fetch assignment results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Assignment Results
      </h2>

      {isLoading && (
        <div className="flex justify-center items-center text-lg text-gray-600">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-blue-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2z"
            ></path>
          </svg>
          Loading results...
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && results.length === 0 && !error && (
        <p className="text-gray-500">No results found for this assignment.</p>
      )}

<div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-teal-50 to-blue-50 shadow-lg rounded-xl">
  <h2 className="text-3xl font-semibold text-gray-800 mb-6">{results?.assignmentId?.title}</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
    <p className="text-lg text-gray-600">
      <strong>Subject:</strong> <span className="text-gray-900">{results.subjectId}</span>
    </p>
    <p className="text-lg text-gray-600">
      <strong>Chapter:</strong> <span className="text-gray-900">{results.chapterId}</span>
    </p>
  </div>

  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <div className="flex justify-between mb-4">
      <p className="text-lg font-medium text-gray-700">
        <strong>Total Marks:</strong> {results.totalMarks}
      </p>
      <p className="text-lg font-medium text-gray-700">
        <strong>Obtained Marks:</strong> {results.obtainedMarks}
      </p>
    </div>
    <div className="flex justify-between">
      <p className="text-lg font-medium text-gray-700">
        <strong>Passing Marks:</strong> {results.passingMarks}
      </p>
      <p className={`text-lg font-bold ${results.result === "pass" ? "text-green-600" : "text-red-600"}`}>
        <strong>Result:</strong> {results.result}
      </p>
    </div>
  </div>

  <div className="space-y-6">
    {results?.questionResponses?.map((response, index) => (
      <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
        <p className="font-semibold text-lg text-gray-800 mb-4">Question {index + 1}</p>
        <div className="space-y-3">
          {response.options.map((option, optIndex) => (
            <div key={optIndex} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={option.isSelected}
                readOnly
                className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-0"
              />
              <span className="text-gray-800">{option._id}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-lg text-gray-700">
          <strong>Marks:</strong> {response.marks}
        </p>
      </div>
    ))}
  </div>
</div>



    </div>
  );
};

export default AssignmentResult;
 