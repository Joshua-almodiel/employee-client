import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper.jsx'
import axios from 'axios'
import DataTable from 'react-data-table-component'

const List = () => {
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [searchEmployee, setSearchEmployee] = useState()

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true)
            try {
                const response = await axios.get('http://localhost:5000/api/employee', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log("API Response: ", response.data);
                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department ? emp.department.dep_name : "No Department",
                        name: emp.userId ? emp.userId.name : "Unknown",
                        dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
                        profileImage: emp.userId?.profileImage ? (
                            <img width={40} className="rounded-full" src={`http://localhost:5000/${emp.userId.profileImage}`} />
                        ) : "No Image",
                        action: <EmployeeButtons _id={emp._id} />,
                    }));
    
                    console.log("Formatted Employee Data: ", data);
    
                    setEmployees(data);
                    setSearchEmployee(data);
                }
                console.log(response.data.employees);
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setEmpLoading(false)
            }
        };
        fetchEmployees();
    }, [])


    const customStyles = {
        rows: {
            style: {
                backgroundColor: "#1F2937",
                color: "#FFFFFF",
            },
        },
        headRow: {
            style: {
                backgroundColor: "#1F2937",
                color: "#FFFFFF",
                fontSize: "0.875rem",
                fontWeight: "600",
            },
        },
        pagination: {
            style: {
                backgroundColor: "#1F2937",
                color: "#FFFFFF",
            },
        },
    };

    const handleFilter = (e) => {
        const records = employees.filter((emp) => {
            return emp.name.toLowerCase().includes(e.target.value.toLowerCase());
        })
        setSearchEmployee(records)
    }




    return (
        <>
            {empLoading ? (
                <div className="flex justify-center items-center h-64 text-white">
                    Loading...
                </div>
            ) : (
                <div className='p-6 bg-gray-900 text-white'>
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold">Manage Employees</h3>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <input
                            type="text"
                            onChange={handleFilter}
                            placeholder="Search departments..."
                            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-black-500 text-white"
                        />

                        <Link
                            to="/admin-dashboard/add-employee"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Add New Employee
                        </Link>
                    </div>
                    <div>
                        <DataTable
                            columns={columns}
                            data={searchEmployee}
                            customStyles={customStyles}
                            pagination
                            highlightOnHover
                            responsive />
                    </div>
                </div>
            )}
        </>
    )
}

export default List