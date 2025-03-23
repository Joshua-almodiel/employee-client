import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import axios from "axios";

const AdminSummary = () => {

  const [summary, setSummary] = useState(null)

  useEffect( () => {
    const fetchSummary = async () => {
      try{
        const summary = await axios.get('http://localhost:5000/api/dashboard/summary', {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })
        setSummary(summary.data)
      } catch(error) {
        if(error.response){
          alert(error.response.data.error)
        }
      }
    }
    fetchSummary()
  }, [])

  if(!summary){
    return <div className="p-6 bg-gray-900 text-white">Loading...</div>;
  }



  return (
    <div className="p-6 sm:p-8 bg-gray-900 text-white">
      <h3 className="text-2xl sm:text-3xl font-semibold mb-6">Dashboard Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard icon={<FaUsers className="text-white" />} text="Total Employees" number={summary.totalEmployees} />
        <SummaryCard icon={<FaBuilding className="text-white" />} text="Total Departments" number={summary.totalDepartments} />
        <SummaryCard icon={<FaMoneyBillWave className="text-white" />} text="Monthly Salary" number={summary.totalSalary} />
      </div>

      <div className="mt-12 p-6 sm:p-8 bg-gray-800 rounded-lg shadow-md">
        <h4 className="text-xl sm:text-2xl font-semibold text-white mb-6">Leave Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard icon={<FaFileAlt className="text-white" />} text="Leave Applied" number={summary.leaveSummary.appliedFor} />
          <SummaryCard icon={<FaCheckCircle className="text-white" />} text="Leave Approved" number={summary.leaveSummary.approved} />
          <SummaryCard icon={<FaHourglassHalf className="text-white" />} text="Leave Pending" number={summary.leaveSummary.pending} />
          <SummaryCard icon={<FaTimesCircle className="text-white" />} text="Leave Rejected" number={summary.leaveSummary.rejected} />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;

{/* code file 14*/}