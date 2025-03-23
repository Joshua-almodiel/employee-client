import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillAlt, FaMoneyBillWave, FaTachometerAlt, FaUser, FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const Sidebar = () => {

  const {user} = useAuth()



    return (
        <div className="fixed inset-y-0 flex flex-col bg-gray-800 text-white w-64">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold">Employee MS</h3>
          </div>
          <div className="flex flex-col p-2 space-y-2">

            <NavLink
              to="/employee-dashboard"
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
              to={`/employee-dashboard/profile/${user._id}`}
              className={({ isActive }) =>
                `flex items-center p-2 rounded transition duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white" 
                    : "hover:bg-gray-700"
                }`
              }
            >
              <FaUsers className="mr-2" />
              <span>My Profile</span>
            </NavLink>

            <NavLink
              to={`/employee-dashboard/leaves/${user._id}`}
              className={({ isActive }) =>
                `flex items-center p-2 rounded transition duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white" 
                    : "hover:bg-gray-700"
                }`
              }
            >
              <FaBuilding className="mr-2" />
              <span>Leaves</span>
            </NavLink>

            <NavLink
              to={`/employee-dashboard/salary/${user._id}`}
              className={({ isActive }) =>
                `flex items-center p-2 rounded transition duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-700" 
                }`
              }
            >
              <FaCalendarAlt className="mr-2" />
              <span>Salary</span>
            </NavLink>
            
            <NavLink
              to="/employee-dashboard/setting"
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

export default Sidebar

{/*code file 13 */}