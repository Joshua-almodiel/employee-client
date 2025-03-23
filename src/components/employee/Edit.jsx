import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        department: '',
    });
    const [departments, setDepartments] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams()



    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }

        getDepartments()
    }, [])


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
                    const employee = responnse.data.employee;
                    setEmployee((prev) => ({ ...prev, name: employee.userId.name, maritalStatus: employee.maritalStatus, designation: employee.designation, salary: employee.salary, department: employee.department }))
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        };
        fetchEmployees();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(employee)
        try {
            const response = await axios.put(`http://localhost:5000/api/employee/${id}`, employee, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            console.log(response.data)
            if (response.data.success) {
                navigate("/admin-dashboard/employees")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }


    return (
        <>{departments && employee ? (
            <div className="p-6 bg-gray-900 text-white">
                <h2 className="text-2xl font-semibold mb-6">Edit Employee</h2>
                <form className="bg-gray-800 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={employee.name}
                                placeholder="Enter Name"
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                required
                            />
                        </div>


                        <div>
                            <label htmlFor="maritalStatus" className="block text-sm font-medium mb-2">
                                Marital Status
                            </label>
                            <select
                                name="maritalStatus"
                                value={employee.maritalStatus}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="single">Single</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                                <option value="separated">Separated</option>
                                <option value="engaged">Engaged</option>
                                <option value="commonlaw">Common-law</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="designation" className="block text-sm font-medium mb-2">
                                Designation
                            </label>
                            <input
                                type="text"
                                name="designation"
                                value={employee.designation}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="salary" className="block text-sm font-medium mb-2">
                                Salary
                            </label>
                            <input
                                type="number"
                                name="salary"
                                value={employee.salary}
                                placeholder="Salary"
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="department" className="block text-sm font-medium mb-2">
                                Department
                            </label>
                            <select
                                name="department"
                                value={employee.department}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Edit Employee
                        </button>
                    </div>
                </form>
            </div>
        ) : <div className="p-6 bg-gray-900 text-white">Loading...</div>}</>
    );
};

export default Edit;