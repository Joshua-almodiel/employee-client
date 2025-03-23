import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
    {
        name: "S no",
        selector: (row) => row.sno,
        width: "135px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "250px",
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "160px",
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "175px",
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "190px",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
    },
]

export const fetchDepartments = async () => {
    let departments;
    try {
        const response = await axios.get('http://localhost:5000/api/department', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return departments
};


export const getEmployees = async (id) => {
    let employees;
    try {
        const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.data.success) {
            return response.data.employees
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return employees
};

export const EmployeeButtons = ({ _id }) => {
    const navigate = useNavigate()

    return (
        <div>
            <div className="flex space-x-2">
                <button className="text-blue-500 hover:text-blue-600"
                    onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}>View</button>
                <button className="text-red-500 hover:text-blue-600"
                    onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}>Edit</button>
                <button className="text-red-500 hover:text-blue-600"
                    onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}>Salary</button>
                <button className="text-red-500 hover:text-red-600"
                    onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}>Leave</button>
            </div>
        </div>
    )
}