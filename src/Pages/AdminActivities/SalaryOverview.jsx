import React, { useEffect, useState } from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { MdPhone, MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import makeRequest from "../../axios";

const SalaryOverview = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("2025-05");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentData = async () => {
      setLoading(true);
      try {
        const response = await makeRequest.get(
          `/admin/get-salary-overview-for-teachers?month=${selectedMonth}`
        );
        if (response.data.success) {
          setPaymentData(response.data.data);
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

      {/* Payment Cards */}
      {paymentData.map((item) => (
        <div key={item.id} className="bg-white shadow rounded-lg p-6 mb-4">
          <div className="flex items-center mb-4">
            <IoIosPerson className="text-blue-500 text-2xl mr-2" />
            <p className="text-gray-700 font-medium">
              {item.firstName} {item.lastName}
            </p>
          </div>

          <div className="flex items-center mb-2">
            <MdEmail className="text-gray-600 text-xl mr-2" />
            <p className="text-gray-600">Email: {item.email}</p>
          </div>

          <div className="flex items-center mb-2">
            <MdPhone className="text-gray-600 text-xl mr-2" />
            <p className="text-gray-600">Phone: {item.phoneNumber}</p>
          </div>

          <div className="mb-2 text-gray-600">
            Total Videos Uploaded: {item.totalUploads}
          </div>

          <div className="flex items-center mb-2">
            <FaFileInvoiceDollar className="text-yellow-600 text-xl mr-2" />
            <p className="text-gray-600">Monthly Salary: ₹{item.monthlySalary}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalaryOverview;
