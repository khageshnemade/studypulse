import React, { useEffect, useState } from 'react';

const TeacherSubjectLimits = () => {
  const [subjects, setSubjects] = useState([]);

  // Simulate an API call to fetch the data
  const fetchSubjectData = async () => {
    setSubjects([
      {
        name: "Math",
        postedMonthly: 40,
        monthlyLimit: 100,
      },
      {
        name: "Science",
        postedMonthly: 50,
        monthlyLimit: 80,
      },
      {
        name: "English",
        postedMonthly: 25,
        monthlyLimit: 60,
      },
    ]);
  };

  useEffect(() => {
    fetchSubjectData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white text-gray-800 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Teacher's Subject Upload Limits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.length > 0 ? (
          subjects.map((subject, index) => {
            const monthlyRemaining = subject.monthlyLimit - subject.postedMonthly;

            return (
              <div
                key={index}
                className="bg-gray-100 text-gray-800 p-6 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{subject.name}</h3>
                  <div
                    className={`text-xl ${
                      monthlyRemaining <= 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {monthlyRemaining <= 0 ? '⚠️' : '✅'}
                  </div>
                </div>

                {/* Monthly Limits */}
                <div>
                  <p>
                    <strong className="font-semibold">Monthly Upload Limit:</strong> {subject.monthlyLimit} videos
                  </p>
                  <p>
                    <strong className="font-semibold">Posted This Month:</strong> {subject.postedMonthly || 0} videos
                  </p>
                  <p>
                    <strong className="font-semibold">Remaining This Month:</strong> {monthlyRemaining} videos
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">Loading subjects...</p>
        )}
      </div>
    </div>
  );
};

export default TeacherSubjectLimits;
