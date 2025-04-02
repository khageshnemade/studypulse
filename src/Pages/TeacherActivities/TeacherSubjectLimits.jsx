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
    <div className="p-6 bg-white text-gray-800 rounded-xl shadow-lg">
    <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-red-500 to-red-300 text-white p-2 rounded-md shadow-md font-serif text-center">
      Teacher's Subject Upload Limits
    </h2>
    <div className="flex flex-col gap-6">
      {subjects.length > 0 ? (
        subjects.map((subject, index) => {
          const monthlyRemaining = subject.monthlyLimit - subject.postedMonthly;
  
          return (
            <div
              key={index}
              className="bg-gray-100 text-gray-800 p-6 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{subject.name}</h3>
                <div
                  className={`${
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
