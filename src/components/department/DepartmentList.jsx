import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper"
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const [searchDepartment, setSearchDepartment] = useState()

  const onDepartmentDelete = () => {
    fetchDepartments();
  }

  const fetchDepartments = async () => {
    setDepLoading(true)
    try {
      const response = await axios.get('http://localhost:5000/api/department', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => (
          {
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
          }
        ));
        setDepartments(data);
        setSearchDepartment(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    } finally {
      setDepLoading(false)
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [])


  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#1F2937",
        color: "#FFFFFF",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#1F2937",
        color: "#FFFFFF",
        fontSize: "0.875rem",
        fontWeight: "600",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#1F2937",
        color: "#FFFFFF",
      },
    },
  };


  const searchDepartments = (e) => {
    const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearchDepartment(records)
  }

  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center h-64 text-white">
          Loading...
        </div>
      ) : (
        <div className="p-6 bg-gray-900 text-white">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold">Manage Departments</h3>
          </div>

          <div className="flex items-center justify-between mb-6">
            <input
              type="text"
              placeholder="Search departments..."
              onChange={searchDepartments}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-black-500 text-white"
            />

            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add New Department
            </Link>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <DataTable
              columns={columns}
              data={searchDepartment}
              customStyles={customStyles}
              pagination
              highlightOnHover
              responsive
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;

{/*code file 18 */ }