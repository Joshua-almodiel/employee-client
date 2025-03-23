import React from 'react'
import { useAuth } from '../../context/authContext'

const NavBar = () => {
    const { user, logout } = useAuth()

    return (
        <div className="flex justify-between items-center h-12 bg-gray-700 px-4 border-b border-gray-600">
            <p className="text-white font-medium">Welcome, {user.name}</p>
            <button className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-200" onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default NavBar

{/*code file 15 */}