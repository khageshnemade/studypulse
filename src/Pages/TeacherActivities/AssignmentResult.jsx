import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios"; // Replace with your Axios instance configuration
import { useLocation } from "react-router-dom";

const AssignmentResult = () => {
  const location = useLocation(); // Assuming useLocation hook is available from react-router-dom
  const assignment = location.state; 
  const { assignmentId, classId, subjectId, chapterId }=assignment || {};
 
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (assignmentId && classId && subjectId && chapterId) {
      fetchAssignmentResults();
    }
  }, [assignmentId, classId, subjectId, chapterId]);

  const fetchAssignmentResults = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await makeRequest.get(
        `/teacher/get-assignment-result`, 
        { params: { assignmentId, classId, subjectId, chapterId } }
      );
      setResults(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching assignment results:", err.message);
      setError("Failed to fetch assignment results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Assignment Results</h2>

      {isLoading && (
        <div className="flex justify-center items-center text-lg text-gray-600">
          <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2z"></path>
          </svg>
          Loading results...
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && results.length === 0 && !error && (
        <p className="text-gray-500">No results found for this assignment.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
              Student: {result.studentName}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">Marks Obtained: {result.marksObtained}</p>
            <p className="text-gray-700 dark:text-gray-300">Total Marks: {result.totalMarks}</p>
            <p className="text-gray-700 dark:text-gray-300">
              Status:{" "}
              <span
                className={`font-semibold ${
                  result.status === "Passed" ? "text-green-500" : "text-red-500"
                }`}
              >
                {result.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentResult;
