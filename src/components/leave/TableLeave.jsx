import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper.jsx";
import axios from "axios";

const TableLeave = () => {

    const [leaves, setLeaves] = useState([])
    const [searchEmployees, setSearchEmployees] = useState([])

    const fetchLeaves = async () => {
        try {
            const responnse = await axios.get('http://localhost:5000/api/leave', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(responnse)
            if (responnse.data.success) {
                let sno = 1;
                const data = await responnse.data.leaves.map((leave) => (
                    {
                        _id: leave._id,
                        sno: sno++,
                        employeeId: leave.employeeId.employeeId,
                        name: leave.employeeId.userId.name,
                        leaveType: leave.leaveType,
                        department: leave.employeeId.department.dep_name,
                        days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
                        status: leave.status,
                        action: (<LeaveButtons _id={leave._id} />),
                    }
                ));
                setLeaves(data);
                setSearchEmployees(data)
            }
            console.log(responnse.data.leaves);
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    useEffect(() => {
        fetchLeaves()
    }, [])

    const searchEmployee = (e) => {
        const data = leaves.filter((leave) =>
            leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
        setSearchEmployees(data)
    }

    const searchByButton = (status) => {
        const data = leaves.filter((leave) =>
            leave.status.toLowerCase().includes(status.toLowerCase()));
        setSearchEmployees(data)
    }


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


    return (
        <>
            {setSearchEmployees ? (
                <div className="p-6 bg-gray-900 text-white">
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold">Manage Leaves</h3>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <input
                            type="text"
                            placeholder="Search by employee ID"
                            onChange={searchEmployee}
                            className="w-full max-w-md px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                        />

                        <div className="flex space-x-4">
                            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                            onClick={() => searchByButton("Pending")}>
                                Pending
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                            onClick={() => searchByButton("Approved")}>
                                Approved
                            </button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                            onClick={() => searchByButton("Rejected")}>
                                Rejected
                            </button>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={searchEmployees}
                        customStyles={customStyles}
                        pagination
                        highlightOnHover
                        responsive />


                </div>
            ) : <div className="p-6 bg-gray-900 text-white">Loading...</div>}
        </>
    );
};

export default TableLeave;