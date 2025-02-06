import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import {
  ArrowLeft,
  Plus,
  Edit,
  ChevronRight,
  Folders,
  ArrowDown,
  ArrowUp,
} from "lucide-react"; // Import Lucid React Icons
import { ToastContainer } from "react-toastify";

export default function Assignments() {
  const [openAssignment, setOpenAssignment] = useState(null); // Track which assignment is open
  const navigate = useNavigate();
  const toggleQuestionsVisibility = (assignmentId) => {
    // Toggle visibility for the clicked assignment
    setOpenAssignment(openAssignment === assignmentId ? null : assignmentId);
  };
  const location = useLocation();
  const { classId, subjectId, chapterId } = location.state || {};
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    fetchAssignment();
  }, [chapterId]);
  useEffect(() => {
    assignments && console.log("Assihnment", assignments);
  }, [assignments]);
  const fetchAssignment = async () => {
    try {
      const res = await makeRequest.get(
        `/teacher/get-all-assignment?chapterId=${chapterId}`
      );
      console.log("Assignment fetched", res?.data);
      setAssignments(res?.data?.data);
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-xl rounded-lg">
      {/* Back and Add Assignment Buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            navigate("/teacher-dashboard/chapters", {
              state: { classId, subjectId, chapterId },
            });
          }}
          className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-110"
          title="Back to Chapters"
        >
          <ArrowLeft className="w-5 h-5 transition-all" />
        </button>

        <button
          onClick={() => {
            navigate("/teacher-dashboard/add_assignment", {
              state: { classId, subjectId, chapterId },
            });
          }}
          className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-110"
          title="Add Assignment"
        >
          <Plus className="w-5 h-5 transition-all" />
        </button>
      </div>

      {/* Title Section with Icon */}
      <div className="flex items-center justify-center mb-8">
        <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
          <Folders className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
          Assignment List
        </p>
      </div>

      {/* Iterate over assignments */}
      {assignments.map((assignment) => (
        <div key={assignment._id} className="mb-8">
          {/* Button to Update Assignment */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                navigate("/teacher-dashboard/update_assignment", {
                  state: { assignment },
                });
              }}
              className="flex items-center justify-center bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition duration-300 transform hover:scale-110"
              title="Update Assignment"
            >
              <Edit className="w-5 h-5 transition-all" />
            </button>
          </div>

          {/* Assignment Title with Toggle Functionality */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleQuestionsVisibility(assignment._id)}
          >
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900">
              {assignment.title}
            </h2>
            <div className="text-gray-600">
              {openAssignment === assignment._id ? (
                <ArrowUp className="w-6 h-6 transition-all" />
              ) : (
                <ArrowDown className="w-6 h-6 transition-all" />
              )}
            </div>
          </div>

          {/* Questions Section - Visible if Assignment is Open */}
          {openAssignment === assignment._id && (
            <div className="space-y-6">
              {/* Assignment Description */}
              <p className="text-lg text-gray-700 text-center mb-6">
                {assignment.description}
              </p>
              {assignment.questions?.map((question, index) => (
                <div
                  key={question._id}
                  className="bg-white shadow-md rounded-lg p-6 transition-all hover:shadow-xl"
                >
                  <div className="flex justify-between mb-6">
                    <p className="text-xl font-medium text-gray-800">{`${index + 1}. ${question.question}`}</p>
                    <span className="text-sm text-gray-500">
                      Marks: {question.marks}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {question?.options.map((option) => (
                      <div key={option._id} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          id={`option-${option._id}`}
                          className="h-5 w-5 text-blue-500 border-gray-300 rounded"
                          disabled
                          checked={option.isCorrect}
                        />
                        <label
                          htmlFor={`option-${option._id}`}
                          className={`text-lg ${option.isCorrect ? "font-semibold text-green-500" : "text-gray-700"}`}
                        >
                          {option.text}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View Results Button */}
          <div className="text-right mt-4">
            <button
              onClick={() => {
                navigate("/teacher-dashboard/assignRes", {
                  state: { assignment },
                });
              }}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              View Assignment Result{" "}
              <ChevronRight className="inline-block ml-2" />
            </button>
          </div>

          {/* Due Date Section */}
          <div className="mt-6 text-right">
            <span className="text-gray-500">
              Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
            </span>
            <hr className="my-4 border-gray-300" />
          </div>
        </div>
      ))}

      <ToastContainer />
    </div>
  );
}
