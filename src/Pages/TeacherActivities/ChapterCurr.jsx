import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Optional, for toast notifications
import { makeRequest } from "../../axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plus, Edit, ArrowLeft, MessageSquare, Book } from "lucide-react";

export default function ChapterCurr() {
  const navigate = useNavigate();
  const location = useLocation();
  const { initialClassId, initialSubjectId, initialChapterId } =
    location.state || {};
  const { curr } = location.state || {};

  const [classId, setClassId] = useState(
    initialClassId || (curr && curr.classId._id) || ""
  );
  const [subjectId, setSubjectId] = useState(
    initialSubjectId || (curr && curr.subjectId._id) || ""
  );
  const [chapterId, setChapterId] = useState(
    initialChapterId || (curr && curr.subjectId.chapterIds[0]) || ""
  );
  const [chapters, setChapters] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chapterCurr, setChapterCurr] = useState([]);
  const userData = localStorage.getItem("user");
  const parsedData = JSON.parse(userData);
  console.log("Parsed Data:", parsedData?.token);
  useEffect(() => {
    classId && fetchSubjects();
    console.log("Curr Subject", curr);
  }, [classId]);

  useEffect(() => {
    fetchClasses();
  }, []);
  useEffect(() => {
    subjectId && fetchChapters();
  }, [subjectId]);
  useEffect(() => {
    chapterId && fetchChapterCurr();
  }, [chapterId]);

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
  const fetchChapterCurr = async () => {
    try {
      // Construct the request URL with query parameters
      const response = await axios({
        method: "GET",
        url: "https://api.studypulse.live/web/api/teacher/get-all-chapterCurriculum",
        params: {
          chapterId,
          subjectId,
          classId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedData?.token}`, // Use token if available
        },
      });
      console.log("ChapterCurr", response.data);
      setChapterCurr(response?.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(
        "Error fetching chaptersCurr:",
        error.response.data.message
      );
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
      console.log(response.data);
      setChapters(response?.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching chapters: " + error.message);
      console.error("Error fetching chapters:", error.message);
    }
  };
  const filteredSubjects = subjects.filter(
    (subject) => subject.classId == classId
  );
  console.log("Filtered Subject", filteredSubjects);
  const filteredChapters = chapters.filter(
    (chapter) => chapter.classId === classId && chapter.subjectId === subjectId
  );
  return (
    <div className="container mx-auto p-6">
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Class Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Class</label>
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Subject
          </label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">All Subjects</option>
            {filteredSubjects.map((subj) => (
              <option key={subj.id} value={subj._id}>
                {subj.name}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">
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
      </div>
      {/* Add Chapter Button */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => {
            navigate("/teacher-dashboard/chapters", {
              state: { classId, subjectId, chapterId },
            });
          }}
          className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
          title=" Add ChapterCurr"
        >
          <ArrowLeft className="w-4 h-4" /> {/* Add Icon */}
        </button>

        <button
          onClick={() => {
            navigate("/teacher-dashboard/add_chapterCurr", {
              state: { classId, subjectId, chapterId },
            });
          }}
          className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
          title=" Add ChapterCurr"
        >
          <Plus className="w-4 h-4" /> {/* Add Icon */}
        </button>
      </div>
      {/* Curriculum List */}{" "}
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900"></h1>
      <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
        <Book className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
        Chapter Curriculum List
      </p>
      {chapterCurr.map((curr) => (
        <div key={curr._id} className="mb-10 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {curr.title}
          </h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {curr.description}
          </p>

          {/* Video URL */}
          <div className="mt-6 flex justify-end items-center gap-4">
            {curr.videoUrl ? (
              <Link
                to={curr.videoUrl}
                className="text-blue-500 hover:text-blue-600 font-medium text-lg transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Video
              </Link>
            ) : (
              <span className="text-gray-500 text-lg">No video available</span>
            )}

            {/* Edit Button */}
            <button
              onClick={() => {
                navigate("/teacher-dashboard/update_chapterCurr", {
                  state: { curr },
                });
              }}
              className="flex items-center justify-center bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition duration-200 transform hover:scale-105"
              title="Update Chapter Curriculum"
            >
              <Edit className="w-5 h-5" /> {/* Edit Icon */}
            </button>
            <button
              onClick={() => {
                navigate("/teacher-dashboard/chat", {
                  state: { curr },
                });
              }}
              className="flex items-center justify-center bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition duration-200 transform hover:scale-105"
              title="Send Chat"
            >
              <MessageSquare className="w-5 h-5" /> {/* Lucide Chat Icon */}
            </button>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}
