import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
    const [department, setDepartment] = useState([])
    const {id} = useParams()
    const [depLoading, setDepLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true)
            try {
                const responnse = await axios.get(`http://localhost:5000/api/department/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                    })
                if (responnse.data.success) {
                    setDepartment(responnse.data.department)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setDepLoading(false)
            }
        };
        fetchDepartments();
    }, []);

    const handleChangeDep = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`,
                department, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (response.data.success) {
                navigate('/admin-dashboard/departments')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)

            }
        }
    }

    return (
        <>{depLoading ? <div className="p-6 bg-gray-900 text-white">Loading...</div> :
            <div className="p-6 bg-gray-900 text-white">
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold">Edit Department</h3>
                </div>

                <form className="bg-gray-800 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="dep_name" className="block text-sm font-medium mb-2">
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="dep_name"
                            id="dep_name"
                            value={department.dep_name}
                            placeholder="Enter Department Name"
                            onChange={handleChangeDep}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={department.description}
                            placeholder="Description"
                            onChange={handleChangeDep}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                            rows={4}
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Edit Department
                    </button>
                </form>
            </div>
        }</>
    )
}

export default EditDepartment

{/*code file 20 */ }