import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Optional, for toast notifications
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setClassDetails } from "../../redux/features/idsSlice";
import {
  Plus,
  Edit,
  ArrowLeft,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Book,
} from "lucide-react";

export default function ChapterCurr() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    classId: selectedClassId,
    subjectId: selectedSubjectId,
    chapterId: selectedChapterId,
  } = useSelector((state) => state.ids.classDetails);

  // State variables
  const [classId, setClassId] = useState(selectedClassId || "");
  const [subjectId, setSubjectId] = useState(selectedSubjectId || "");
  const [chapterId, setChapterId] = useState(selectedChapterId || "");
  const [chapters, setChapters] = useState([]);
  const [chapterCurr, setChapterCurr] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openChapter, setOpenChapter] = useState(null);

  const userData = localStorage.getItem("user");
  const parsedData = JSON.parse(userData);

  // Update selected class, subject, chapter
  useEffect(() => {
    setClassId(selectedClassId);
    setSubjectId(selectedSubjectId);
    setChapterId(selectedChapterId);
  }, [selectedClassId, selectedSubjectId, selectedChapterId]);

  // Fetch classes and subjects
  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    classId && fetchSubjects();
  }, [classId]);

  useEffect(() => {
    subjectId && fetchChapters();
  }, [subjectId]);

  useEffect(() => {
    chapterId && fetchChapterCurr();
  }, [chapterId]);

  // Fetch classes from API
  const fetchClasses = async () => {
    try {
      const res = await makeRequest.get("teacher/get-all-classes");
      setClasses(res?.data?.data || []);
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };

  // Fetch subjects based on class
  const fetchSubjects = async () => {
    try {
      const res = await makeRequest.get("teacher/get-all-subjects");
      setSubjects(res?.data?.data || []);
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };

  // Fetch chapters based on subject and class
  const fetchChapters = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://api.studypulse.live/web/api/teacher/get-all-chapter",
        params: { subjectId, classId },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedData?.token}`,
        },
      });
      setChapters(response?.data?.data || []);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching chapters: " + error.message);
      console.error("Error fetching chapters:", error.message);
    }
  };

  // Fetch chapter curriculum based on chapterId, subjectId, classId
  const fetchChapterCurr = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://api.studypulse.live/web/api/teacher/get-all-chapterCurriculum",
        params: { chapterId, subjectId, classId },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedData?.token}`,
        },
      });
      setChapterCurr(response?.data?.data || []);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setChapterCurr([]);
      console.error(
        "Error fetching chapter curriculum:",
        error.response.data.message
      );
    }
  };

  // Filter subjects based on selected class
  const filteredSubjects = subjects.filter(
    (subject) => subject.classId === classId
  );

  // Filter chapters based on selected subject and class
  const filteredChapters = chapters.filter(
    (chapter) => chapter.classId === classId && chapter.subjectId === subjectId
  );

  // Toggle chapter details
  const toggleChapterDetails = (id) => {
    setOpenChapter(openChapter === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto my-8 p-6  shadow-lg rounded-lg">
      {/* Title */}
      <p className="text-center text sm:text-xl md:text-2xl font-serif p-2 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto m-3 drop-shadow-lg border-[1.5px] border-blue-800">
        <Book className="text sm:text-xl md:text-2xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce text-blue-600" />
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {" "}
          Chapter Curriculums
        </span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2 bg-gradient-to-r from-blue-400 to-purple-600 text-black p-3">
        {/* Class Selector */}
        <div>
          <select
            value={classId}
            onChange={(e) =>
              dispatch(
                setClassDetails({
                  classId: e.target.value,
                  subjectId,
                  chapterId,
                })
              )
            }
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Selector */}
        <div>
          <select
            value={subjectId}
            onChange={(e) =>
              dispatch(
                setClassDetails({
                  classId,
                  subjectId: e.target.value,
                  chapterId,
                })
              )
            }
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Select Subject</option>
            {filteredSubjects.map((subj) => (
              <option key={subj.id} value={subj._id}>
                {subj.name}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter Selector */}
        <div>
          <select
            value={chapterId}
            onChange={(e) =>
              dispatch(
                setClassDetails({
                  classId,
                  subjectId,
                  chapterId: e.target.value,
                })
              )
            }
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

      {/* Action Buttons */}
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
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            navigate("/teacher-dashboard/chapterCurrs/add_chapterCurr");
          }}
          className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
          title="Add ChapterCurr"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Chapter List */}
      <div className="space-y-4">
        {chapterCurr.length > 0 ? (
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
                      navigate(
                        "/teacher-dashboard/chapterCurrs/update_chapterCurr",
                        { state: { curr } }
                      )
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
          ))
        ) : classId ? (
          <p className="text-center text-gray-700 bg-gray-100 p-3 rounded-lg shadow-md mx-auto mt-12 text-lg font-medium">
            No chapters found for this class and subject.
          </p>
        ) : (
          <p className="text-center text-gray-700 bg-gray-100 p-3 rounded-lg shadow-md mx-auto mt-12 text-lg font-medium">
            Please select a class and subject to view chapters.
          </p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}
