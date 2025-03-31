import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateAssignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { assignment } = location.state || {};

  // Initialize form data with static data
  const [formData, setFormData] = useState({
    assignmentId: assignment.assignmentId || "",
    title: assignment.title || "",
    classId: assignment.classId || "",
    subjectId: assignment.subjectId || "",
    description: assignment.description || "",
    passingMarks: assignment.passingMarks || 0,
    totalMarks: parseInt(assignment.totalMarks) || 0,
    questions: assignment.questions || [],
    dueDate: assignment.dueDate || "",
    status: assignment.status || "active",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change for general fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle change for each question field
  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formData.questions];

    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [name]: value,
    };

    setFormData({
      ...formData,
      questions: updatedQuestions, // Update questions state
    });
  };

  // Update totalMarks when questions change
  useEffect(() => {
    const totalMarks = formData.questions.reduce(
      (sum, e) => sum + parseInt(e.marks) || 0, // Handle undefined marks gracefully
      0
    );
    setFormData({ ...formData, totalMarks });
  }, [formData.questions]);

  // Handle changes for each option within a question
  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const { name, value, type, checked } = e.target;

    // Create a copy of the questions array
    const updatedQuestions = [...formData.questions];

    // Create a copy of the question object at the specified index
    const updatedQuestion = { ...updatedQuestions[questionIndex] };

    // Create a copy of the options array within the question
    const updatedOptions = [...updatedQuestion.options];

    // Update the specific option at the given optionIndex
    updatedOptions[optionIndex] = {
      ...updatedOptions[optionIndex],
      [name]: type === "checkbox" ? checked : value, // Update the option based on input type
    };

    // Reassign the updated options array to the question
    updatedQuestion.options = updatedOptions;

    // Now, update the question in the main questions array
    updatedQuestions[questionIndex] = updatedQuestion;

    // Update the state with the modified questions array
    setFormData({
      ...formData,
      questions: updatedQuestions, // Update questions in the state
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      if (formData.passingMarks <= formData.totalMarks) {
        // This is where you would normally make a request to the backend
        alert("Assignment updated successfully!");
        navigate("/teacher-dashboard/chapters/assignments");
      } else {
        alert("Please enter valid passing marks");
      }
    } catch (err) {
      setError("Failed to update assignment");
    } finally {
      setIsLoading(false);
    }
  };

  // Ensure the due date is not set to a past date
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

        {/* Passing Marks */}
        <div>
          <label
            htmlFor="passingMarks"
            className="block text-sm font-medium mb-2"
          >
            Passing Marks
          </label>
          <input
            type="text"
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
              <div className="space-y-2">
                <label
                  htmlFor="marks"
                  className="block text-sm font-medium mb-2"
                >
                  Marks
                </label>
                <input
                  type="text"
                  name="marks"
                  value={question.marks}
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
            className="w-full border border-gray-300 rounded px-4 py-2 max-w-min"
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
