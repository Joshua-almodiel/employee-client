import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null
    });
    const [departments, setDepartments] = useState(null);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }

        getDepartments()
    }, [])

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value)
        setEmployees(emps)
    }



    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5000/api/salary/add`, salary, {
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
        <>{departments ? (
            <div className="p-6 bg-gray-900 text-white">
                <h2 className="text-2xl font-semibold mb-6">Add Salary</h2>
                <form className="bg-gray-800 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <div>
                            <label htmlFor="department" className="block text-sm font-medium mb-2">
                                Department
                            </label>
                            <select
                                name="department"
                                onChange={handleDepartment}
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
                            <label htmlFor="employee" className="block text-sm font-medium mb-2">
                                Employee ID
                            </label>
                            <select
                                name="employeeId"
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.map(emp => (
                                    <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                                ))}
                            </select>
                        </div>


                        <div>
                            <label htmlFor="basicSalary" className="block text-sm font-medium mb-2">
                                Basic Salary
                            </label>
                            <input
                                type="number"
                                name="basicSalary"
                                onChange={handleChange}
                                placeholder="Basic Salary"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="allowances" className="block text-sm font-medium mb-2">
                                Allowances
                            </label>
                            <input
                                type="number"
                                name="allowances"
                                placeholder="Allowances"
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="deductions" className="block text-sm font-medium mb-2">
                                Deductions
                            </label>
                            <input
                                type="number"
                                name="deductions"
                                placeholder="Deductions"
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="deductions" className="block text-sm font-medium mb-2">
                                Pay Date
                            </label>
                            <input
                                type="date"
                                name="payDate"
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                                required
                            />
                        </div>


                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Add Salary
                        </button>
                    </div>
                </form>
            </div>
        ) : <div className="p-6 bg-gray-900 text-white">Loading...</div>}</>
    );
};

export default Add;