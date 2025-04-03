import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeRequest } from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FileText, Edit, Plus, Book, Video } from "lucide-react"; // Import icons
import { useSelector, useDispatch } from "react-redux";
import { setClassDetails } from "../../redux/features/idsSlice";
import store from "../../redux/store/store";

const ChaptersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chapters, setChapters] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const { _id: initialSubjectId, classId: initialClassId } =
    location?.state?.subject || {}; // Ensure location.state and subject exist

  // Get the classId, subjectId, chapterId from Redux store
  const { classId, subjectId, chapterId } = useSelector(
    (state) => state.ids.classDetails
  );

  const userData = localStorage.getItem("user");
  const parsedData = JSON.parse(userData);

  useEffect(() => {
    // Set classId and subjectId based on location.state if present
    if (initialClassId && initialSubjectId) {
      dispatch(
        setClassDetails({
          classId: initialClassId,
          subjectId: initialSubjectId,
          chapterId,
        })
      );
    } else {
      // Fall back to Redux state if no location.state
      dispatch(setClassDetails({ classId, subjectId, chapterId }));
    }
    fetchClasses(); // Fetch classes after setting initial state
  }, [
    initialClassId,
    initialSubjectId,
    classId,
    subjectId,
    chapterId,
    dispatch,
  ]);

  useEffect(() => {
    if (classId) fetchSubjects();
  }, [classId]);

  useEffect(() => {
    if (classId && subjectId) {
      fetchChapters();
    }
  }, [classId, subjectId]);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("teacher/get-all-classes");
      setClasses(res?.data?.data || []);
    } catch (error) {
      console.error("Request Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const res = await makeRequest.get("teacher/get-all-subjects");
      setSubjects(res?.data?.data || []);
    } catch (error) {
      console.error("Request Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange = (e) => {
    dispatch(
      setClassDetails({ classId: e.target.value, subjectId, chapterId })
    );
  };

  const handleSubjectChange = (e) => {
    const selectedId = e.target.value;
    const selectedSubject = subjects.find(
      (subj) => subj._id === selectedId
    ).name;
    console.log("Selected Subject", selectedSubject);
    dispatch(
      setClassDetails({
        classId,
        subjectId: e.target.value,
        chapterId,
        subjectName: selectedSubject,
      })
    );
  };

  const fetchChapters = async () => {
    setLoading(true);
    try {
      const response = await makeRequest.get("teacher/get-all-chapter", {
        params: {
          subjectId,
          classId,
        },
      });
      setChapters(response?.data?.data || []);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching chapters: " + error.response.data.message);
      console.error("Error fetching chapters:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubjects = subjects.filter(
    (subject) => subject.classId == classId
  );
  const filteredChapters = chapters.filter(
    (chapter) => chapter.classId === classId && chapter.subjectId === subjectId
  );

  return (
    <div className="mx-auto p-6 rounded-lg shadow-xl">
      <p className="text-center text sm:text-xl md:text-2xl font-serif p-2 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto m-3 drop-shadow-lg border-[1.5px] border-blue-800">
        <Book className="text sm:text-xl md:text-2xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce text-blue-600" />
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Chapters List
        </span>
      </p>
      {/* Loading Spinner */}
      {loading && (
        <div className="mt-2 flex justify-center items-center">
          <div className="animate-spin border-4 border-blue-500 border-t-transparent w-6 h-6 rounded-full"></div>
        </div>
      )}
      <div className="flex items-center gap-6 mb-8">
        {/* Class Selector */}
        <div className="w-full sm:w-1/3 relative">
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
            onChange={handleSubjectChange} // Updated
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
              navigate("/teacher-dashboard/chapters/add_chapter");
            }}
            className="flex items-center justify-center bg-gradient-to-r from-teal-500 via-teal-600 to-blue-600 text-white w-10 h-10 rounded-full hover:bg-blue-700 transition duration-300 mt-4 relative bottom-3"
            title="Add Chapter"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-center text-gray-700 bg-gray-100 p-3 rounded-lg shadow-md  mx-auto text-lg font-medium hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            Please Select Class Name and Subject Name...
          </p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-left min-w-[150px]">
                  Chapter Title
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-left min-w-[200px]">
                  Description
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-center min-w-[120px]">
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
                        onClick={() => {
                          dispatch(
                            setClassDetails({
                              classId,
                              subjectId,
                              chapterId: chapter?._id,
                              chapterName: chapter.title,
                            })
                          );
                          console.log("Changed");
                          navigate("/teacher-dashboard/chapters/assignments");
                        }}
                        className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition duration-200"
                        title="Assignments"
                      >
                        <FileText className="w-5 h-5" />
                      </button>

                      {/* Notes Button */}
                      <button
                        onClick={(e) => {
                          // Update Redux store with classId, subjectId, and chapterId
                          dispatch(
                            setClassDetails({
                              classId,
                              subjectId,
                              chapterId: chapter._id,
                            })
                          );
                          navigate("/teacher-dashboard/chapterCurrs");
                        }}
                        className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-200"
                        title="Chapter Curriculum"
                      >
                        <Video className="w-5 h-5" />
                      </button>

                      {/* Update Button */}
                      <button
                        onClick={() => {
                          dispatch(
                            setClassDetails({
                              chapter: chapter,
                              classId,
                              subjectId,
                              chapterId: chapter._id,
                            })
                          );
                          navigate(
                            `/teacher-dashboard/chapters/update_chapter`
                          );
                        }}
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
                    className="text-center py-4 text-lg font-semibold"
                  >
                    No chapters available
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
