import React, { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { PlusCircle } from "lucide-react";

const AddAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [passingMarks, setPassingMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [chapters, setChapters] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapterId, setChapterId] = useState("d");
  const [subjectId, setSubjectId] = useState("d");
  const [classId, setClassId] = useState("d");
  const location = useLocation();
  const {
    classId: initialClassId,
    subjectId: initialSubjectId,
    chapterId: initialChapterId,
  } = location.state;
  const userData = localStorage.getItem("user");
  const parsedData = JSON.parse(userData);
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  useEffect(() => {
    setClassId(initialClassId || "");
    setSubjectId(initialSubjectId || "");
    setChapterId(initialChapterId || "");
    fetchClasses();
  }, []);

  useEffect(() => {
    if (classId !== "d") {
      fetchSubjects();
    }
  }, [classId]);

  useEffect(() => {
    if (subjectId !== "d") {
      fetchChapters();
    }
  }, [subjectId]);

  const fetchClasses = async () => {
    try {
      const res = await makeRequest.get(`teacher/get-all-classes`);
      setClasses(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching classes:", error.message);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await makeRequest.get(`teacher/get-all-subjects`);
      setSubjects(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
    }
  };

  const fetchChapters = async () => {
    try {
      const res = await makeRequest.get(
        `teacher/get-all-chapter?classId=${classId}&subjectId=${subjectId}`,
        {
          headers: {
            Authorization: `Bearer ${parsedData?.token}`,
          },
        }
      );
      setChapters(res?.data?.data || []);
    } catch (error) {
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
  console.log("Filtered Chapters", filteredChapters);
  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        question: "  1.	If p% of p is 36, then p is equal to ?",
        marks: 1,
        options: [
          { text: "3600", isCorrect: true },
          { text: "67", isCorrect: false },
          { text: "67", isCorrect: false },
        ],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assignmentData = {
      classId,
      subjectId,
      chapterId,
      title,
      description,
      passingMarks,
      totalMarks,
      questions,
      dueDate,
      status: "active",
    };

    setIsLoading(true);
    setError("");

    try {
      const res = await makeRequest.post(
        "teacher/create-assignment",
        assignmentData
      );
      console.log("Assignment created successfully:", res.data);

      // Reset the form
      setTitle("");
      setDescription("");
      setPassingMarks(0);
      setTotalMarks(0);
      setQuestions([]);
      setDueDate("");
      setClassId("");
      setSubjectId("");
      setChapterId("");

      // Show success toast and navigate after it's shown

      toast.success(res?.data?.message);
      setTimeout(() => {
        navigate("/teacher-dashboard/assignments", {
          state: {
            classId: classId,
            subjectId: subjectId,
            chapterId: chapterId,
          },
        });
      }, 1000);
    } catch (error) {
      console.error("Error creating assignment:", error.message);
      toast.error("Failed to create assignment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-blue-400 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
        <PlusCircle className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
        Create Assignment
      </p>

      <div className="card-body bg-white dark:bg-slate-950">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Class, Subject, and Chapter Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Class
              </label>
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
                {chapters.map((chapter) => (
                  <option key={chapter._id} value={chapter._id}>
                    {chapter.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Assignment Details */}
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Passing Marks</label>
              <input
                type="number"
                value={passingMarks}
                onChange={(e) => setPassingMarks(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Total Marks</label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded"
              />
            </div>
          </div>

          {/* Questions */}
          <div>
            <label className="block text-sm font-medium">Questions</label>
            {questions.map((question, index) => (
              <div key={index} className="space-y-2 border-b pb-4 mb-4">
                <input
                  type="text"
                  placeholder="Question text"
                  value={question.question}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].question = e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                  className="w-full border px-4 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Question marks"
                  value={question.marks}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].marks = e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                  className="w-full border px-4 py-2 rounded"
                />
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    <input
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      value={option.text}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].options[optIndex].text =
                          e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                      className="w-full border px-4 py-2 rounded"
                    />
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].options[optIndex].isCorrect =
                            e.target.checked;
                          setQuestions(updatedQuestions);
                        }}
                      />
                      Correct
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Question
            </button>
          </div>

          {/* Due Date */}

          <div>
            <label className="block text-sm font-medium">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              min={today} // Prevent selecting past dates
              className="w-full border px-4 py-2 rounded max-w-min"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
            >
              {isLoading ? "Creating..." : "Create Assignment"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddAssignment;
