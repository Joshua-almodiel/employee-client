import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillAlt, FaMoneyBillWave, FaTachometerAlt, FaUser, FaUsers } from 'react-icons/fa'

const AdminSideBar = () => {
    return (
        <div className="fixed inset-y-0 flex flex-col bg-gray-800 text-white w-64">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold">Employee MS</h3>
          </div>
          <div className="flex flex-col p-2 space-y-2">
            
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center p-2 rounded transition duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-700" 
                }`
              } end
            >
              <FaTachometerAlt className="mr-2" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin-dashboard/employees"
              className={({ isActive }) =>
                `flex items-center p-2 rounded transition duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white" 
                    : "hover:bg-gray-700" 
                }`
              }
            >
              <FaUsers className="mr-2" />
              <span>Employee</span>
            </NavLink>

            <NavLink
              to="/admin-dashboard/departments"
              className={({ isActive }) =>
                `flex items-center p-2 rounded transition duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white" 
                    : "hover:bg-gray-700" 
                }`
              }
            >
              <FaBuilding className="mr-2" />
              <span>Department</span>
            </NavLink>

            <NavLink
              to="/admin-dashboard/leaves"
              className={({ isActive }) =>
                `flex items-center p-2 rounded transition duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white" 
                    : "hover:bg-gray-700" 
                }`
              }
            >
              <FaCalendarAlt className="mr-2" />
              <span>Leave</span>
            </NavLink>

            <NavLink
              to="/admin-dashboard/salary/add"
              className={({ isActive }) =>
                `flex items-center p-2 rounded transition duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white" 
                    : "hover:bg-gray-700" 
                }`
              }
            >
              <FaMoneyBillWave className="mr-2" />
              <span>Salary</span>
            </NavLink>

            <NavLink
              to="/admin-dashboard/setting"
              className={({ isActive }) =>
                `flex items-center p-2 rounded transition duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white" 
                    : "hover:bg-gray-700"
                }`
              }
            >
              <FaCogs className="mr-2" />
              <span>Settings</span>
            </NavLink>

          </div>
        </div>
      );
}

export default AdminSideBar

{/*code file 13 */}