import React, { useEffect, useState } from 'react'
import { makeRequest } from '../../axios';
import { User2 } from 'lucide-react';

export default function TProfile() {
  const userName=JSON.parse(localStorage.getItem('user')).userName;
    const [formData, setFormData] = useState({});
useEffect(() => {
 getPreviousData();
}, [])

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
        <div className="">
          <div className="grid gap-6">
            {/* User Information */}
            <p className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold bg-purple-200 p-3 sm:p-4 md:p-5 rounded-2xl flex w-full sm:w-4/6 justify-center items-center mx-auto text-gray-700 m-3">
    <User2 className="text-xl sm:text-2xl md:text-3xl h-8 sm:h-10 md:h-12 min-w-5 sm:min-w-6 md:min-w-8 min-h-5 sm:min-h-6 md:min-h-8 mr-4 animate-bounce" />

          Teacher Complete Profile
        </p>
            <div className="p-3 bg-white rounded-lg shadow-xl border-t-8 border-indigo-500">
              <h2 className="text-3xl font-semibold text-indigo-600 mb-6">User Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p className="text-lg"><span className="font-semibold">Name:</span> {userName}</p>
                <p className="text-lg"><span className="font-semibold">Gender:</span> {formData.gender}</p>
                <p className="text-lg"><span className="font-semibold">Address:</span> {formData.address}</p>
                <p className="text-lg"><span className="font-semibold">Pincode:</span> {formData.pincode}</p>
                <p className="text-lg"><span className="font-semibold">Date of Birth:</span> {new Date(formData.dob).toLocaleDateString()}</p>
                <p className="text-lg"><span className="font-semibold">Joining Date:</span> {new Date(formData.joiningDate).toLocaleDateString()}</p>
                <p className="text-lg"><span className="font-semibold">Total Experience:</span> {formData.totalYearsOfExperience} years</p>
                <p className="text-lg"><span className="font-semibold">Status:</span> {formData.status}</p>
              </div>
            </div>
      
            {/* Qualifications */}
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-8 border-green-500">
              <h2 className="text-3xl font-semibold text-green-600 mb-6">Qualifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {formData?.qualification && Object.entries(formData.qualification).map(([key, value]) => (
                  <div key={key} className="p-6 border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50">
                    <h3 className="text-xl font-semibold text-gray-800 capitalize mb-4">{key}</h3>
                    <div className="space-y-2">
                      {value.degree && (
                        <p className="text-lg">
                          <span className="font-semibold">Degree:</span> {value.degree}
                        </p>
                      )}
                      <p className="text-lg">
                        <span className="font-semibold">Field of Study:</span> {value.fieldOfStudy}
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">Year of Completion:</span> {value.yearOfCompletion}
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">Percentage:</span> {value.percentage}%
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">School/University:</span> {value.schoolName || value.university}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
      
           {/* Experience */}
<div className="bg-white p-8 rounded-lg shadow-xl border-t-8 border-pink-500">
  <h2 className="text-3xl font-semibold text-pink-600 mb-6 text-center">Experience</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {formData.experience && formData.experience.map((exp, index) => (
      <div key={exp._id} className="p-6 bg-gray-50 border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Experience {index + 1}</h3>
        <div className="text-gray-600">
          <p className="mb-2"><span className="font-medium">Organization:</span> {exp.organizationName}</p>
          <p className="mb-2"><span className="font-medium">Designation:</span> {exp.designation}</p>
          <p className="mb-2"><span className="font-medium">Start Date:</span> {new Date(exp.startDate).toLocaleDateString()}</p>
          <p className="mb-2"><span className="font-medium">End Date:</span> {new Date(exp.endDate).toLocaleDateString()}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      
            {/* Subjects Section */}
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-8 border-purple-500">
              <h2 className="text-3xl font-semibold text-purple-600 mb-6 text-center">Subjects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formData.subjects && formData.subjects.map((subject) => {
                  const className = formData.classes.find((cls) => cls._id === subject.classId)?.name || "Unknown Class";
                  return (
                    <div key={subject._id} className="p-6 bg-gray-50 border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{subject.name}</h3>
                      <p className="text-gray-600"><span className="font-medium">Class Name:</span> {className}</p>
                    </div>
                  );
                })}
              </div>
            </div>
      
            {/* Classes Section */}
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-8 border-teal-500">
              <h2 className="text-3xl font-semibold text-teal-600 mb-6 text-center">Classes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formData.classes && formData.classes.map((classItem) => (
                  <div key={classItem._id} className="p-6 bg-gray-50 border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{classItem.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
      
}
