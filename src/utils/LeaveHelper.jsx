import React from 'react'
import { useNavigate } from 'react-router-dom'


export const columns = [
    {
      name: "S no",
      selector: (row) => row.sno,
      width: "100px", 
    },
    {
      name: "Emp ID",
      selector: (row) => row.employeeId,
      width: "150px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "160px",
    },
    {
      name: "Leave Type",
      selector: (row) => row.leaveType,
      width: "150px",
    },
    {
      name: "Department",
      selector: (row) => row.department,
      width: "170px",
    },
    {
      name: "Days",
      selector: (row) => row.days,
      width: "120px", 
    },
    {
      name: "Status",
      selector: (row) => row.status,
      width: "130px", 
    },
    {
      name: "Action",
      selector: (row) => row.action,
      width: "150px",
    },
  ];


export const LeaveButtons = ({_id}) => {

    const navigate = useNavigate()

    const handleView = (id) => {
        navigate(`/admin-dashboard/leaves/${id}`)
    }

  return (
    <div className="flex space-x-2">
        <button className="text-blue-500 hover:text-blue-600" onClick={() => handleView(_id)}>
            View
        </button>
    </div>
  )
}