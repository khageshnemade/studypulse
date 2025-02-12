import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { ArrowLeft, PlusCircle } from "lucide-react";

import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AddChapter = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { classId: initialClassId, subjectId: initialSubjectId } =
    location.state;

  useEffect(() => {
    setClassId(initialClassId || "");
    setSubjectId(initialSubjectId || "");
    fetchClasses();
    fetchSubjects();
  }, [classId]);
  const filteredSubjects = subjects.filter(
    (subject) => subject.classId == classId
  );
  console.log("Filtered Subject", filteredSubjects);
  const fetchClasses = async () => {
    try {
      const res = await makeRequest.get(`teacher/get-all-classes`);
      setClasses(res?.data?.data || []);
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await makeRequest.get(`teacher/get-all-subjects`);
      console.log("Subjects fetched", res?.data);
      setSubjects(res?.data?.data || []);
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chapterData = { classId, subjectId, title, description };

    setIsLoading(true);
    setError("");

    try {
      const res = await makeRequest.post(
        "/teacher/create-chapter",
        chapterData
      );
      console.log("Chapter created successfully:", res.data);

      setTitle("");
      setDescription("");
      setClassId("");
      setSubjectId("");

      if (res.status === 200 || res.status === 201) {
        toast.success(res?.data?.message);

        setTimeout(() => {
          navigate("/teacher-dashboard/chapters");
        }, 2000); // Wait 2 seconds before redirecting
      }
    } catch (err) {
      console.error("Error creating chapter:", err.message);
      setError("Failed to create chapter");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {" "}
      <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
        <PlusCircle className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
        Create Chapter
      </p>
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <Link
          to={"/teacher-dashboard/chapters"}
          className="flex items-center gap-2 w-1/5  bg-gradient-to-r from-blue-500 to-purple-600 text-white p-1 rounded-full m-2"
          title="Go Back"
        >
          <ArrowLeft />
        </Link>

        <div className="card-header mb-4"></div>
        <div className="card-body bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-900"
              >
                Chapter Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-900"
              >
                Chapter Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="4"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="classId"
                className="block text-sm font-medium text-gray-900"
              >
                Class
              </label>
              <select
                id="classId"
                name="classId"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={""}>Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="subjectId"
                className="block text-sm font-medium text-gray-900"
              >
                Subject
              </label>
              <select
                id="subjectId"
                name="subjectId"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={""}>Select Subject</option>
                {filteredSubjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-md bg-blue-300 text-gray-600 font-semibold flex items-center justify-center ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "hover:bg-blue-700 focus:ring-2 hover:text-white focus:ring-blue-400 transition-all duration-300"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 mr-3 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                  Creating Chapter...
                </>
              ) : (
                "Create Chapter"
              )}
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddChapter;
