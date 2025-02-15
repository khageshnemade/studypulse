import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Optional, for toast notifications
import { makeRequest } from "../../axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  ArrowLeft,
  MessageSquare,
  Book,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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
  const [chapter, setChapter] = useState({});
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chapterCurr, setChapterCurr] = useState([]);
  const userData = localStorage.getItem("user");
  const parsedData = JSON.parse(userData);
  console.log("Parsed Data:", parsedData?.token);
  const [openChapter, setOpenChapter] = useState(null);
  const toggleChapterDetails = (id) => {
    setOpenChapter(openChapter === id ? null : id);
  };
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
      setChapterCurr([]);
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
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      {/* Title */}

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
            <option value="">Select Chapter</option>
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
          title="Back To Chapter List"
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
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Chapter Curriculum List
      </h1>

      {/* Chapter List */}
      <div className="space-y-4">
        {
          chapterCurr.length > 0 ?
          chapterCurr.map((curr) => (
            <div
              key={curr._id}
              className="border border-gray-300 rounded-lg shadow-sm p-4 bg-gray-50 hover:shadow-md transition"
            >
              {/* Chapter Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  {curr.title}
                </h2>
  
                <div className="flex items-center gap-4">
                  {/* Edit Button */}
                  <button
                    onClick={() =>
                      navigate("/teacher-dashboard/update_chapterCurr", {
                        state: { curr },
                      })
                    }
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    title="Edit Chapter"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
  
                  {/* Chat Button */}
                  <button
                    onClick={() => {
                      const newChapter = chapters.find(
                        (c) => c._id === chapterId
                      );
                      if (newChapter) {
                        navigate("/teacher-dashboard/chapterCurrs/chat", {
                          state: { curr, chapter: newChapter },
                        });
                      } else {
                        console.log("Chapter not found");
                      }
                    }}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    title="Send Chat"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
  
                  {/* Dropdown Button */}
                  <button
                    onClick={() => toggleChapterDetails(curr._id)}
                    className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    title="Expand"
                  >
                    {openChapter === curr._id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
  
              {/* Chapter Details (Dropdown Content) */}
              {openChapter === curr._id && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-gray-700">{curr.description}</p>
  
                  {/* Video URL */}
                  <div className="mt-3 text-right">
                    {curr.videoUrl ? (
                      <a
                        href={curr.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 font-medium transition"
                      >
                        Watch Video
                      </a>
                    ) : (
                      <span className="text-gray-500">No video available</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )):
         classId ? <p className="text-center text-gray-700 bg-gray-100 p-3 rounded-lg shadow-md  mx-auto mt-12 text-lg font-medium hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
         No chapters found for this class and subject.
       </p>:
        <p className="text-center text-gray-700 bg-gray-100 p-3 rounded-lg shadow-md  mx-auto mt-12 text-lg font-medium hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
        Please select a class and subject to view chapters.
        </p>
       
       }
        
        
      </div>

      <ToastContainer />
    </div>
  );
}
