import React, { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { Edit } from "lucide-react";

const UpdateChapter = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [chapterCurriculumIds, setChapterCurriculumIds] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { chapter } = location.state || {};
  const {
    chapterId,
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
      status,
      chapterCurriculumIds,
    };

    setIsLoading(true);
    setError("");

    try {
      const res = await makeRequest.post("teacher/update-chapter", updateData);
      console.log("Chapter updated successfully:", res.data);
      alert("Chapter updated successfully!");
    } catch (err) {
      console.error("Error updating chapter:", err.message);
      setError("Failed to update chapter");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
      <p className="text-center text-4xl font-semibold bg-purple-200 p-3 rounded-2xl flex w-4/6 justify-center items-center mx-auto text-gray-950 m-3">
    <Edit className="text-2xl min-w-8 min-h-8 mr-3 animate-bounce" /> {/* Lucid Icon with Bounce Animation */}
    Upate Chapter
  </p>

        <p className="card-title">Update Chapter</p>
      </div>
      <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Class ID */}
            <div>
              {/* <label
                htmlFor="classId"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Class ID
              </label> */}
              <input
                type="text"
                id="classId"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                hidden
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md"
              />
            </div>

            {/* Subject ID */}
            <div>
              {/* <label
                htmlFor="subjectId"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Subject ID
              </label> */}
              <input
                type="text"
                id="subjectId"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                hidden
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md"
              />
            </div>

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
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Chapter Curriculum IDs */}
            <div>
              {/* <label
                htmlFor="chapterCurriculumIds"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Chapter Curriculum IDs
              </label> */}
              <input
                type="text"
                id="chapterCurriculumIds"
                value={chapterCurriculumIds}
                hidden
                onChange={(e) =>
                  setChapterCurriculumIds(
                    e.target.value
                  )
                }
                placeholder="Comma-separated IDs"
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md"
              />
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
                {isLoading ? "Updating Chapter..." : "Update Chapter"}
              </button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateChapter;
