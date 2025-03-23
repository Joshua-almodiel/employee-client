import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const List = () => {
    const [leaves, setLeaves] = useState([])
    let sno = 1;
    const { id } = useParams()
    const { user } = useAuth()

    const fetchLeaves = async () => {
        try {
            console.log("Fetching leaves for ID:", id);
            const response = await axios.get(`http://localhost:5000/api/leave/${id}/${user.role}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            console.log("API Response: ", response.data);

            if (response.data.success) {
                setLeaves(response.data.leaves);
            }
        } catch (error) {
            
        }
    };


    useEffect(() => {
        fetchLeaves()
    }, [])





    return (

        <div className="p-6 bg-gray-900 text-white">
            <div className="mb-6">
                <h3 className="text-2xl font-semibold">Manage Leaves</h3>
            </div>

            <div className="flex items-center justify-between mb-6">
                <input
                    type="text"
                    placeholder="Search by department name"
                    className="w-full max-w-md px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                />
                {user.role === "employee" &&
                    <Link
                        to="/employee-dashboard/add-leave"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Add New Leave
                    </Link>
                }
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">SNO</th>
                            <th className="px-4 py-2 text-left">Leave Type</th>
                            <th className="px-4 py-2 text-left">From</th>
                            <th className="px-4 py-2 text-left">To</th>
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave._id} className="border-b border-gray-700 hover:bg-gray-700 transition duration-200">
                                <td className="px-4 py-2">{sno++}</td>
                                <td className="px-4 py-2">{leave.leaveType}</td>
                                <td className="px-4 py-2">{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{new Date(leave.endDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{leave.reason}</td>
                                <td className="px-4 py-2">{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>




    );
};

export default List;