import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineSend } from "react-icons/ai";
import { toast } from "react-toastify";
import makeRequest from "../../axios";

const CreateTeacherPayment = () => {
  const teachers = useSelector((state) => state.teachers.teachersData || []);
  const [formData, setFormData] = useState({
    teacherId: "",
    month: "",
    amount: "",
    remarks: "",
    paySlipUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { teacherId, month, amount, remarks, paySlipUrl } = formData;

    if (!teacherId || !month || !amount || !remarks || !paySlipUrl) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await makeRequest.post("/admin/create-payment-for-teacher", {
        teacherId,
        month,
        amount: parseFloat(amount),
        remarks,
        paySlipUrl,
      });

      if (res.data.success) {
        toast.success("Payment created successfully!");
        setFormData({
          teacherId: "",
          month: "",
          amount: "",
          remarks: "",
          paySlipUrl: "",
        });
      } else {
        toast.error("Failed to create payment.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Create Teacher Payment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Teacher Select */}
        <div>
          <label className="block mb-1 font-medium">Select Teacher</label>
          <select
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Teacher --</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstName} {teacher.lastName} ({teacher.email})
              </option>
            ))}
          </select>
        </div>

        {/* Month Picker */}
        <div>
          <label className="block mb-1 font-medium">Select Month</label>
          <input
            type="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter amount (₹)"
          />
        </div>

        {/* Remarks */}
        <div>
          <label className="block mb-1 font-medium">Remarks</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. April Salary"
          />
        </div>

        {/* Payslip URL */}
        <div>
          <label className="block mb-1 font-medium">Payslip URL</label>
          <input
            type="text"
            name="paySlipUrl"
            value={formData.paySlipUrl}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. public/uploads/..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          <AiOutlineSend className="mr-2" />
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default CreateTeacherPayment;
