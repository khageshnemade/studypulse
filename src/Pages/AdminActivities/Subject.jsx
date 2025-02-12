import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeRequest } from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BookUserIcon, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

export default function Subject() {
  const navigate = useNavigate();
  const location = useLocation();
  const { classId, className } = location.state || {};
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const orgId = useSelector((state) => state.org.orgId);
  const [classes, setClasses] = useState([]);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Store uploaded image URL

  useEffect(() => {
    if (classId) {
      fetchSubjectsByClassId();
    }
  }, [classId]);

  const fetchSubjectsByClassId = async () => {
    try {
      const res = await makeRequest.get(
        `/get-subjects-by-class-id?classId=${classId}`
      );
      setSubjects(res?.data?.data);
      console.log("Subjects Data:", res?.data?.data);
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await makeRequest.post(
        "https://api.studypulse.live/web/api/file-upload/profile-pic",
        formData
      );

      if (response.data.success) {
        setImageUrl(response.data.url); // Store the uploaded image URL
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to upload image.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error("Please upload a profile picture first.");
      return;
    }

    const subjectData = { name, classId, image: imageUrl };

    setIsLoading(true);
    setError("");

    try {
      const res = await makeRequest.post("/admin/create-subject", subjectData);
      console.log("Subject created successfully:", res.data);

      // Reset the form
      setName("");
      setImageUrl(""); // Reset the image URL
      setFile(null); // Clear the selected file
      toast("Subject created successfully");
      // Fetch updated subjects
      fetchSubjectsByClassId();

      // Close modal after subject is added
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating subject:", err.message);
      setError("Failed to create subject");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-[999]"
          onClick={() => setIsModalOpen(false)} // Close modal on backdrop click
        >
          <div
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Create Subject
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the details to add a new subject
              </p>
            </div>

            {/* Form Section */}
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Subject Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter subject name"
                  />
                </div>

                {/* Class Dropdown (Disabled) */}
                <div>
                  <label
                    htmlFor="classId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Class
                  </label>
                  <select
                    id="classId"
                    name="classId"
                    disabled
                    required
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={classId}>{className}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Uploading..." : "Upload Image"}
                  </button>
                </div>

                {/* Show Uploaded Image Preview */}
                {imageUrl && (
                  <div className="mt-4 text-center">
                    <p className="text-green-600 font-semibold">
                      Image Uploaded Successfully!
                    </p>
                    <img
                      src={`https://api.studypulse.live/${imageUrl}`}
                      alt="Uploaded Profile"
                      className="mt-2 max-w-xs mx-auto rounded-full"
                    />
                  </div>
                )}
                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {error}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between gap-4">
                  <button
                    type="submit"
                    className={`w-full py-3 px-6 rounded-md text-white font-semibold transition-all ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Subject..." : "Create Subject"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-3 px-6 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all font-semibold"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-6 shadow-lg rounded-lg max-w-6xl">
        {/* Title Section */}
        <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 mb-4">
          <BookUserIcon className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
          Subjects
        </p>

        {/* Class Name and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">{className}</h1>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            Add Subject
          </button>
        </div>

        {/* Table Section */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                Classes
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {subjects.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 hover:text-gray-400 transition-all"
              >
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
