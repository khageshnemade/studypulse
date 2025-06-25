import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import makeRequest from "../../axios";

const PaymentHistory = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("2025-05");

  const location = useLocation();
  const { teacher_id: teacherIdFromState, teacher } = location.state || {};
  const navigate = useNavigate();

  const filteredData = paymentData.filter(
    (item) => item.userId === teacherIdFromState
  );

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
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded transition"
        >
          <IoArrowBack className="mr-2" />
          Back
        </button>

        <h1 className="text-xl font-semibold text-gray-800 text-center flex-1">
          Payment History
        </h1>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 px-3 py-2 text-sm rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <>
          {filteredData.length === 0 ? (
            <p className="text-center text-gray-500">
              No payment records found for this month.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left whitespace-nowrap">Name</th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">Payment Date</th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">Amount Paid</th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">Videos Uploaded</th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">Remarks</th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">Payslip</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredData.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap">
                        {teacher?.firstName} {teacher?.lastName}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {new Date(item.paymentDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        ₹{Number(item.amount).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {item.totalVideosUploadedInMonth}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {item.remarks || "—"}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <a
                          href={`https://api.studypulse.live/${item.paySlipUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
