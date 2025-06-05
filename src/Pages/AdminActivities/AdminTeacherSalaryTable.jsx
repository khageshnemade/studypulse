import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const AdminTeacherSalaryTable = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = () => {
    setTeachers([
      {
        name: "Teacher A",
        subjects: [
          {
            name: "Math",
            salaryPerVideo: 50,
            monthlyData: {
              "2025-06": { posted: 40, todaysUploaded: 3 },
              "2025-05": { posted: 30, todaysUploaded: 2 },
            }
          },
          {
            name: "Science",
            salaryPerVideo: 60,
            monthlyData: {
              "2025-06": { posted: 20, todaysUploaded: 1 },
              "2025-05": { posted: 25, todaysUploaded: 0 },
            }
          },
        ]
      },
      {
        name: "Teacher B",
        subjects: [
          {
            name: "English",
            salaryPerVideo: 55,
            monthlyData: {
              "2025-06": { posted: 25, todaysUploaded: 2 },
              "2025-05": { posted: 18, todaysUploaded: 1 },
            }
          }
        ]
      },
    ]);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const months = ["2025-06", "2025-05", "2025-04"];

  const getMonthlySalary = (teacher) => {
    return teacher.subjects.reduce((sum, subj) => {
      const data = subj.monthlyData[selectedMonth];
      return sum + (data?.posted || 0) * subj.salaryPerVideo;
    }, 0);
  };

  const getMonthlyUploads = (teacher) => {
    return teacher.subjects.reduce((sum, subj) => {
      const data = subj.monthlyData[selectedMonth];
      return sum + (data?.posted || 0);
    }, 0);
  };

  const totalOverallSalary = teachers.reduce((sum, t) => sum + getMonthlySalary(t), 0);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Admin – Teacher Salary Overview</h2>
        <select
          className="border px-2 py-1 rounded text-sm"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {dayjs(month).format('MMMM YYYY')}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Teacher</th>
            <th className="p-2 border text-center">Total Uploads</th>
            <th className="p-2 border text-center">Monthly Salary (₹)</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-2 border">{teacher.name}</td>
              <td className="p-2 border text-center">{getMonthlyUploads(teacher)}</td>
              <td className="p-2 border text-center">₹{getMonthlySalary(teacher)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-green-100 font-semibold">
            <td className="p-2 border text-right" colSpan={2}>Total Salary:</td>
            <td className="p-2 border text-center">₹{totalOverallSalary}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AdminTeacherSalaryTable;
