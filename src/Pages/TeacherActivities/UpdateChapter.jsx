import React, { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

const UpdateChapter = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [chapterCurriculumIds, setChapterCurriculumIds] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { chapter } = location.state || {};
  const {
    _id: chapterId,
    classId,
    subjectId,
    title: initialTitle,
    description: initialDescription,
    status: initialStatus,
    chapterCurriculumIds: initialCurriculumIds,
  } = chapter || {};

  useEffect(() => {
    console.log("Chapters loaded", chapter);

    if (chapter) {
      setTitle(initialTitle || "");
      setDescription(initialDescription || "");
      setStatus(initialStatus || "active");
      setChapterCurriculumIds(initialCurriculumIds || []);
    }
  }, [chapter]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      chapterId,
      classId,
      subjectId,
      title,
      description,
      status: status === "active" ? "active" : "inActive",
      chapterCurriculumIds,
    };

    setIsLoading(true);
    setError("");

    try {
      const res = await makeRequest.post("teacher/update-chapter", updateData);
      console.log("Chapter updated successfully:", res.data);
      console.log("Class Nad SUbject Id: ", classId, subjectId, chapterId);

      alert("Chapter updated successfully!");
      navigate("/teacher-dashboard/chapters", {
        state: {
          classId,
          subjectId,
          chapterId,
        },
      });
    } catch (err) {
      console.error("Error updating chapter:", err.message);
      setError("Failed to update chapter");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
        <Edit className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
        Update Chapter
      </p>

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg mx-auto mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Class ID */}
          <div>
            <input
              type="text"
              id="classId"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              hidden
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Subject ID */}
          <div>
            <input
              type="text"
              id="subjectId"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              hidden
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md mt-2"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-md mt-2"
            ></textarea>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md mt-2"
            >
              <option value="active">Active</option>
              <option value="inActive">Inactive</option>
            </select>
          </div>

          {/* Chapter Curriculum IDs */}
          <div>
            <input
              type="text"
              id="chapterCurriculumIds"
              value={chapterCurriculumIds}
              hidden
              onChange={(e) => setChapterCurriculumIds(e.target.value)}
              placeholder="Comma-separated IDs"
              className="w-full px-4 py-3 border border-gray-300 rounded-md mt-2"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              }`}
            >
              {isLoading ? "Updating Chapter..." : "Update Chapter"}
            </button>
          </div>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default UpdateChapter;
