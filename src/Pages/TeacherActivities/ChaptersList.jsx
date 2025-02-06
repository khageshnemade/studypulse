import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Optional, for toast notifications
import { makeRequest } from "../../axios";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import { FileText, BookOpen, Edit, Plus, Book } from "lucide-react"; // Import icons

const ChaptersList = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [classes, setClasses] = useState([]);
  const [chapterId, setChapterId] = useState("");
  const [chaptersIds, setChapterIds] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectId, setSubjectId] = useState("");
  const [classId, setClassId] = useState("");
  const userData = localStorage.getItem("user");
  const parsedData = JSON.parse(userData);
  console.log("Parsed Data:", parsedData?.token);
  const location = useLocation();
  const { subject } = location.state || {};
  const {
    classId: initialClassId,
    subjectId: initialSubectId,
    chapterId: initialChapterId,
  } = location.state || {};

  useEffect(() => {
    classId && fetchSubjects();
    initialClassId && setClassId(initialClassId);
    initialSubectId && setSubjectId(initialSubectId);
    initialChapterId && setChapterId(initialChapterId);
  }, [classId]);
  const filteredSubjects = subjects.filter(
    (subject) => subject.classId == classId
  );
  console.log("Filtered Subject", filteredSubjects);
  useEffect(() => {
    fetchClasses();
    subject && setClassId(subject?.classId);
    setSubjectId(subject?._id);
    setChapterIds(subject?.chapterIds);
  }, []);
  useEffect(() => {
    subjectId && fetchChapters();
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
      console.log(response.data);
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

  return (
    <div className=" mx-auto p-6 rounded-lg shadow-xl">
      <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
        <Book className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
        Chapters List
      </p>

      <div className="flex items-center gap-6 mb-8">
        {/* Class Selector */}
        <div className="w-full sm:w-1/3 relative">
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
        <div className="w-full sm:w-1/3 relative">
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">All Subjects</option>
            {filteredSubjects.map((subj) => (
              <option key={subj.id} value={subj._id}>
                {subj.name}
              </option>
            ))}
          </select>
        </div>

        {/* Add Chapter Button */}
        <div className="flex justify-center items-center relative">
          <button
            onClick={() => {
              navigate("/teacher-dashboard/add_chapter", {
                state: { classId, subjectId },
              });
            }}
            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white w-10 h-10 rounded-full hover:bg-blue-700 transition duration-300 mt-4"
            title="Add Chapter"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-8">
          <span className="text-xl">
            Please Select Class Name and Subject Name...
          </span>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gradient-to-r from-blue-400 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-left min-w-[150px]">
                  Chapter Title
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-left min-w-[200px]">
                  Description
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-left min-w-[120px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredChapters.length > 0 ? (
                filteredChapters.map((chapter) => (
                  <tr
                    key={chapter._id}
                    className="border-b hover:bg-gray-100 transition duration-200"
                  >
                    <td className="px-6 py-4 text-lg font-medium">
                      {chapter.title}
                    </td>
                    <td className="px-6 py-4">
                      {chapter.description || "No description available"}
                    </td>
                    <td className="px-6 py-4 flex gap-3 justify-center">
                      {/* Assignments Button */}
                      <button
                        onClick={() =>
                          navigate("/teacher-dashboard/assignments", {
                            state: {
                              classId,
                              subjectId,
                              chapterId: chapter._id,
                            },
                          })
                        }
                        className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition duration-200"
                        title="Assignments"
                      >
                        <FileText className="w-5 h-5" />
                      </button>

                      {/* Notes Button */}
                      <button
                        onClick={() =>
                          navigate("/teacher-dashboard/chapterCurrs", {
                            state: {
                              initialClassId: classId,
                              initialSubjectId: subjectId,
                              initialChapterId: chapter._id,
                            },
                          })
                        }
                        className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-200"
                        title="Chapter Curriculum"
                      >
                        <BookOpen className="w-5 h-5" />
                      </button>

                      {/* Update Button */}
                      <button
                        onClick={() =>
                          navigate("/teacher-dashboard/update_chapter", {
                            state: { chapter },
                          })
                        }
                        className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition duration-200"
                        title="Update Chapter"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-center text-gray-600"
                  >
                    No chapters found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ChaptersList;
