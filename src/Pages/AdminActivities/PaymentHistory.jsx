import React, { useEffect, useState } from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // or useHistory if using older React Router
import makeRequest from "../../axios";

const PaymentHistory = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("2025-05");

  const navigate = useNavigate(); // to go back

  useEffect(() => {
    const fetchPaymentData = async () => {
      setLoading(true);
      try {
        const response = await makeRequest.get(
          `/admin/get-payment-history-for-teachers?month=${selectedMonth}`
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
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
        >
          <IoArrowBack className="mr-1" />
          Back
        </button>

        <h1 className="text-2xl font-semibold text-gray-800 flex-1 text-center">
          Payment History
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

      {/* Payment Cards */}
      {!loading && !error && paymentData.length === 0 && (
        <p className="text-center text-gray-500">
          No payment records for this month.
        </p>
      )}

      {paymentData.map((item) => (
        <div key={item._id} className="bg-white shadow rounded-lg p-6 mb-4">
          <div className="flex items-center mb-4">
            <IoIosPerson className="text-blue-500 text-2xl mr-2" />
            <p className="text-gray-700 font-medium">User ID: {item.userId}</p>
          </div>

          <div className="flex items-center mb-2">
            <MdDateRange className="text-green-600 text-xl mr-2" />
            <p className="text-gray-600">
              Payment Date: {new Date(item.paymentDate).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center mb-2">
            <FaFileInvoiceDollar className="text-yellow-600 text-xl mr-2" />
            <p className="text-gray-600">Amount Paid: ₹{item.amount}</p>
          </div>

          <div className="mb-2 text-gray-600">
            Total Videos Uploaded: {item.totalVideosUploadedInMonth}
          </div>

          <div className="mb-2 text-gray-600">Remarks: {item.remarks}</div>

          <a
            href={`https://api.studypulse.live/${item.paySlipUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-blue-600 hover:underline"
          >
            View Payslip
          </a>
        </div>
      ))}
    </div>
  );
};

export default PaymentHistory;
