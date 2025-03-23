import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [leave, setLeave] = useState({
        userId: user._id,
    });


    const handleChange = (e) => {
        const { name, value } = e.target
        setLeave((prev) => ({ ...prev, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fetchEmployees = async () => {
            try {
                const response = await axios.post(`http://localhost:5000/api/leave/add`, leave,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                    })
                if (response.data.success) {
                    navigate(`/employee-dashboard/leaves/${user._id}`)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        };
        fetchEmployees();
    }

    return (
        <div className="p-6 bg-gray-900 text-white">
            <h2 className="text-2xl font-semibold mb-6">Request for Leave</h2>

            <form className="bg-gray-800 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="leaveType" className="block text-sm font-medium mb-2">
                            Leave Type
                        </label>
                        <select
                            name="leaveType"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            required
                        >
                            <option value="">Select Leave Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="fromDate" className="block text-sm font-medium mb-2">
                                From Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="toDate" className="block text-sm font-medium mb-2">
                                To Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            name="reason"
                            placeholder="Reason"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            rows={4}
                            required
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Add Leave
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddLeave;