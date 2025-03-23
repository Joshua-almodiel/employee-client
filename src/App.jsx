import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import PrivateRoutes from "./utils/PrivateRoutes"
import RoleBaseRoutes from "./utils/RoleBaseRoutes"
import AdminSummary from "./components/dashboard/AdminSummary"
import DepartmentList from "./components/department/DepartmentList"
import AddDepartment from "./components/department/AddDepartment"
import EditDepartment from "./components/department/EditDepartment.jsx"
import List from './components/employee/List.jsx'
import Add from './components/employee/Add.jsx'
import View from "./components/employee/View.jsx"
import Edit from "./components/employee/Edit.jsx"
import AddSalary from './components/salary/Add.jsx'
import ViewSalary from './components/salary/View.jsx'
import Summary from "./components/employeeDashboard/Summary.jsx"
import LeaveList from './components/leave/List.jsx'
import AddLeave from './components/leave/AddLeave.jsx'
import Setting from './components/employeeDashboard/Setting.jsx'
import TableLeave from "./components/leave/TableLeave.jsx"
import DetailsLeave from "./components/leave/DetailsLeave.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSummary />}></Route>

          <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>

          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
          <Route path="/admin-dashboard/employees/:id" element={<View />}></Route>
          <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />}></Route>
          <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />}></Route>
          <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />}></Route>

          <Route path="/admin-dashboard/salary/add" element={<AddSalary />}></Route>
          <Route path="/admin-dashboard/setting" element={<Setting />}></Route>

          <Route path="/admin-dashboard/leaves" element={<TableLeave />}></Route>
          <Route path="/admin-dashboard/leaves/:id" element={<DetailsLeave />}></Route>

        </Route>


        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>

          <Route index element={<Summary />}></Route>

          <Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
          <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />}></Route>
          <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
          <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />}></Route>
          <Route path="/employee-dashboard/setting" element={<Setting />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
{/*Code file 1*/ }