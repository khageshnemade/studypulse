import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios"; // Replace with your Axios instance configuration
import { useLocation } from "react-router-dom";

const AssignmentResult = () => {
  const assignment1={
    "_id": "679380baba3a363b428cdc04",
    "organizationID": "67935a5bba3a363b428cd99c",
    "userId": "67935dfdba3a363b428cda4e",
    "classId": "67935c71ba3a363b428cd9c9",
    "subjectId": "67935cf9ba3a363b428cd9db",
    "chapterId": "67938035ba3a363b428cdbe2",
    "title": "FIrst Assignment",
    "description": "Check Your Knowledge",
    "passingMarks": 1,
    "totalMarks": 4,
    "questions": [
      {
        "question": "AI assistance for Network, Performance, and Sources?",
        "options": [
          {
            "text": "3600",
            "isCorrect": true,
            "_id": "679380baba3a363b428cdc06"
          },
          {
            "text": "67",
            "isCorrect": false,
            "_id": "679380baba3a363b428cdc07"
          },
          {
            "text": "67",
            "isCorrect": false,
            "_id": "679380baba3a363b428cdc08"
          }
        ],
        "marks": 1,
        "_id": "679380baba3a363b428cdc05"
      },
      {
        "question": "1. If p% of p is 36, then p is equal to ?",
        "options": [
          {
            "text": "3600",
            "isCorrect": true,
            "_id": "679380baba3a363b428cdc0a"
          },
          {
            "text": "67",
            "isCorrect": false,
            "_id": "679380baba3a363b428cdc0b"
          },
          {
            "text": "67",
            "isCorrect": false,
            "_id": "679380baba3a363b428cdc0c"
          }
        ],
        "marks": 1,
        "_id": "679380baba3a363b428cdc09"
      },
      {
        "question": "66",
        "options": [
          {
            "text": "3600",
            "isCorrect": false,
            "_id": "679380baba3a363b428cdc0e"
          },
          {
            "text": "67",
            "isCorrect": false,
            "_id": "679380baba3a363b428cdc0f"
          },
          {
            "text": "67",
            "isCorrect": true,
            "_id": "679380baba3a363b428cdc10"
          }
        ],
        "marks": 1,
        "_id": "679380baba3a363b428cdc0d"
      },
      {
        "question": "1. If p% of p is 36, then p is equal to ?",
        "options": [
          {
            "text": "3600",
            "isCorrect": true,
            "_id": "679380baba3a363b428cdc12"
          },
          {
            "text": "67",
            "isCorrect": false,
            "_id": "679380baba3a363b428cdc13"
          },
          {
            "text": "67",
            "isCorrect": false,
            "_id": "679380baba3a363b428cdc14"
          }
        ],
        "marks": 1,
        "_id": "679380baba3a363b428cdc11"
      }
    ],
    "status": "active",
    "dueDate": "2025-01-22T00:00:00.000Z",
    "createdAt": "2025-01-24T11:59:54.254Z",
    "updatedAt": "2025-01-27T12:20:07.656Z",
    "__v": 2
  }
  
  const [chapterId, setChapterId] = useState("");
  const location = useLocation(); 
  const assignment = location.state || {}; 

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
    if (!assignmentId || !classId || !subjectId || !chapterId) {
      setError("Invalid assignment data.");
      return;
    }

    setChapterId(initialchapterId?._id || ""); // Handle if initialchapterId is null
    console.log("Values Are", assignmentId, classId, subjectId, chapterId);

    // setResults({

    // organizationID: "67935a5bba3a363b428cd99c",
    // studentId: "67b334f28f44773bf08d42c9",
    // classId: "67935ca5ba3a363b428cd9d1",
    // assignmentId: "6799fe81db0e4a39f88c1971",
    // subjectId: "6799f471db0e4a39f88c175d",
    // chapterId: "6799fc5cdb0e4a39f88c18cb",
    // teacherId: "67935dfdba3a363b428cda4e",
    // totalMarks: 3,
    // obtainedMarks: 3,
    // passingMarks: 1,
    // questionResponses: [
    //   {
    //     options: [
    //       { isSelected: false, _id: "6799fe81db0e4a39f88c1973" },
    //       { isSelected: false, _id: "6799fe81db0e4a39f88c1974" },
    //       { isSelected: true, _id: "6799fe81db0e4a39f88c1975" }
    //     ],
    //     marks: 1,
    //     _id: "6799fe81db0e4a39f88c1972"
    //   },
    //   {
    //     options: [
    //       { isSelected: false, _id: "6799fe81db0e4a39f88c1977" },
    //       { isSelected: false, _id: "6799fe81db0e4a39f88c1978" },
    //       { isSelected: true, _id: "6799fe81db0e4a39f88c1979" }
    //     ],
    //     marks: 1,
    //     _id: "6799fe81db0e4a39f88c1976"
    //   },
    //   {
    //     options: [
    //       { isSelected: false, _id: "6799fe81db0e4a39f88c197b" },
    //       { isSelected: false, _id: "6799fe81db0e4a39f88c197c" },
    //       { isSelected: true, _id: "6799fe81db0e4a39f88c197d" }
    //     ],
    //     marks: 1,
    //     _id: "6799fe81db0e4a39f88c197a"
    //   }
    // ],
    // result: "pass",
    // createdAt: new Date("2025-02-18T06:39:38.893Z"),
    // updatedAt: new Date("2025-02-18T06:39:38.893Z")
    // })
    fetchAssignmentResults();
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

  if (error) {
    return <div className="text-red-500 text-xl">{error}</div>;
  }
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
            <strong>Subject:</strong> <span className="text-gray-900">{results?.subjectId}</span>
          </p>
          <p className="text-lg text-gray-600">
            <strong>Chapter:</strong> <span className="text-gray-900">{results?.chapterId}</span>
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
