import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { User2, Book, Briefcase, FileText, Users, Layers } from "lucide-react";
export default function TProfile() {
  const userName = JSON.parse(localStorage.getItem("user")).userName;
  const [formData, setFormData] = useState({});
  useEffect(() => {
    getPreviousData();
  }, []);

  const getPreviousData = async () => {
    try {
      const res = await makeRequest.get("/teacher/get-data");
      setFormData((prevData) => ({
        ...prevData,
        status: res?.data?.data?.status || "NoInformation",
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
  return (
    <div className="p-4">
      <div className="grid gap-4">
        {/* User Information */}

        <p className="text-center text sm:text-xl md:text-2xl font-serif p-2 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto m-3 drop-shadow-lg border-[1.5px] border-blue-800">
          <User2 className="text sm:text-xl md:text-2xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce text-blue-600" />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Teacher Complete Profile
          </span>
        </p>

        <div className="p-4 bg-white rounded-lg border-t-8 border-indigo-500">
          <h2 className="text-sm sm:text-lg font-semibold text-indigo-600 mb-4 text-center flex justify-center items-center">
            <User2 className="h-5 w-5 mr-2" />
            User Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-sm">
              <span className="font-semibold">Name:</span> {userName}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Gender:</span> {formData.gender}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Address:</span> {formData.address}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Pincode:</span> {formData.pincode}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Date of Birth:</span>{" "}
              {new Date(formData.dob).toLocaleDateString()}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Joining Date:</span>{" "}
              {new Date(formData.joiningDate).toLocaleDateString()}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Total Experience:</span>{" "}
              {formData.totalYearsOfExperience} years
            </p>
            <p className="text-sm">
              <span className="font-semibold">Status:</span> {formData.status}
            </p>
          </div>
        </div>

        {/* Qualifications */}
        <div className="bg-white p-6 rounded-lg border-t-8 border-green-500">
          <h2 className="text-sm sm:text-lg font-semibold text-green-600 mb-4 text-center flex justify-center items-center">
            <Book className="h-5 w-5 mr-2" />
            Qualifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData?.qualification &&
              Object.entries(formData.qualification).map(([key, value]) => (
                <div
                  key={key}
                  className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50"
                >
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 capitalize mb-4 text-center">
                    {key}
                  </h3>
                  <div className="space-y-2">
                    {value.degree && (
                      <p className="text-sm">
                        <span className="font-semibold">Degree:</span>{" "}
                        {value.degree}
                      </p>
                    )}
                    <p className="text-sm">
                      <span className="font-semibold">Field of Study:</span>{" "}
                      {value.fieldOfStudy}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Year of Completion:</span>{" "}
                      {value.yearOfCompletion}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Percentage:</span>{" "}
                      {value.percentage}%
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">School/University:</span>{" "}
                      {value.schoolName || value.university}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white p-6 rounded-lg border-t-8 border-pink-500">
          <h2 className="text-sm sm:text-lg font-semibold text-pink-600 mb-4 text-center flex justify-center items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Experience
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.experience &&
              formData.experience.map((exp, index) => (
                <div
                  key={exp._id}
                  className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg"
                >
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 text-center">
                    Experience {index + 1}
                  </h3>
                  <div className="text-gray-600 text-sm">
                    <p className="mb-2">
                      <span className="font-medium">Organization:</span>{" "}
                      {exp.organizationName}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Designation:</span>{" "}
                      {exp.designation}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Start Date:</span>{" "}
                      {new Date(exp.startDate).toLocaleDateString()}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">End Date:</span>{" "}
                      {new Date(exp.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Subjects Section */}
        <div className="bg-white p-6 rounded-lg border-t-8 border-purple-500">
          <h2 className="text-sm sm:text-lg font-semibold text-purple-600 mb-4 text-center flex justify-center items-center">
            <FileText className="h-5 w-5 mr-2" />
            Subjects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.subjects &&
              formData.subjects.map((subject) => {
                const className =
                  formData.classes.find((cls) => cls._id === subject.classId)
                    ?.name || "Unknown Class";
                return (
                  <div
                    key={subject._id}
                    className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg"
                  >
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 text-center">
                      {subject.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Class Name:</span>{" "}
                      {className}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Classes Section */}
        <div className="bg-white p-6 rounded-lg border-t-8 border-teal-500">
          <h2 className="text-sm sm:text-lg font-semibold text-teal-600 mb-4 text-center flex justify-center items-center">
            <Layers className="h-5 w-5 mr-2" />
            Classes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.classes &&
              formData.classes.map((classItem) => (
                <div
                  key={classItem._id}
                  className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg"
                >
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 text-center">
                    {classItem.name}
                  </h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
