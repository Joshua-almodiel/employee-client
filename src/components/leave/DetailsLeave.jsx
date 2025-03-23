import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const DetailsLeave = () => {
    const { id } = useParams()
    const [leave, setLeave] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const responnse = await axios.get(`http://localhost:5000/api/leave/detail/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                    })
                if (responnse.data.success) {
                    setLeave(responnse.data.leave)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        };
        fetchLeaves();
    }, []);


    const changeStatus = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/leave/${id}`, {status},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                })
            if (response.data.success) {
                navigate('/admin-dashboard/leaves')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    if (!leave) {
        return <div className="p-6 bg-gray-900 text-white">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">Leave Details</h2>

            <div className="bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex justify-center items-center">
                        <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg hover:border-blue-500 transition duration-200">
                            <img
                                src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Name</p>
                            <p className="text-lg font-semibold">{leave.employeeId.userId.name}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Employee ID</p>
                            <p className="text-lg font-semibold">{leave.employeeId.employeeId}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Leave Type</p>
                            <p className="text-lg font-semibold">{leave.leaveType}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Reason</p>
                            <p className="text-lg font-semibold">{leave.reason}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Department</p>
                            <p className="text-lg font-semibold">{leave.employeeId.department.dep_name}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Start Date</p>
                            <p className="text-lg font-semibold">
                                {new Date(leave.startDate).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">End Date</p>
                            <p className="text-lg font-semibold">
                                {new Date(leave.endDate).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">
                                {leave.status === "Pending" ? "" : "Status"}
                            </p>
                            {leave.status === "Pending" ? (
                                <div className="flex space-x-4">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => changeStatus(leave._id, "Approved")}>
                                        Approve
                                    </button>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                                    onClick={() => changeStatus(leave._id, "Rejected")}>
                                        Reject
                                    </button>
                                </div>
                            ) : (
                                <p className="text-lg font-semibold">{leave.status}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsLeave