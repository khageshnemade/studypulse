import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";

const TeacherProfile = () => {
    const [formData, setFormData] = useState({
        gender: '',
        address: '',
        pincode: '',
        dob: '',
        totalYearsOfExperience: '',
        classes: [],
        qualification: {},
        experience: [],
        subjects: [],
        joiningDate: new Date(),
    });

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

    const handleExperienceChange = (index, key, value) => {
        const updatedExperience = [...formData.experience];
        updatedExperience[index][key] = value;
        setFormData({ ...formData, experience: updatedExperience });
    };

    const handleAddToArray = (section) => {
        const updatedArray = [...formData[section], ""];
        setFormData({ ...formData, [section]: updatedArray });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const modifiedFormData = {
                ...formData,
                classId: formData.classes,
                subjectId: formData.subjects
            };


            delete modifiedFormData.classes;
            delete modifiedFormData.subjects;

            // Send the modified formData to the API
            const res = await makeRequest.post('/teacher/complete-profile', modifiedFormData);
            console.log("Form submitted successfully:", res.data);
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const getPreviousData = async () => {
        try {
            const res = await makeRequest.get('/teacher/get-data');
            setFormData((prevData) => ({
                ...prevData,
                gender: res?.data?.data?.gender || '',
                address: res?.data?.data?.address || '',
                pincode: res?.data?.data?.pincode || '',
                dob: res?.data?.data?.dob || '',
                classes: res?.data?.data?.classes || [],
                subjects: res?.data?.data?.subjects || [],
                qualification: res?.data?.data?.qualification || {},
                experience: res?.data?.data?.experience || [],
                totalYearsOfExperience: res?.data?.data?.totalYearsOfExperience || '',
                joiningDate: new Date(res?.data?.data?.joiningDate) || new Date(),

            }));
            console.log("Previous Data:", res?.data?.data);
        } catch (error) {
            console.error('Error fetching Teacher data:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">User Input Form</h2>

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
                    <label className="block text-sm font-medium mb-1">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Joining Date</label>
                <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate ? new Date(formData.joiningDate).toISOString().split('T')[0] : ""}
                    onChange={handleInputChange}  // Ensure the handleInputChange function is set to manage formData
                    className="w-full px-3 py-2 border rounded-lg"
                />
                </div>

            </div>
            <div className="mt-6">
                <label className="block text-sm font-medium mb-1">Total Years of Experience</label>
                <input
                    type="number"
                    name="totalYearsOfExperience"
                    value={formData.totalYearsOfExperience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>
            {/* Dynamic Arrays */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Classes</h3>
                {formData?.classes.map((classId, index) => (
                    <div key={index} className="flex gap-2 items-center mb-2">
                        <input
                            type="text"
                            value={classId.name || ""}
                            onChange={(e) => handleArrayInputChange("classes", index, e.target.value)}
                            className="flex-grow px-3 py-2 border rounded-lg"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => handleAddToArray("classes")}
                    className="text-blue-600 underline"
                >
                    Add Class
                </button>
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
                                            handleNestedInputChange("qualification", key, fieldKey, e.target.value)
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
                {formData?.experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                        <h4 className="font-medium">Experience {index + 1}</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(exp).map(([key, value]) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium mb-1 capitalize">{key}</label>
                                    <input
                                        type={key.includes("Date") ? "date" : "text"}
                                        value={
                                            key.includes("Date") && value
                                                ? new Date(value).toISOString().split("T")[0]
                                                : value
                                        }
                                        onChange={(e) => handleExperienceChange(index, key, e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


            {/* Subjects */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Subjects</h3>
                {formData?.subjects.map((subject, index) => (
                    <div key={index} className="flex gap-2 items-center mb-2">
                        <input
                            type="text"
                            value={subject.name || ""}
                            onChange={(e) => handleArrayInputChange("subjects", index, e.target.value)}
                            className="flex-grow px-3 py-2 border rounded-lg"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => handleAddToArray("subjects")}
                    className="text-blue-600 underline"
                >
                    Add Subject
                </button>
            </div>

            <button
                type="submit"
                className="w-full mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg"
            >
                Submit
            </button>
        </form>
    );
};

export default TeacherProfile;
