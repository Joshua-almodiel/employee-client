import { useNavigate } from "react-router-dom"
import axios from "axios"


export const columns = [
    {
        name: "S no",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
]

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate()
    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete it?")
        if (confirm) {
            try {
                const responnse = await axios.delete(`http://localhost:5000/api/department/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                    })
                if (responnse.data.success) {
                    onDepartmentDelete()
                    navigate(0, { replace: true });
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
    }
    return (
        <div>
            <div className="flex space-x-2">
                <button className="text-blue-500 hover:text-blue-600"
                    onClick={() => navigate(`/admin-dashboard/department/${_id}`)}>Edit</button>
                <button className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(_id)}>Delete</button>
            </div>
        </div>
    )
}

{/*code file 21 */ }