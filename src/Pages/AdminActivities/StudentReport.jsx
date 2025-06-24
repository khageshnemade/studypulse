import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import makeRequest from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";

const StudentReport = () => {
  const reportRef = useRef();
  const [subjects, setSubjects] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYearId, setSelectedYearId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const studentId = location.state.studentId || "68553aefe3ee59d1c941a5b7";
  const navigate = useNavigate();

  const fetchAcademicYears = async () => {
    try {
      const response = await makeRequest.get("admin/get-academic-years");
      const data = response.data?.data || [];
      setAcademicYears(data);

      // Default to first year if none selected
      if (data.length > 0) {
        setSelectedYearId(data[0]._id);
      }
    } catch (err) {
      setError("Failed to fetch academic years.");
    }
  };

  const fetchReportData = async (yearId) => {
    if (!yearId) return;
    setIsLoading(true);

    try {
      const response = await makeRequest.get(
        `admin/get-student-report-card?academicYearId=${yearId}&studentId=${studentId}`
      );
      const data = response.data?.data || [];
      setSubjects(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch report card data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAcademicYears();
  }, []);

  useEffect(() => {
    if (selectedYearId) {
      fetchReportData(selectedYearId);
    }
  }, [selectedYearId]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.html(reportRef.current, {
      callback: function (doc) {
        doc.save("Student_Report_Card.pdf");
      },
      x: 10,
      y: 10,
      width: 180,
      windowWidth: 1000,
    });
  };

  const getAttemptStatus = (assignments) => {
    const attemptsList = [];

    assignments.forEach((assignment) => {
      assignment.attempts.forEach((attempt) => {
        attemptsList.push(
          attempt.result === "pass" ? (
            <span key={attempt.attemptNumber} className="text-green-600 flex items-center gap-1">
              <FaCheck /> Attempt {attempt.attemptNumber}: Passed
            </span>
          ) : (
            <span key={attempt.attemptNumber} className="text-red-600 flex items-center gap-1">
              <FaTimes /> Attempt {attempt.attemptNumber}: Failed
            </span>
          )
        );
      });
    });

    return <div className="flex flex-col">{attemptsList}</div>;
  };

  return (
    <div className="flex flex-col items-center">

      <div className="w-full max-w-5xl my-4 px-4">
        <div className="flex justify-between items-center mb-4">
          {/* Back Button - Blue and Sleek */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            <FaArrowLeft />
            Back
          </button>

          {/* Year Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="yearSelect" className="font-medium text-gray-800">
              Academic Year:
            </label>
            <select
              id="yearSelect"
              className="border rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedYearId}
              onChange={(e) => setSelectedYearId(e.target.value)}
            >
              {academicYears.map((year) => (
                <option key={year._id} value={year._id}>
                  {year.yearName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>


      {isLoading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div
            ref={reportRef}
            className="w-[90%] bg-yellow-100 p-6 border-2 border-gray-800 rounded-lg shadow-lg"
          >
            <h1 className="text-2xl font-bold text-center text-gray-900">
              STUDENT REPORT CARD
            </h1>

            <div className="grid grid-cols-2 gap-2 border-2 border-gray-800 p-4 mt-4">
              <p><strong>Student:</strong> John Doe</p>
              <p><strong>Class:</strong> 10th</p>
              <p><strong>Teacher:</strong> Mrs. Smith</p>
              <p><strong>School:</strong> ENGLISH MEDIUM WADGAONSHERI</p>
              <p>
                <strong>Year:</strong>{" "}
                {academicYears.find((y) => y._id === selectedYearId)?.yearName}
              </p>
            </div>

            <table className="w-full mt-4 border-collapse border border-gray-800">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Assignment 1</th>
                  <th className="border p-2">Assignment 2</th>
                  <th className="border p-2">Assignment 3</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => {
                  const assignments = subject.assignments;
                  const marks = ["-", "-", "-"];
                  assignments.forEach((a, idx) => {
                    const firstAttempt = a.attempts[0]?.obtainedMarks ?? "-";
                    marks[idx] = firstAttempt;
                  });

                  return (
                    <tr key={index} className="bg-white text-gray-800">
                      <td className="border p-2">{subject.subjectName}</td>
                      {marks.map((mark, idx) => (
                        <td key={idx} className="border p-2 text-center">{mark}</td>
                      ))}
                      <td className="border p-2">{getAttemptStatus(assignments)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="grid grid-cols-2 gap-2 border-2 border-gray-800 p-4 mt-4">
              <p className="text-gray-700 font-medium">Percentage: 90%</p>
              <p className="text-gray-700 font-medium">Status: Pass</p>
            </div>

            <footer className="text-center text-gray-700 mt-4">
              <p>www.yourwebsite.com</p>
              <p>391 Christopher St, New York</p>
              <p>(655) 334-9988</p>
            </footer>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Download PDF
          </button>
        </>
      )}
    </div>
  );
};

export default StudentReport;
