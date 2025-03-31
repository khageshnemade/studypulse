import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importing icons
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Clipboard } from "lucide-react";

const AssignmentResult = () => {
  const [chapterId, setChapterId] = useState("");
  const location = useLocation(); // Assuming useLocation hook is available from react-router-dom
  const { assignments, subjectName, chapterName } = useSelector(
    (state) => state.ids.classDetails
  );
  const assignment = location.state;

  const {
    _id: assignmentId,
    classId,
    subjectId,
    chapterId: initialchapterId,
  } = assignment.assignment || {};
  const [openIndex, setOpenIndex] = useState(null);
  const toggleDetails = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setChapterId(initialchapterId._id);

    if (assignmentId && classId && subjectId && chapterId) {
      fetchAssignmentResults();
    }
  }, [assignmentId, classId, subjectId, chapterId]);
  useEffect(() => {
    console.log("Result", results);
    console.log("Assignment ", assignment);
  }, [results]);

  const fetchAssignmentResults = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await makeRequest.get(`/teacher/get-assignment-result`, {
        params: { assignmentId, classId, subjectId, chapterId },
      });
      console.log("Assignment Results fetched", res?.data.data);
      setResults(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching assignment results:", err.message);
      setError("Failed to fetch assignment results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <p className="text-center text sm:text-xl md:text-2xl font-serif p-2 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto m-3 drop-shadow-lg border-[1.5px] border-blue-800">
        <Clipboard className="text sm:text-xl md:text-2xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce text-blue-600" />
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Results of {results[0]?.assignmentId?.title}
        </span>
      </p>
      {isLoading && (
        <div className="flex justify-center items-center text-lg">
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
      <div className="mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg overflow-x-auto">
        <p className="text-[20px] text-center flex justify-between mb-3 w-4/5 mx-auto text-gray-700">
          <span>{subjectName}</span>
          <span>{chapterName}</span>
        </p>

        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-200 to-teal-100 shadow-lg rounded-xl">
          {results.map((result, idx) => {
            const assign = assignments?.filter(
              (a) => a._id === result?.assignmentId._id
            );
            console.log("Assignments", assign);
            return (
              <div key={idx} className="mb-8">
                {/* Single line display with Tailwind CSS */}
                <div
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md cursor-pointer"
                  onClick={() => toggleDetails(idx)}
                >
                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {result?.studentId?.firstName}{" "}
                      {result?.studentId?.lastName}
                    </h2>
                    <p
                      className={`text-lg font-bold ${result.result === "pass" ? "text-green-600" : "text-red-600"}`}
                    >
                      <strong>Result:</strong> {result.result}
                    </p>
                  </div>
                  <span>
                    {openIndex === idx ? (
                      <FaChevronUp className="text-gray-600" />
                    ) : (
                      <FaChevronDown className="text-gray-600" />
                    )}
                  </span>
                </div>

                {/* Conditional Rendering for More Details */}
                {openIndex === idx && (
                  <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between mb-4">
                      <p className="text-lg font-medium text-gray-700">
                        <strong>Total Marks:</strong> {result.totalMarks}
                      </p>
                      <p className="text-lg font-medium text-gray-700">
                        <strong>Obtained Marks:</strong> {result.obtainedMarks}
                      </p>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="text-lg font-medium text-gray-700">
                        <strong>Passing Marks:</strong> {result.passingMarks}
                      </p>
                      <p
                        className={`text-lg font-bold ${result.result === "pass" ? "text-green-600" : "text-red-600"}`}
                      >
                        <strong>Result:</strong> {result.result}
                      </p>
                    </div>
                    <div className="space-y-6">
                      {result?.questionResponses?.map((response, index) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                          <p className="font-semibold text-lg text-gray-800 mb-4">
                            Question {index + 1}
                          </p>
                          <div className="space-y-3">
                            {assign[0].questions[index].question}

                            {response?.options?.map((option, optIndex) => {
                              const correctOption =
                                assign[0]?.questions[index]?.options[optIndex]
                                  ?.isCorrect;
                              const selectedOption = option.isSelected;

                              let optionStyle = "";

                              if (selectedOption) {
                                if (correctOption) {
                                  optionStyle = "text-green-500"; // Option is correct and selected
                                } else {
                                  optionStyle = "text-red-500"; // Option is selected but incorrect
                                }
                              }

                              return (
                                <div
                                  key={optIndex}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    checked={option.isSelected}
                                    readOnly
                                    className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-0"
                                  />
                                  <span
                                    className={`text-gray-800 ${optionStyle}`}
                                  >
                                    {
                                      assign[0].questions[index].options[
                                        optIndex
                                      ].text
                                    }
                                  </span>
                                  <span className="text-gray-800">
                                    {option.text}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          <p className="mt-4 text-lg text-gray-700">
                            <strong>Marks:</strong> {response.marks}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssignmentResult;
