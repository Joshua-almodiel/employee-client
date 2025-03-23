import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const View = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const responnse = await axios.get(`http://localhost:5000/api/employee/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                    })
                if (responnse.data.success) {
                    setEmployee(responnse.data.employee)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        };
        fetchEmployees();
    }, []);

    if (!employee) {
        return <div className="p-6 bg-gray-900 text-white">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">Employee Details</h2>
            <div className="bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="flex justify-center items-center">
                        <div className="w-64 h-64 overflow-hidden border-4 border-gray-700 shadow-lg hover:border-blue-500 transition duration-200">
                            <img
                                src={`http://localhost:5000/${employee.userId.profileImage}`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Name</p>
                            <p className="text-lg text-center font-semibold">{employee.userId.name}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Employee ID</p>
                            <p className="text-lg font-semibold">{employee.employeeId}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Date of Birth</p>
                            <p className="text-lg font-semibold">
                                {new Date(employee.dob).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Gender</p>
                            <p className="text-lg font-semibold">{employee.gender}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Department</p>
                            <p className="text-lg font-semibold">{employee.department.dep_name}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Marital Status</p>
                            <p className="text-lg font-semibold">{employee.maritalStatus}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View