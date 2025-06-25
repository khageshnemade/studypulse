import React, { useState, useEffect } from 'react';
import makeRequest from '../../axios';
import { toast, ToastContainer } from 'react-toastify';
import { setOrgId,setOrgName } from "../../redux/features/orgSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UpdateOrganization = () => {
  const [name, setName] = useState('');
  const [activeAcademicYearId, setActiveAcademicYearId] = useState('');
  const [loading, setLoading] = useState(false);
  const [academicYears, setAcademicYears] = useState([]);
  const dispatch=useDispatch()
const navigate=useNavigate()
  const fetchAcademicYears = async () => {
    try {
      const res = await makeRequest.get("/admin/get-academic-years");

      if (res.data.success) {
        const years = res.data.data;
        setAcademicYears(years);

        const today = new Date();
        const currentYear = years.find((year) => {
          const start = new Date(year.startDate);
          const end = new Date(year.endDate);
          return today >= start && today <= end;
        });

        if (currentYear) {
          setActiveAcademicYearId(currentYear._id);
        }
      } else {
        toast.error("Failed to load academic years");
      }
    } catch (err) {
      toast.error("Error fetching academic years");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcademicYears();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await makeRequest.put('/admin/update-organization', {
        name,
        activeAcademicYearId,
      });
      dispatch(setOrgName(name));

      toast.success('Organization updated successfully!');
     setTimeout(() => {
        navigate('/admin-dashboard');
     }, 1500);
    } catch (error) {
        console.log(error);
        
      toast.error(error.response?.data?.message || 'Update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Organization</h2>
<ToastContainer/>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Organization Name</label>
          <input
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter organization name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Academic Year</label>
          <select
            value={activeAcademicYearId}
            onChange={(e) => setActiveAcademicYearId(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Academic Year</option>
            {academicYears.map((year) => (
              <option key={year._id} value={year._id}>
                {year.yearName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Organization'}
        </button>
      </form>
    </div>
  );
};

export default UpdateOrganization;
