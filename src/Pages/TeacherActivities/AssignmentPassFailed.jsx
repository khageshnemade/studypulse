import React, { useState } from 'react';

const studentsData = [
  {
    id: 1,
    name: "John Doe",
    class: "10th Grade",
    subject: "Math",
    chapter: "Algebra",
    assignment: {
      assignmentId: 101,
      title: "Algebra Assignment 1",
      attempts: [
        { attemptNumber: 1, status: "Failed" },
        { attemptNumber: 2, status: "Passed" },
      ],
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    class: "10th Grade",
    subject: "Math",
    chapter: "Geometry",
    assignment: {
      assignmentId: 102,
      title: "Geometry Assignment 1",
      attempts: [
        { attemptNumber: 1, status: "Passed" },
      ],
    },
  },
  {
    id: 3,
    name: "Michael Brown",
    class: "12th Grade",
    subject: "Physics",
    chapter: "Motion",
    assignment: {
      assignmentId: 103,
      title: "Motion Assignment 1",
      attempts: [
        { attemptNumber: 1, status: "Failed" },
        { attemptNumber: 2, status: "Failed" },
        { attemptNumber: 3, status: "Passed" },
      ],
    },
  },
  {
    id: 4,
    name: "Emma Wilson",
    class: "11th Grade",
    subject: "Chemistry",
    chapter: "Organic Chemistry",
    assignment: {
      assignmentId: 104,
      title: "Organic Chemistry Assignment 1",
      attempts: [
        { attemptNumber: 1, status: "Passed" },
      ],
    },
  },
  {
    id: 5,
    name: "Oliver Johnson",
    class: "12th Grade",
    subject: "Biology",
    chapter: "Genetics",
    assignment: {
      assignmentId: 105,
      title: "Genetics Assignment 1",
      attempts: [
        { attemptNumber: 1, status: "Passed" },
      ],
    },
  },
  {
    id: 6,
    name: "Sophia Lee",
    class: "10th Grade",
    subject: "English",
    chapter: "Literature",
    assignment: {
      assignmentId: 106,
      title: "Literature Assignment 1",
      attempts: [
        { attemptNumber: 1, status: "Passed" },
      ],
    },
  },
  {
    id: 7,
    name: "Liam Martinez",
    class: "11th Grade",
    subject: "Math",
    chapter: "Calculus",
    assignment: {
      assignmentId: 107,
      title: "Calculus Assignment 1",
      attempts: [
        { attemptNumber: 1, status: "Passed" },
      ],
    },
  },
];

export default function AssignmentPassFailed() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState('');

  const classes = [...new Set(studentsData.map((student) => student.class))];
  const subjects = [...new Set(studentsData.map((student) => student.subject))];
  const chapters = [...new Set(studentsData.map((student) => student.chapter))];
  const assignments = [
    ...new Set(studentsData.map((student) => student.assignment.title)),
  ];

  const filteredStudents = studentsData.filter((student) => {
    return (
      (selectedClass === '' || student.class === selectedClass) &&
      (selectedSubject === '' || student.subject === selectedSubject) &&
      (selectedChapter === '' || student.chapter === selectedChapter) &&
      (selectedAssignment === '' || student.assignment.title === selectedAssignment)
    );
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Assignment Pass/Fail Report</h2>
      
      {/* Filters Section */}
      <div className="flex gap-6 mb-8 justify-center flex-wrap">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="p-3 rounded-lg border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Class</option>
          {classes.map((cls, index) => (
            <option key={index} value={cls}>{cls}</option>
          ))}
        </select>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-3 rounded-lg border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>

        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          className="p-3 rounded-lg border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Chapter</option>
          {chapters.map((chapter, index) => (
            <option key={index} value={chapter}>{chapter}</option>
          ))}
        </select>

        <select
          value={selectedAssignment}
          onChange={(e) => setSelectedAssignment(e.target.value)}
          className="p-3 rounded-lg border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Assignment</option>
          {assignments.map((assignment, index) => (
            <option key={index} value={assignment}>{assignment}</option>
          ))}
        </select>
      </div>

      {/* Students Report Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 duration-300"
          >
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-indigo-700">{student.name}</h3>
              <p className="text-gray-600">{student.class} | {student.subject}</p>
              <p className="text-gray-800"><strong>Chapter:</strong> {student.chapter}</p>
              <p className="text-gray-800"><strong>Assignment:</strong> {student.assignment.title}</p>

              <div className="mt-3">
                <strong className="text-gray-800">Attempts:</strong>
                {student.assignment.attempts.map((attempt, index) => (
                  <div
                    key={index}
                    className={`text-sm ${attempt.status === 'Passed' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    <span className={`mr-2 ${attempt.status === 'Passed' ? 'text-green-600' : 'text-red-600'}`}>
                      {attempt.status === 'Passed' ? '✅' : '❌'}
                    </span>
                    Attempt {attempt.attemptNumber}: {attempt.status}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
