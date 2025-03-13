import React, { useRef } from "react";
import { jsPDF } from "jspdf";

const StudentReport = () => {
    const reportRef = useRef();

    // Function to handle PDF generation
    const handleDownloadPDF = () => {
        const doc = new jsPDF({
            orientation: "portrait",  // Portrait or landscape orientation
            unit: "mm",  // Measurement unit (mm, cm, etc.)
            format: "a4",  // Page size (A4 is default but you can specify other sizes)
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
            windowWidth: 800,  // Adjust window width if the content is not showing fully
        });
    };

    const studentInfo = {
        name: "John Doe",
        grade: "10th",
        teacher: "Mrs. Smith",
        schoolYear: "2024-2025",
        term: "Fall",
        date: "March 13, 2025",
    };

    // Define passing grade (assuming passing grade is 50)
    const passingGrade = 50;

    // Changed "grades" to "marks" and added fail logic
    const subjects = [
        { name: "Literature", marks: [85, "_", "_"] },
        { name: "History", marks: [75, 48, 50] },
        { name: "Geography", marks: [60, 45, 70] },
        { name: "Algebra", marks: [55, 48, 30] },
        { name: "Social Science", marks: [70, 72, 74] },
        { name: "Chemistry", marks: [95, 40, 60] },
        { name: "Art", marks: [85, 87, 90] },
        { name: "Physical Education", marks: [50, 55, 60] },
        { name: "Entrepreneurship", marks: [40, 42, 45] },
    ];

    // Function to check if a student has passed each attempt and return the status
    const getAttemptStatus = (marks) => {
        const status = [];

        // First attempt check
        if (marks[0] >= passingGrade) {
            status.push("Attempt 1: Passed");
        } else {
            status.push("Attempt 1: Failed");
        }

        // Second attempt check - only if first attempt failed
        if (marks[0] < passingGrade && marks[1] >= passingGrade) {
            status.push("Attempt 2: Passed");
        } else if (marks[0] < passingGrade && marks[1] < passingGrade) {
            status.push("Attempt 2: Failed");
        }

        // Third attempt check - only if both first and second attempts failed
        if (marks[0] < passingGrade && marks[1] < passingGrade && marks[2] >= passingGrade) {
            status.push("Attempt 3: Passed");
        } else if (marks[0] < passingGrade && marks[1] < passingGrade && marks[2] < passingGrade) {
            status.push("Attempt 3: Failed");
        }

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
                            <th className="border border-gray-700 p-2 text-left">
                                Subject
                            </th>
                            <th className="border border-gray-700 p-2">Marks Q1</th>
                            <th className="border border-gray-700 p-2">Marks Q2</th>
                            <th className="border border-gray-700 p-2">Marks Q3</th>
                            <th className="border border-gray-700 p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject, index) => (
                            <tr key={index} className="text-gray-800 bg-white">
                                <td className="border border-gray-700 p-2">
                                    {subject.name}
                                </td>

                                {subject.marks.map((mark, idx) => (
                                    <td
                                        key={idx}
                                        className="border border-gray-700 p-2 text-center"
                                    >
                                        {mark}
                                    </td>
                                ))}

                                {/* Display the pass/fail status */}
                                <td className="border border-gray-700 p-2 text-center">
                                    {getAttemptStatus(subject.marks)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="grid grid-cols-2 gap-2 border-2 border-gray-800 p-4 mt-4">
                    <p className="text-gray-700 font-medium">Absences:</p>
                    <p className="text-gray-700 font-medium">Tardies:</p>
                    <p className="text-gray-700 font-medium">Early Dismissals:</p>
                    <p className="text-gray-700 font-medium">Penalties:</p>
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
