import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { User } from "lucide-react";

const TeacherProfile = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classId, setClassId] = useState("");
  const [selectedClassId, setSelectedClassId] = useState('')
  const [selectedSubjectId, setSelectedSubjectId] = useState('')
  const [s_c, setS_c] = useState({});
  const [classIds, setClassIds] = useState([]); // Array to hold class IDs
  const [subjectIds, setSubjectIds] = useState([]); // Array to hold subject IDs
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

  const handleArrayInputChange = (section, index, value) => {
    const updatedArray = [...formData[section]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [section]: updatedArray,
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

  const handleAddToArray = (section) => {
    const updatedArray = [...formData[section], { name: "" }];
    setFormData({ ...formData, [section]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const modifiedFormData = {
        ...formData,
        classId: classIds,
        subjectId: subjectIds,
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
      res.status === 200 || res.status === 201
        ? navigate("/teacher-dashboard")
        : "";
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handleC_SSubmit = async () => {

    console.log("Classes and Subjects", selectedClassId, selectedSubjectId); // Debugging output

    // Update state
    setS_c((prev) => {
      const existingSubjects = prev[selectedClassId] || []; // Get the array if it exists, otherwise an empty array

      const updatedState = {
        ...prev,
        [selectedClassId]: [...new Set([...existingSubjects, selectedSubjectId])], // Add new subjectId, ensuring uniqueness
      };

      // After updating state, update classIds and subjectIds arrays
      setClassIds(Object.keys(updatedState)); // Extract class IDs
      setSubjectIds(Object.values(updatedState).flat()); // Extract subject IDs and flatten into one array

      return updatedState;
    });
  };
  useEffect(() => {
    console.log("Updated Class-Subject Mapping:", s_c);
    console.log("Updated Classes Mapping:", classIds);
    console.log("Updated Subjects Mapping:", subjectIds);
  }, [s_c, classIds, subjectIds]);
  // if (classId && subjectId) {
  //   setS_c((prev) => {
  //     const existingSubjects = prev[classId] ? prev[classId] : [];
  //     return {
  //       ...prev,
  //       [classId]: [...new Set([...existingSubjects, subjectId])], // Add the new subject ID and ensure uniqueness
  //     };
  //   });
  // } else {
  //   alert("Please select both class and subject before adding."); // Validation
  // }

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

  // Handler to add a new experience
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

  const handleAddClass = () => {
    const newClass = { name: "", subjects: [] }; // New class with empty subjects
    setFormData((prev) => ({
      ...prev,
      classes: [...prev.classes, newClass], // Add new class to the classes array
    }));
  };

  const handleAddSubject = (classIndex) => {
    const updatedClasses = [...formData.classes];
    const updatedSubjects = [...formData.subjects];

    // Add a new subject to the selected class
    updatedClasses[classIndex].subjects.push({ _id: "", name: "" });

    // Ensure subjects array is aligned with classes
    updatedSubjects[classIndex] = updatedSubjects[classIndex] || [];
    updatedSubjects[classIndex].push({ _id: "", name: "" });

    setFormData({
      ...formData,
      classes: updatedClasses,
      subjects: updatedSubjects,
    });
  };

  // Handle subject change
  const handleSubjectChange = (classIndex, subjectIndex, e) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[classIndex] = updatedSubjects[classIndex] || [];
    updatedSubjects[classIndex][subjectIndex] = {
      _id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    };

    setFormData({
      ...formData,
      subjects: updatedSubjects,
    });
  };

  return (
    <div>
     <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-purple-200 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
    <User className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />
  
        Teacher Complete Profile
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
          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Birth
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
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">
            Total Years of Experience
          </label>
          <input
            type="number"
            name="totalYearsOfExperience"
            value={formData.totalYearsOfExperience}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
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
          <div>
            <label className="block text-sm font-medium mb-1">Classes</label>
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
          <h3 className="text-lg font-semibold mb-4">Experience</h3>
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
                setSelectedClassId(e.target.value);
                fetchSubjectsByClassId(e.target.value);
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
              type="button"  // Ensure it's not a submit button
              onClick={handleC_SSubmit}
              className="btn btn-info m-2"
            >
              Add
            </button>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(s_c).map(([key, value]) => {
                return (
                  <div
                    key={key}
                    className="card p-4 border rounded-lg shadow-lg"
                  >
                    {classes.find((cls) => cls._id === key)?.name}

                    {value.map((item, index) => (
                      <div key={index} className="subject-item mb-2">

                        {subjects.find((subject) => subject._id === item)?.name}
                        {/* Print subject or item */}
                        <button
                        type="button"
                          onClick={() =>
                            handleRemoveFromClassAndSubjects(key, index)
                          }
                          className="btn btn-danger ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
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
          Submit Value
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default TeacherProfile;

//   <div>
//     {/**Classes and Subjects */}
//     <h3 className="text-lg font-semibold mb-4">Classes and Subjects</h3>

//     {formData.classes?.length > 0 ? (
//       formData.classes.map((classItem, classIndex) => (
//         <div key={classIndex} className="mb-4">
//           <div className="flex gap-2 items-center mb-2">
//             <select
//               value={classItem._id || ""}
//               onChange={(e) => {
//                 const updatedArray = [...formData.classes];
//                 updatedArray[classIndex] = {
//                   ...updatedArray[classIndex],
//                   _id: e.target.value,
//                 };
//                 setFormData((prev) => ({
//                   ...prev,
//                   classes: updatedArray,
//                 }));
//                 fetchSubjectsByClassId(e.target.value); // Fetch subjects based on selected class
//               }}
//               className="flex-grow px-3 py-2 border rounded-lg"
//             >
//               <option value="">Select a Class</option>
//               {classes.map((classOption) => (
//                 <option key={classOption._id} value={classOption._id}>
//                   {classOption.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Subjects for this Class */}
//           <div className="ml-4">
//             {formData?.subjects.map((subject, subIndex) => (
//               <div key={subIndex} className="flex gap-2 items-center mb-2">
//                 <select
//                   value={subject._id || ""}
//                   onChange={(e) => handleSubjectChange(classIndex, subIndex, e)}
//                   className="flex-grow px-3 py-2 border rounded-lg"
//                 >
//                   <option value="">Select a Subject</option>
//                   {subjects.map((subjectOption) => (
//                     <option key={subjectOption._id} value={subjectOption._id}>
//                       {subjectOption.name}
//                     </option>
//                   ))}
//                 </select>

//                 <button
//                   type="button"
//                   onClick={() => handleRemoveSubject(classIndex, subIndex)}
//                   className="text-red-600 underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={() => handleAddSubject(classIndex)}
//               className="text-blue-600 underline"
//             >
//               Add Subject
//             </button>
//           </div>
//         </div>
//       ))
//     ) : (
//       <p>No classes available</p>
//     )}

//     {/* Add New Class Button */}
//     <button
//       type="button"
//       onClick={() => {
//         setFormData((prev) => ({
//           ...prev,
//           classes: [...prev.classes, { name: "", subjects: [] }], // Add a new class with empty subjects
//         }));
//       }}
//       className="text-blue-600 underline"
//     >
//       Add Class
//     </button>
//   </div>;
