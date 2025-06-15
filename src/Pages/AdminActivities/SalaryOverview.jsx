import React, { useEffect, useState } from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { MdPhone, MdEmail } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import makeRequest from "../../axios";

const SalaryOverview = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const location = useLocation();
  const teacherId = location.state.teacher_id;
  const navigate = useNavigate();
  const teacherData = paymentData.filter((item) => item.id === teacherId);
  useEffect(() => {
    const fetchPaymentData = async () => {
      setLoading(true);
      try {
        const response = await makeRequest.get(
          `/admin/get-salary-overview-for-teachers?month=${selectedMonth}&userId=${teacherId}`
        );
        if (response.data.success) {
          setPaymentData(response.data.data);
          console.log(response.data.data);
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
  }, [selectedMonth]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
        >
          <IoArrowBack className="mr-1" />
          Back
        </button>

        <h1 className="text-2xl font-semibold text-gray-800 flex-1 text-center">
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
      {!loading && !error && paymentData.length === 0 && (
        <p className="text-center text-gray-500">
          No payment records for this month.
        </p>
      )}

      {/* Table Structure */}
      {!loading && !error && paymentData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Phone</th>
                <th className="py-3 px-4 border-b">Total Uploads</th>
                <th className="py-3 px-4 border-b">Monthly Salary (₹)</th>
              </tr>
            </thead>
            <tbody>
              {teacherData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="py-3 px-4 border-b">{item.email}</td>
                  <td className="py-3 px-4 border-b">{item.phoneNumber}</td>
                  <td className="py-3 px-4 border-b text-center">
                    {item.totalUploads}
                  </td>
                  <td className="py-3 px-4 border-b">₹{item.monthlySalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalaryOverview;
