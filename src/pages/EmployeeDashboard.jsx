import React from 'react'
import Sidebar from '../components/employeeDashboard/Sidebar'
import NavBar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'

const EmployeeDashboard = () => {

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-64 bg-gray-900 text-white h-screen">
                <NavBar />
                <Outlet />
            </div>
        </div>
    )
}

export default EmployeeDashboard

{/*Code file 8*/ }