import React, { useRef } from "react";
import { jsPDF } from "jspdf";

const StudentReport = () => {
  const reportRef = useRef();

  // Function to handle PDF generation
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait", // Portrait or landscape orientation
      unit: "mm", // Measurement unit (mm, cm, etc.)
      format: "a4", // Page size (A4 is default but you can specify other sizes)
    });

    // Add content to the PDF
    doc.html(reportRef.current, {
      callback: function (doc) {
        // Save the PDF with a title
        doc.save("Student_Report_Card.pdf");
      },
      x: 10,
      y: 10,
      width: 180, // Adjust width if needed (margin from left)
      windowWidth: 1000, // Adjust window width if the content is not showing fully
    });
  };

  const studentInfo = {
    name: "John Doe",
    class: "10th",
    teacher: "Mrs. Smith",
    schoolName: "ENGLISH MEDIUM WADGAONSHERI",
    schoolYear: "2024-2025",
  };

  const passingGrade = 50;

  const subjects = [
    { name: "Literature", marks: [85, "-", "-"] },
    { name: "History", marks: [75, "-", "-"] },
    { name: "Geography", marks: [60, "-", "-"] },
    { name: "Algebra", marks: [55, "-", "-"] },
    { name: "Social Science", marks: [70, "-", "-"] },
    { name: "Chemistry", marks: [95, "-", "-"] },
    { name: "Art", marks: [85, "-", "-"] },
    { name: "Physical Education", marks: [50, "-", "-"] },
    { name: "Entrepreneurship", marks: [40, 42, 45] },
  ];

  // Function to check if a student has passed each attempt and return the status
  const getAttemptStatus = (marks) => {
    let status = marks.map((mark, index) =>
      mark >= passingGrade
        ? `Attempt ${index + 1}: Passed`
        : `Attempt ${index + 1}: Failed`
    );

    return status.join(", ");
  };

  return (
    <div className="flex flex-col items-center">
      {/* PDF Content */}
      <div
        ref={reportRef}
        className="w-[90%] bg-yellow-100 p-6 border-2 border-gray-800 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center text-gray-900">
          STUDENT REPORT CARD
        </h1>

        <div className="grid grid-cols-2 gap-2 border-2 border-gray-800 p-4 mt-4">
          {Object.entries(studentInfo).map(([key, value]) => (
            <p key={key} className="text-gray-700 font-medium">
              <span className="font-bold capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </span>{" "}
              {value}
            </p>
          ))}
        </div>

        <table className="w-full mt-4 border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-700 p-2 text-left">Subject</th>
              <th className="border border-gray-700 p-2">Marks Q1</th>
              <th className="border border-gray-700 p-2">Marks Q2</th>
              <th className="border border-gray-700 p-2">Marks Q3</th>
              <th className="border border-gray-700 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index} className="text-gray-800 bg-white">
                <td className="border border-gray-700 p-2">{subject.name}</td>

                {subject.marks.length > 0 ? (
                  subject.marks.map((mark, idx) => (
                    <td
                      key={idx}
                      className="border border-gray-700 p-2 text-center"
                    >
                      {mark || "-"}
                    </td>
                  ))
                ) : (
                  <td
                    colSpan={subject.marks.length}
                    className="border border-gray-700 p-2 text-center"
                  >
                    {"-"}
                  </td>
                )}

                {/* Display the pass/fail status */}
                <td className="border border-gray-700 p-2 text-center">
                  {getAttemptStatus(subject.marks)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid grid-cols-2 gap-2 border-2 border-gray-800 p-4 mt-4">
          <p className="text-gray-700 font-medium">Percentage: 90%</p>
          <p className="text-gray-700 font-medium">Status:Fail</p>
        </div>

        <footer className="text-center text-gray-700 mt-4">
          <p>www.yourwebsite.com</p>
          <p>391 Christopher St, New York</p>
          <p>(655) 334-9988</p>
        </footer>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadPDF}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Download PDF
      </button>
    </div>
  );
};

export default StudentReport;
