import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineSend, AiOutlineUpload } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import makeRequest from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const CreateTeacherPayment = () => {
  const teachers = useSelector((state) => state.teachers.teachersData || []);
  const location = useLocation();
  const { teacher_id, salary, cmonth } = location.state || {};
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teacherId: "",
    month: "",
    amount: "",
    remarks: "",
    paySlipUrl: "",
  });

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPreview, setUploadPreview] = useState("");


  useEffect(() => {
    if (teacher_id || salary || cmonth) {
      setFormData((prev) => ({
        ...prev,
        teacherId: teacher_id || "",
        amount: salary || "",
        month: cmonth || "",
      }));
    }
  }, [teacher_id, salary, cmonth, location.state]);
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await makeRequest.post(
        "file-upload/payment_pic",
        formData
      );
      if (response.data.success) {
        const uploadedUrl = response.data.url;
        setFormData((prev) => ({ ...prev, paySlipUrl: uploadedUrl }));
        toast.success("File uploaded successfully!");
      } else {
        toast.error("Upload failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { teacherId, month, amount, remarks, paySlipUrl } = formData;

    if (!teacherId || !month || !amount || !remarks || !paySlipUrl) {
      toast.error("Please fill all fields and upload the payslip.");
      return;
    }

    try {
      const res = await makeRequest.post("/admin/create-payment-for-teacher", {
        userId:teacherId,
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
        setFile(null);
        setUploadPreview("");
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        toast.error("Failed to create payment.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <IoArrowBack className="mr-2" size={20} />
          Back
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-center">
        Create Teacher Payment
      </h2>
      <ToastContainer />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Teacher Select */}
        <div>
          <label className="block mb-1 font-medium">Select Teacher</label>
          <select
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            disabled
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
            disabled
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
            disabled
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

        {/* File Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Payslip</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {uploadPreview && (
            <div className="mt-2">
              <img
                src={uploadPreview}
                alt="Payslip Preview"
                className="w-32 h-auto rounded border"
              />
            </div>
          )}
          <button
            type="button"
            onClick={handleFileUpload}
            disabled={isUploading}
            className="mt-2 flex items-center bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700"
          >
            <AiOutlineUpload className="mr-2" />
            {isUploading ? "Uploading..." : "Upload File"}
          </button>
        </div>

        {/* Payslip URL (read-only after upload) */}
        <div>
          <label className="block mb-1 font-medium">Payslip URL</label>
          <input
            type="text"
            name="paySlipUrl"
            value={formData.paySlipUrl}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
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
