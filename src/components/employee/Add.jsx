import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Add = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }

        getDepartments()
    }, [])

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })


        try{
            const response = await axios.post('http://localhost:5000/api/employee/add', formDataObj, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if(response.data.success) {
                navigate("/admin-dashboard/employees")
            }
        } catch(error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }



    return (
        <div className="p-6 bg-gray-900 text-white">
            <h2 className="text-2xl font-semibold mb-6">Add New Employee</h2>
            <form className="bg-gray-800 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="employeeid" className="block text-sm font-medium mb-2">
                            Employee ID
                        </label>
                        <input
                            type="text"
                            name="employeeId"
                            placeholder="Employee ID"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="dateofbirth" className="block text-sm font-medium mb-2">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dob"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium mb-2">
                            Gender
                        </label>
                        <select
                            name="gender"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="maritalStatus" className="block text-sm font-medium mb-2">
                            Marital Status
                        </label>
                        <select
                            name="maritalStatus"
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

                    <div>
                        <label htmlFor="salary" className="block text-sm font-medium mb-2">
                            Salary
                        </label>
                        <input
                            type="number"
                            name="salary"
                            placeholder="Salary"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium mb-2">
                            Role
                        </label>
                        <select
                            name="role"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="uploadimage" className="block text-sm font-medium mb-2">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;