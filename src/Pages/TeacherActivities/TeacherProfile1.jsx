import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, User } from "lucide-react";

const TeacherProfile = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [s_c, setS_c] = useState({});
  const [file, setFile] = useState(null);

  const [classIds, setClassIds] = useState([]); // Array to hold class IDs
  const [subjectIds, setSubjectIds] = useState([]); // Array to hold subject IDs
  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    gender: "",
    address: "",
    pincode: "",
    dob: "",
    totalYearsOfExperience: "",
    classes: [],
    qualification: {},
    experience: [],
    subjects: [],
    joiningDate: new Date(),
  });
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const userData = localStorage.getItem("user");
      const parsedData = JSON.parse(userData);
      const res = await makeRequest.get(
        `/get-classes-by-org-id?organizationId=${parsedData?.organizationID}`
      );
      setClasses(res?.data?.data);
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };
  const fetchSubjectsByClassId = async (Id) => {
    try {
      console.log("Fetching Subject", Id);
      const res = await makeRequest.get(
        `/get-subjects-by-class-id?classId=${Id}`
      );
      setSubjects(res?.data?.data);
      console.log("Subjects Data:", res?.data?.data);
    } catch (error) {
      console.error("Request Error:", error.message);
    }
  };

  useEffect(() => {
    // Fetch previous data from the API when the component is mounted
    getPreviousData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (section, key, nestedKey, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [key]: { ...formData[section][key], [nestedKey]: value },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const modifiedFormData = {
        ...formData,
        classId: classIds,
        subjectId: subjectIds,
        profilePic: imageUrl,
        experience: formData.experience.map((exp) => {
          // Create a new object without the _id field
          const { _id, ...expWithoutId } = exp;
          return {
            ...expWithoutId,
            yearsOfExperience:
              exp.startDate && exp.endDate
                ? calculateYearsOfExperience(exp.startDate, exp.endDate)
                : 0, // Default to 0 if dates are invalid
          };
        }),
      };

      delete modifiedFormData.classes;
      delete modifiedFormData.subjects;

      // Send the modified formData to the API
      const res = await makeRequest.post(
        "/teacher/complete-profile",
        modifiedFormData
      );
      console.log("Form submitted successfully:", res.data);
      if (res.status === 200 || res.status === 201) {
        toast.success("Profile completed successfully");
        localStorage.clear();
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleRemoveFromClassAndSubjects = (classId, subjectIndex) => {
    // Remove the subjectId from the selected classId
    setS_c((prev) => {
      const updatedState = { ...prev };

      // Remove the subjectId from the array of subjects for the given classId
      const updatedSubjects = updatedState[classId].filter(
        (_, index) => index !== subjectIndex
      );

      if (updatedSubjects.length > 0) {
        updatedState[classId] = updatedSubjects;
      } else {
        delete updatedState[classId]; // If no subjects left, remove the classId entirely
      }

      return updatedState;
    });

    // Now, update classIds and subjectIds
    setClassIds(Object.keys(s_c)); // Get class IDs
    setSubjectIds(Object.values(s_c).flat()); // Flatten and get all subject IDs
  };

  const handleC_SSubmit = async () => {
    console.log("Classes and Subjects", selectedClassId, selectedSubjectId);

    const selectedSubject = subjects.find(
      (subj) => subj._id === selectedSubjectId
    );

    if (!selectedSubject) {
      console.warn("Subject not found in subjects list");
      return;
    }

    // Update state with full subject objects
    setS_c((prev) => {
      const existingSubjects = prev[selectedClassId] || [];

      // Avoid duplicates by ID
      const isAlreadyAdded = existingSubjects.some(
        (s) => s._id === selectedSubject._id
      );
      const newSubjects = isAlreadyAdded
        ? existingSubjects
        : [...existingSubjects, selectedSubject];

      const updatedState = {
        ...prev,
        [selectedClassId]: newSubjects,
      };

      // Optional: maintain classIds and subjectIds separately if needed
      setClassIds(Object.keys(updatedState));
      setSubjectIds(
        Object.values(updatedState)
          .flat()
          .map((s) => s._id)
      );

      return updatedState;
    });
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await makeRequest.post(
        "file-upload/profile-pic",
        formData
      );

      if (response.data.success) {
        setImageUrl(response.data.url); // Store the uploaded image URL
        console.log("Image Updated Successfully", response.data.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to upload image.");
    }
  };

  const getPreviousData = async () => {
    try {
      const res = await makeRequest.get("/teacher/get-data");
      setFormData((prevData) => ({
        ...prevData,
        gender: res?.data?.data?.gender || "",
        address: res?.data?.data?.address || "",
        pincode: res?.data?.data?.pincode || "",
        dob: res?.data?.data?.dob || "",
        classes: res?.data?.data?.classes || [],
        subjects: res?.data?.data?.subjects || [],
        qualification: res?.data?.data?.qualification || {
          HSC: {
            fieldOfStudy: "",
            yearOfCompletion: "",
            percentage: "",
            schoolName: "",
          },
          SSC: {
            fieldOfStudy: "",
            yearOfCompletion: "",
            percentage: "",
            schoolName: "",
          },
          graduation: {
            degree: "",
            yearOfCompletion: "",
            university: "",
            percentage: "",
          },
          postGraduation: {
            fieldOfStudy: "",
            yearOfCompletion: "",
            university: "",
            percentage: "",
            degree: "",
          },
        },
        experience: res?.data?.data?.experience || [
          {
            yearsOfExperience: "",
            startDate: "",
            endDate: "",
            designation: "",
            organizationName: "",
          },
        ],
        totalYearsOfExperience: res?.data?.data?.totalYearsOfExperience || "",
        joiningDate:
          (res?.data?.data?.joiningDate &&
            new Date(res?.data?.data?.joiningDate)) ||
          new Date(),
      }));
      console.log("Previous Data:", res?.data?.data);
    } catch (error) {
      console.error("Error fetching Teacher data:", error.message);
    }
  };

  const calculateYearsOfExperience = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (!isNaN(start) && !isNaN(end)) {
      const diffInTime = end.getTime() - start.getTime();
      const diffInYears = diffInTime / (1000 * 60 * 60 * 24 * 365.25); // Convert milliseconds to years
      return Math.max(diffInYears.toFixed(1), 0); // Ensure no negative years
    }
    return "N/A";
  };

  const handleExperienceChange = (index, key, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][key] = value;
    setFormData((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const handleAddExperience = () => {
    const newExperience = {
      startDate: "",
      endDate: "",
      designation: "",
      organizationName: "",
    };
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  };

  return (
    <div>
      <p className="text-center text sm:text-xl md:text-2xl font-serif p-2 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto m-3 drop-shadow-lg border-[1.5px] border-blue-800">
        <User className="text sm:text-xl md:text-2xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce text-blue-600" />
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Teacher Complete Profile
        </span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md"
      >
        {/* Basic Info */}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pincode</label>
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="overflow-hidden">
            <label
              className="block text-sm font-medium mb-1 whitespace-nowrap"
              htmlFor="fil"
            >
              Profile Picture
            </label>
            <input
              id="fil"
              className="w-full px-3 py-2 border rounded-lg"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setTimeout(() => {
                  handleFileUpload(e.target.files[0]);
                }, 0);
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Date Of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={
                formData.dob
                  ? new Date(formData.dob).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Joining Date
            </label>
            <input
              type="date"
              name="joiningDate"
              value={
                formData.joiningDate
                  ? new Date(formData.joiningDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleInputChange} // Ensure the handleInputChange function is set to manage formData
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
        {/* Qualifications */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Qualifications</h3>
          {Object.entries(formData?.qualification || {}).map(([key, value]) => (
            <div key={key} className="mb-4">
              <h4 className="font-medium capitalize">{key}</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(value).map(([fieldKey, fieldValue]) => (
                  <div key={fieldKey}>
                    <label className="block text-sm font-medium mb-1 capitalize">
                      {fieldKey}
                    </label>
                    <input
                      type="text"
                      value={fieldValue || ""}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "qualification",
                          key,
                          fieldKey,
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Experience */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          <div>
            <label className="block text-sm font-medium mb-1">
              Total Experience
            </label>
            <input
              type="text"
              name="totalYearsOfExperience"
              value={formData.totalYearsOfExperience}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg mb-2"
            />
          </div>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-medium">Experience {index + 1}</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(exp)
                  .filter(([key]) => key !== "_id") // Exclude `_id`
                  .map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-1 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <input
                        type={key.includes("Date") ? "date" : "text"}
                        value={
                          key.includes("Date") && value
                            ? new Date(value).toISOString().split("T")[0]
                            : value
                        }
                        onChange={(e) =>
                          handleExperienceChange(index, key, e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  ))}
                {/* Calculated Years of Experience */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    value={
                      exp.startDate && exp.endDate
                        ? calculateYearsOfExperience(exp.startDate, exp.endDate)
                        : "N/A"
                    }
                    disabled
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>
          ))}
          {/* Add Experience Button */}
          <button
            onClick={handleAddExperience}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Experience
          </button>
        </div>

        {/* Classes and Subjects */}
        <div className="m-3">
          {/* Select Class */}
          <div className="m-2">
            <select
              value={selectedClassId}
              onChange={(e) => {
                const selectedClass = e.target.value;
                setSelectedClassId(selectedClass);
                fetchSubjectsByClassId(selectedClass); // Fetch subjects when class changes
              }}
              name="classes"
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Class</option>
              {classes.map((classItem) => (
                <option key={classItem._id} value={classItem._id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Subject */}
          <div className="m-2">
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)} // Update selected subject id
              name="subjects"
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select Subject</option>
              {subjects.map((subjectItem) => (
                <option key={subjectItem._id} value={subjectItem._id}>
                  {subjectItem.name}
                </option>
              ))}
            </select>
          </div>

          {/* Add Button */}
          <div>
            <button
              type="button" // Ensure it's not a submit button
              onClick={handleC_SSubmit}
              className="btn btn-info m-2"
            >
              Add
            </button>
          </div>

          {/* Display Classes and Subjects */}
          <div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(s_c).map(([classId, subjects]) => {
                const className = classes.find(cls => String(cls._id) === String(classId))?.name || "Unknown Class";

                return (
                  <div key={classId}>
                    <h4>Class: {className}</h4>
                    <ul>
                      {subjects.map((subject) => (
                        <li key={subject._id}>{subject.name}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg"
        >
          Submit
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default TeacherProfile;
