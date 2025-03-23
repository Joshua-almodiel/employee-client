import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext'

const View = () => {


    const [salaries, setSalaries] = useState(null)
    const [filteredSalaries, setFilteredSalaries] = useState([])
    const { id } = useParams()
    const {user} = useAuth()
    let sno = 1;

    const fetchSalaries = async () => {
    try {
        console.log("Fetching salary for ID:", id);
        const response = await axios.get(`http://localhost:5000/api/salary/${id}/${user.role}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        console.log("API Response: ", response.data);

        if (response.data.success) {
            setSalaries(response.data.salary);
            setFilteredSalaries(response.data.salary);
        }
    } catch (error) {
        console.error("Error fetching salary:", error);
    }
};


    useEffect(() => {
        fetchSalaries()
    }, [])


    const filterSalaries = (q) => {
        const filteredRecords = salaries.filter((leave) =>
            leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase()));
        setFilteredSalaries(filteredRecords)
    }

    return (
        <>
            {filteredSalaries === null ? (
                <div className="p-6 bg-gray-900 text-white">Loading...</div>
            ) : (
                <div className="p-6 bg-gray-900 text-white">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold">Salary History</h2>
                    </div>

                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search By Employee ID"
                            onChange={filterSalaries}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                        />
                    </div>

                    {filteredSalaries.length > 0 ? (
                        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-4 py-2 text-left">SNO</th>
                                        <th className="px-4 py-2 text-left">Emp ID</th>
                                        <th className="px-4 py-2 text-left">Salary</th>
                                        <th className="px-4 py-2 text-left">Allowance</th>
                                        <th className="px-4 py-2 text-left">Deduction</th>
                                        <th className="px-4 py-2 text-left">Total</th>
                                        <th className="px-4 py-2 text-left">Pay Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSalaries.map((salary) => (
                                        <tr key={salary.id} className="border-b border-gray-700 hover:bg-gray-700 transition duration-200">
                                            <td className="px-4 py-2">{sno++}</td>
                                            <td className="px-4 py-2">{salary.employeeId.employeeId}</td>
                                            <td className="px-4 py-2">{salary.basicSalary}</td>
                                            <td className="px-4 py-2">{salary.allowances}</td>
                                            <td className="px-4 py-2">{salary.deductions}</td>
                                            <td className="px-4 py-2">{salary.netSalary}</td>
                                            <td className="px-4 py-2">{new Date(salary.payDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
                            No Records Found
                        </div>
                    )}
                </div>
            )}
        </>

    )
}

export default View