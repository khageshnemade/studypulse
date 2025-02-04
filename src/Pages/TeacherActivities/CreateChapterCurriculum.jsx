import React, { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CreateChapterCurriculum = () => {
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = localStorage.getItem("user");
  const parsedData = JSON.parse(userData);
  console.log("Parsed Data:", parsedData?.token);
  const location = useLocation();
  const {
    chapterId: initialChapterId,
    classId: initialclassId,
    subjectId: initialsubjectId,
  } = location.state;
  useEffect(() => {
    fetchSubjects();
  }, [classId]);

  useEffect(() => {
    setChapterId(initialChapterId || "");
    setClassId(initialclassId || "");
    setSubjectId(initialsubjectId || "");
    fetchClasses();
  }, []);
  useEffect(() => {
    fetchChapters();
  }, [subjectId]);

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
  const fetchChapters = async () => {
    try {
      // Construct the request URL with query parameters
      const response = await axios({
        method: "GET",
        url: "https://api.studypulse.live/web/api/teacher/get-all-chapter",
        params: {
          subjectId,
          classId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedData?.token}`, // Use token if available
        },
      });
      console.log("Chapters", response.data);
      setChapters(response?.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching chapters: " + error.message);
      console.error("Error fetching chapters:", error.message);
    }
  };
  const filteredChapters = chapters.filter(
    (chapter) => chapter.classId === classId && chapter.subjectId === subjectId
  );
  const filteredSubjects = subjects.filter(
    (subject) => subject.classId === classId
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chapterCurriculumData = {
      classId,
      subjectId,
      title,
      description,
      chapterId,
      videoUrl,
    };

    setIsLoading(true);
    setError("");

    try {
      const res = await makeRequest.post(
        "/teacher/create-chapter-curriculum",
        chapterCurriculumData
      );
      console.log("Chapter curriculum created successfully:", res.data);
      // Reset the form
      setTitle("");
      setDescription("");
      setChapterId("");
      setVideoUrl("");
      setClassId("");
      setSubjectId("");
    } catch (err) {
      console.error("Error creating chapter curriculum:", err.message);
      setError("Failed to create chapter curriculum");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-title">Create Chapter Curriculum</p>
      </div>
      <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="classId"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Class
              </label>
              <select
                id="classId"
                name="classId"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
              >
                <option value="">Select a Class</option>
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
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Subject
              </label>
              <select
                id="subjectId"
                name="subjectId"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
              >
                <option value="">Select a Subject</option>

                {filteredSubjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Chapter Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Chapter
              </label>
              <select
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="">All Chapters</option>
                {filteredChapters.map((chapter) => (
                  <option key={chapter._id} value={chapter._id}>
                    {chapter.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
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
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
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
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
              />
            </div>

            <div>
              <label
                htmlFor="chapterId"
                className="block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Chapter ID
              </label>
              <input
                type="text"
                id="chapterId"
                name="chapterId"
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
              />
            </div>

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
                name="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-semibold ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"}`}
              disabled={isLoading}
            >
              {isLoading
                ? "Creating Chapter Curriculum..."
                : "Create Chapter Curriculum"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChapterCurriculum;
