import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setRole } from "../../redux/features/roleSlice";
// import { setStudentId } from "../../redux/features/studentIdSlice";
// import { setStudentName } from "../../redux/features/studentNameSlice";
import { setOrgId } from "../../redux/features/orgSlice";
const apiUrl = import.meta.env.VITE_APP_API_URL;

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [role, setRoleToggle] = useState("Student"); // Default to Student login

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      toast.error("Please verify CAPTCHA");
      return;
    }
  
    setLoading(true);
  
    try {
      console.log(`API${apiUrl}`);
      const response = await axios.post(`${apiUrl}/login/`, formData);
  
      if (response.status === 200 || response.status === 201) {
        const studentId = response?.data?.student_id;
        const userRole = response?.data?.data?.role; // 'Student' or 'Admin'
        const userName = `${response?.data?.data?.firstName} ${response?.data?.data?.lastName}`;
        const token = response?.data?.token;
        const organizationID = response?.data?.data?.organizationID || "defaultOrgID"; // Fallback value
        const profileCompletion=response?.data.data.profileCompletion
      
        console.log("Response Data:", response.data);

      
        dispatch(setRole(userRole));
    

        // Store user details in local storage
        localStorage.setItem(
          "user",
          JSON.stringify({
            user: formData.email,
            role: userRole,
            token,
            userName,
            organizationID,
            profileCompletion // Save organizationID
          })
        );
      
        console.log("Stored Organization ID:", profileCompletion);

        // toast.success("Login successful!");
        toast.success(response?.data?.message);

        setTimeout(() => {
          if (userRole === "admin") {
            console.log("hello admin", response?.data?.data?.organizationID);
            const orgId = response?.data?.data?.organizationID;
            
            dispatch(setOrgId(orgId));
            navigate("/admin-dashboard");
          } else if (userRole === "teacher") {
            navigate("/teacher-dashboard");
          } else if (userRole === "superAdmin") {
            navigate("/superadmin-dashboard");
          } else if (userRole === "student") {
            navigate("/dashboard");
          }
        }, 500);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response.data.message);
      toast.error(`Error: ${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex justify-center mb-4">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mt-4">
          Login
        </h2>
      </div>

      <form
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <input
            type="text"
            name="email"
            placeholder={
               " Username "
            }
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={
              "Password"
            }
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-xl"
          >
            {showPassword ? "🔓" : " 🔒"}
          </span>
        </div>

        <div className="mb-4">
          <ReCAPTCHA
            sitekey="6Lf3dTUqAAAAALp5SMv55nhNfdVb7Pkwk_O7w45i"
            onChange={handleCaptchaChange}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center w-full">
            <ClipLoader color="#007bff" loading={loading} size={50} />
          </div>
        ) : (
          <div className="mb-6 ">
            <input
              type="submit"
              value="Log In"
              disabled={!captchaVerified}
              className="w-full hover:bg-[#D9EAFD] text-white rounded-md bg-[#2563EB] cursor-pointer disabled:bg-gray-300"
            />
          </div>
        )}

        <div className="text-center">
          Don’t Have an Account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default LoginForm;
