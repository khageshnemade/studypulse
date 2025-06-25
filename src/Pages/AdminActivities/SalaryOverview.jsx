import React, { useEffect, useState } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import makeRequest from "../../axios";
import { ToastContainer } from "react-toastify";

const SalaryOverview = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const location = useLocation();
  const teacherId = location.state.teacher_id;
  const navigate = useNavigate();
  const teacherData = paymentData?.filter((item) => item.userId === teacherId);

  useEffect(() => {
    const fetchPaymentData = async () => {
      setLoading(true);
      try {
        const response = await makeRequest.get(
          `/admin/get-salary-overview-for-teacher-by-id?month=${selectedMonth}&userId=${teacherId}`
        );
        if (response.data.success) {
          setPaymentData(response?.data?.data);
        } else {
          setError("Failed to fetch data.");
        }
      } catch (err) {
        setError("An error occurred while fetching payment history.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [selectedMonth, teacherId]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
        >
          <IoArrowBack className="mr-1" />
          Back
        </button>

        <h1 className="text-2xl font-semibold text-gray-800 text-center flex-1">
          Salary Overview
        </h1>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-2 rounded text-gray-700"
        />
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Empty state */}
      {!loading && !error && paymentData?.length === 0 && (
        <p className="text-center text-gray-500">
          No payment records for this month.
        </p>
      )}

      {/* Table */}
      {!loading && !error && paymentData?.length > 0 && (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left text-gray-600 uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 whitespace-nowrap">Name</th>
                <th className="py-3 px-4 whitespace-nowrap">Email</th>
                <th className="py-3 px-4 whitespace-nowrap">Phone</th>
                <th className="py-3 px-4 text-center whitespace-nowrap">Videos</th>
                <th className="py-3 px-4 whitespace-nowrap">Earnings</th>
                <th className="py-3 px-4 whitespace-nowrap">Make Payment</th>
                </tr>
            </thead>
            <tbody>
              {teacherData.map((item) => (
                <tr key={item.userId} className="hover:bg-blue-50 transition-colors">
                  <td className="py-3 px-4 border-b truncate max-w-[180px] whitespace-nowrap">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="py-3 px-4 border-b truncate max-w-[220px] whitespace-nowrap">
                    {item.email}
                  </td>
                  <td className="py-3 px-4 border-b whitespace-nowrap">
                    {item.phoneNumber}
                  </td>
                  <td className="py-3 px-4 border-b text-center whitespace-nowrap">
                    {item.totalVideos}
                  </td>
                  <td className="py-3 px-4 border-b whitespace-nowrap">
                    ₹{Number(item.totalEarnings).toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-4 border-b whitespace-nowrap">
                    <button onClick={() => {
                      navigate("/admin-dashboard/createpayment", {
                        state: {
                          teacher_id: item.userId,
                          salary: item.totalEarnings,
                          cmonth: selectedMonth,
                        },
                      });
                    }} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Pay
                    </button>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}
      <ToastContainer />
    </div>
  );
};

export default SalaryOverview;
