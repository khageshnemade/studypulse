import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const TeacherSubjectLimits = () => {
  const teacherData = useSelector((state) => state.currentTeacher.currentTeacher);

  // Get today's uploaded count from video upload history
  const getTodaysUploaded = (history) => {
    const today = dayjs().format('YYYY-MM-DD');
    const todayEntry = history.find((entry) => entry.date === today);
    return todayEntry?.videosUploaded || 0;
  };

  // Calculate per-subject stats
  const subjects = (teacherData?.subjects || []).map((subject) => {
    const subjectLimit = teacherData.subjectLimits?.[subject._id];

    if (!subjectLimit) return null;

    const {
      minDailyVideoLimit = 0,
      perVideoPrice = 0,
      salaryPerVideo = perVideoPrice,
      videosUploadedHistory = []
    } = subjectLimit;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const monthlyVideosUploaded = videosUploadedHistory.reduce((total, entry) => {
      const entryDate = new Date(entry.date);
      if (entryDate.getMonth() === month && entryDate.getFullYear() === year) {
        return total + entry.videosUploaded;
      }
      return total;
    }, 0);
    const todaysUploaded = getTodaysUploaded(videosUploadedHistory);
    const dailyRemaining = Math.max(0, minDailyVideoLimit - todaysUploaded);



    const totalDays = new Date(year, month + 1, 0).getDate();

    // Count working (non-Sunday) days in the current month
    let workingDays = 0;
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() !== 0) {
        workingDays++;
      }
    }

    const monthlyRemaining = Math.max(0, (workingDays * minDailyVideoLimit) - monthlyVideosUploaded);
    const todaySalary = todaysUploaded * salaryPerVideo;
    const monthlySalary = monthlyVideosUploaded * perVideoPrice;

    return {
      ...subject,
      minDailyVideoLimit,
      monthlyVideosUploaded,
      perVideoPrice,
      salaryPerVideo,
      todaysUploaded,
      dailyRemaining,
      monthlyRemaining,
      todaySalary,
      monthlySalary
    };
  }).filter(Boolean);
  const totalMonthlySalary = subjects.reduce((sum, subject) => sum + subject.monthlySalary, 0);

  return (
    <div className="p-4 bg-white text-gray-800 rounded-lg shadow w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 bg-gradient-to-r from-red-500 to-red-300 text-white p-2 rounded text-center font-serif">
        Teacher's Upload Summary
      </h2>

      {subjects.length > 0 ? (
        <div className="flex flex-col gap-4">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-sm rounded-md p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-3 gap-3 flex-wrap sm:flex-nowrap">
                <div className="flex gap-3 items-center">
                  <div>
                    <h3 className="text-base font-semibold capitalize">{subject.name}</h3>
                    {subject.className && (
                      <p className="text-xs text-gray-500">Class: {subject.className}</p>
                    )}
                  </div>
                </div>
                <span
                  className={`text-sm font-medium ${subject.monthlyRemaining <= 0 ? 'text-red-500' : 'text-green-600'}`}
                >
                  {subject.monthlyRemaining <= 0 ? '⚠️ Limit Reached' : '✅ On Track'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div><strong>Daily Posted:</strong> {subject.todaysUploaded}</div>
                <div><strong>Monthly Posted:</strong> {subject.monthlyVideosUploaded}</div>
                <div><strong>Daily Remaining:</strong> {subject.dailyRemaining}</div>
                <div><strong>Monthly Remaining:</strong> {subject.monthlyRemaining}</div>
                <div><strong>Daily Limit:</strong> {subject.minDailyVideoLimit}</div>
                <div><strong>Monthly Limit:</strong> {subject.monthlyRemaining + subject.monthlyVideosUploaded}</div>
                <div><strong>Today's Salary:</strong> ₹{subject.todaySalary}</div>
                <div>  <strong>Monthly Salary:</strong> ₹{subject.monthlySalary}</div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No subject data found.</p>
      )}

      {subjects.length > 0 && (
        <div className="mt-6 text-center bg-green-100 text-green-800 p-3 rounded-md text-sm sm:text-base font-semibold shadow">
          Total Monthly Salary: ₹{totalMonthlySalary.toLocaleString('en-IN')}
        </div>
      )}
    </div>
  );
};

export default TeacherSubjectLimits;
