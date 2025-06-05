import React, { useEffect, useState } from 'react';

const TeacherSubjectLimits = () => {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjectData = async () => {
    setSubjects([
      {
        name: "Math",
        postedMonthly: 40,
        monthlyLimit: 100,
        todaysUploaded: 3,
        salaryPerVideo: 50,
      },
      {
        name: "Science",
        postedMonthly: 50,
        monthlyLimit: 80,
        todaysUploaded: 2,
        salaryPerVideo: 60,
      },
      {
        name: "English",
        postedMonthly: 25,
        monthlyLimit: 60,
        todaysUploaded: 1,
        salaryPerVideo: 55,
      },
    ]);
  };

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const totalMonthlySalary = subjects.reduce(
    (sum, subject) => sum + subject.postedMonthly * subject.salaryPerVideo,
    0
  );

  return (
    <div className="p-4 bg-white text-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3 bg-gradient-to-r from-red-500 to-red-300 text-white p-2 rounded text-center font-serif">
        Teacher's Upload Summary
      </h2>

      {subjects.length > 0 ? (
        <div className="flex flex-col gap-3">
          {subjects.map((subject, index) => {
            const monthlyRemaining = subject.monthlyLimit - subject.postedMonthly;
            const todaySalary = subject.todaysUploaded * subject.salaryPerVideo;
            const monthlySalary = subject.postedMonthly * subject.salaryPerVideo;

            return (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded border border-gray-200 text-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-base">{subject.name}</span>
                  <span className={monthlyRemaining <= 0 ? 'text-red-500' : 'text-green-500'}>
                    {monthlyRemaining <= 0 ? '⚠️ Limit Reached' : '✅'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <div>
                    <strong>Limit:</strong> {subject.monthlyLimit}
                  </div>
                  <div>
                    <strong>Posted:</strong> {subject.postedMonthly}
                  </div>
                  <div>
                    <strong>Remaining:</strong> {monthlyRemaining}
                  </div>
                  <div>
                    <strong>Per Video:</strong> ₹{subject.salaryPerVideo}
                  </div>
                  <div>
                    <strong>Today's Uploads:</strong> {subject.todaysUploaded}
                  </div>
                  <div>
                    <strong>Today's Salary:</strong> ₹{todaySalary}
                  </div>
                  <div>
                    <strong>Monthly Salary:</strong> ₹{monthlySalary}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading subjects...</p>
      )}

      {subjects.length > 0 && (
        <div className="mt-4 text-center bg-green-100 text-green-800 p-2 rounded text-base font-medium shadow-sm">
          Total Monthly Salary: ₹{totalMonthlySalary}
        </div>
      )}
    </div>
  );
};

export default TeacherSubjectLimits;
