import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft, Edit } from "lucide-react";

const UpdateChapterCurriculum = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { curr } = location.state || {};

  // State Variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState("active");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize state with curr values
  useEffect(() => {
    if (curr) {
      setTitle(curr.title || "");
      setDescription(curr.description || "");
      setVideoUrl(curr.videoUrl || "");
      setStatus(curr.status || "active");
    }
  }, [curr]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("updateData", curr);
    const updateData = {
      chapterCurriculumId: curr._id, // Assuming curr has an _id field
      chapterId: curr.chapterId._id,
      subjectId: curr.subjectId._id,
      classId: curr.classId._id,
      title,
      description,
      videoUrl,
      status,
    };

    setIsLoading(true);
    setError("");

    try {
      const res = await makeRequest.post(
        "teacher/update-chapterCurriculum",
        updateData
      );
      console.log("Chapter curriculum updated successfully:", res.data);
      alert("Chapter curriculum updated successfully!");
      navigate("/teacher-dashboard/chapterCurrs", {
        state: {
          initialClassId: curr.classId._id,
          initialChapterId: curr.chapterId._id,
          initialSubjectId: curr.subjectId._id,
        },
      });
    } catch (err) {
      console.error(
        "Error updating chapter curriculum:",
        err.response.data.error
      );
      toast.error(err.response.data.error);
      setError("Failed to update chapter curriculum", err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
        <Edit className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
        Update Chapter Curriculum
      </p>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <button
          onClick={() => {
            navigate("/teacher-dashboard/chapterCurrs", {
              state: { curr },
            });
          }}
          className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-110"
          title="Back to chapterCurrs"
        >
          <ArrowLeft className="w-5 h-5 transition-all" />
        </button>
        <div className=" dark:bg-slate-950 transition-colors p-4 rounded-lg mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="4"
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md"
              ></textarea>
            </div>

            {/* Video URL */}
            <div>
              <label
                htmlFor="videoUrl"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Video URL
              </label>
              <input
                type="url"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md"
              >
                <option value="active">Active</option>
                <option value="inActive">Inactive</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                  isLoading
                    ? "bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                }`}
              >
                {isLoading ? "Updating..." : "Update Curriculum"}
              </button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default UpdateChapterCurriculum;
