import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { ArrowLeft, Plus, Edit, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"; // Import Lucid React Icons
import { ToastContainer } from "react-toastify";
import { useSelector } from 'react-redux';  // Import useSelector from Redux
import { useDispatch } from "react-redux";
import { setClassDetails } from "../../redux/features/idsSlice";
export default function Assignments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use useSelector to get data from Redux store
  const { classId, subjectId, chapterId } = useSelector(state => state.ids.classDetails); // Assume classDetails is set in redux

  const [openAssignment, setOpenAssignment] = useState(null); // Track which assignment is open
  const [assignments, setAssignments] = useState([]);

  const toggleQuestionsVisibility = (assignmentId) => {
    // Toggle visibility for the clicked assignment
    setOpenAssignment(openAssignment === assignmentId ? null : assignmentId);
  };

  useEffect(() => {
    fetchAssignment();
    console.log("In fetch assignment",classId,subjectId,chapterId);
  }, [chapterId]); // Only refetch when chapterId changes

  const fetchAssignment = async () => {
    try {
      const res = await makeRequest.get(
        `/teacher/get-all-assignment?chapterId=${chapterId}`
      );
      console.log("Assignment fetched", res?.data);
      setAssignments(res?.data?.data);
dispatch(setClassDetails({assignments:res?.data?.data}))
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            navigate("/teacher-dashboard/chapters", {
              // No need to pass location state here, fetch it from Redux
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
              // No need to pass location state here, fetch it from Redux
            });
          }}
          className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-110"
          title="Add Assignment"
        >
          <Plus className="w-5 h-5 transition-all" />
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Assignment List</h1>
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div
            key={assignment._id}
            className="border border-gray-300 rounded-lg shadow-sm p-4 bg-gray-50 hover:shadow-md transition"
          >
            {/* Assignment Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {assignment.title}
              </h2>

              <div className="flex items-center gap-4">
                {/* Edit Button */}
                <button
                  onClick={() =>
                    navigate("/teacher-dashboard/chapters/assignments/update_assignment", {
                      state: { assignment },
                    })
                  }
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  title="Edit Assignment"
                >
                  <Edit className="w-5 h-5" />
                </button>

                {/* View Results Button */}
                <button
                  onClick={() =>
                    navigate("/teacher-dashboard/chapters/assignments/assignRes", {
                      state: { assignment },
                    })
                  }
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  title="View Results"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dropdown Button */}
                <button
                  onClick={() => toggleQuestionsVisibility(assignment._id)}
                  className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  title="Expand"
                >
                  {openAssignment === assignment._id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Assignment Details (Dropdown Content) */}
            {openAssignment === assignment._id && (
              <div className="mt-4 border-t pt-4">
                <p className="text-gray-700">{assignment.description}</p>

                {/* Questions Section */}
                <div className="mt-3 space-y-3">
                  {assignment.questions?.map((question, index) => (
                    <div
                      key={question._id}
                      className="p-3 bg-white shadow-sm rounded-lg border"
                    >
                      <p className="font-medium text-gray-800">
                        {index + 1}. {question.question}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Marks: {question.marks}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Due Date */}
                <p className="text-right text-sm text-gray-500 mt-3">
                  Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}
