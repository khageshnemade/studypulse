import React, { useState } from "react";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";

const UpdateAssignment = () => {
  const location = useLocation();
  const { assignment } = location.state || {};

  const [formData, setFormData] = useState({
    assignmentId: assignment?._id || "",
    title: assignment?.title || "",
    classId: assignment?.classId || "",
    subjectId: assignment?.subjectId || "",
    description: assignment?.description || "",
    passingMarks: assignment?.passingMarks || 0,
    totalMarks: parseInt(assignment?.totalMarks) || 0,
    questions: assignment?.questions || [],
    dueDate: assignment?.dueDate || "",
    status: assignment?.status || "active",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const { name, value, type, checked } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = {
      ...updatedQuestions[questionIndex].options[optionIndex],
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");
    console.log("passing submit", formData.questions);
    const totalMarks = formData.questions.reduce((sum, e) => sum + e.marks, 0);
    console.log("total marks", totalMarks);

    setFormData({ ...formData, totalMarks });
    console.log("Passing mark", formData);

    try {
      if (formData.passingMarks <= formData.totalMarks) {
        const response = await makeRequest.post(
          "teacher/update-assignment",
          formData
        );
        console.log("Assignment updated successfully:", response.data);
        alert("Assignment updated successfully!");
      } else {
        alert("Please enter valid passing marks");
      }
    } catch (err) {
      console.error("Error updating assignment:", err.message);
      setError("Failed to update assignment");
    } finally {
      setIsLoading(false);
    }
  };

  const currentDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Update Assignment</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Class ID */}
        <div>
          <input
            type="text"
            hidden
            name="classId"
            value={formData.classId}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* AssignMent ID */}
        <div>
          <input
            type="text"
            hidden
            name="classId"
            value={formData.assignmentId}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Subject ID */}
        <div>
          <input
            type="text"
            name="subjectId"
            hidden
            value={formData.subjectId}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Passing Marks */}
        <div>
          <label
            htmlFor="passingMarks"
            className="block text-sm font-medium mb-2"
          >
            Passing Marks
          </label>
          <input
            type="number"
            name="passingMarks"
            value={formData.passingMarks}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Total Marks */}
        <div>
          <label
            htmlFor="totalMarks"
            className="block text-sm font-medium mb-2"
          >
            Total Marks
          </label>
          <input
            type="number"
            disabled
            name="totalMarks"
            value={formData.totalMarks > 0 ? formData.totalMarks : 1}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Questions Section */}
        <div className="space-y-4">
          {formData.questions.map((question, index) => (
            <div key={index} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, e)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>

              {/* Options */}
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="text"
                      name="text"
                      value={option.text}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e)
                      }
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                    <input
                      type="checkbox"
                      name="isCorrect"
                      checked={option.isCorrect}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e)
                      }
                      className="h-4 w-4"
                    />
                    <label className="text-sm whitespace-nowrap">Correct</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium mb-2">
            Due Date
          </label>
          <input
            type="datetime-local"
            name="dueDate"
            value={
              formData.dueDate
                ? new Date(formData.dueDate).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleInputChange}
            min={currentDateTime} // Prevent selecting past dates
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            {isLoading ? "Updating..." : "Update Assignment"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default UpdateAssignment;
