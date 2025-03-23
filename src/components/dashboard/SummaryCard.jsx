import React from 'react'

const SummaryCard = ({ icon, text, number }) => {
    return (
        <div className="flex items-center p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition duration-200">
            <div className="p-3 bg-gray-600 rounded-lg">
                {icon} 
            </div>

            <div className="ml-4">
                <p className="text-sm text-gray-300">{text}</p>
                <p className="text-xl font-semibold text-white">{number}</p>
            </div>
        </div>
    );
}

export default SummaryCard

{/* code file 16*/}