import React from 'react'
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const Summary = () => {
    const {user} = useAuth()


    return (
        <div className="flex items-center p-4 m-8 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition duration-200">
            <div className="p-3 bg-gray-600 rounded-lg">
                <FaUser />
            </div>

            <div className="ml-4">
                <p className="text-sm text-gray-300">Welcome Back</p>
                <p className="text-xl font-semibold text-white">{user.name}</p>
            </div>
        </div>
    );
}

export default Summary
