import { useEffect, useState, useContext } from "react";
import Sidebar from "../components/Sidebar"; 
import EmployeeContext from "../context/EmployeeContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


const Dashboard = () => {

// const [employees, setEmployees] = useState([]);  this line commented bcz this we can store in context api, 
const {employees, setEmployees, loading, error, loadEmployees} = useContext(EmployeeContext);

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");


useEffect(() => {

  loadEmployees();

}, []);


  // Statistics
  const totalEmployees = employees.length;

  const itEmployees = employees.filter(
    (employee) => employee.department === "IT"
  ).length;

  const hrEmployees = employees.filter(
    (employee) => employee.department === "HR"
  ).length;

  const otherEmployees = totalEmployees - itEmployees - hrEmployees;
  
  // Latest 5 employees
  const recentEmployees = employees.slice(-5).reverse();


  const departmentData = [
    {
      department: "IT",
      employees: itEmployees
    },
    {
      department: "HR",
      employees: hrEmployees
    },
    {
      department: "Others",
      employees: otherEmployees
    }
  ];


  return (

    <div className="min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
      <main className="ml-64 min-h-screen p-8">

        <div className="mx-auto max-w-7xl">


          {/* Header */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Overview of your employee management system
            </p>

          </div>


          {/* Statistics */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">


            {/* Total Employees */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Total Employees
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {totalEmployees}
                  </h2>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  👥
                </div>

              </div>

            </div>


            {/* IT */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    IT Department
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {itEmployees}
                  </h2>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl">
                  💻
                </div>

              </div>

            </div>


            {/* HR */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    HR Department
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {hrEmployees}
                  </h2>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
                  🧑‍💼
                </div>

              </div>

            </div>


            {/* Others */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Other Departments
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {otherEmployees}
                  </h2>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
                  🏢
                </div>

              </div>

            </div>

          </div>


          {/* Department Chart */}
          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Employees by Department
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Department-wise employee distribution
              </p>
            </div>

            <div className="h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={departmentData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="department"
                  />

                  <YAxis
                    allowDecimals={false}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="employees"
                    fill="#2563eb"
                    radius={[8, 8, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* Recent Employees */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">


            {/* Table Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

              <div>

                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Employees
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Latest employees added to the system
                </p>

              </div>

              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                {totalEmployees} Employees
              </span>

            </div>


            {/* Loading */}
            {loading && (

              <div className="p-10 text-center">

                <p className="text-gray-500">
                  Loading employees...
                </p>

              </div>

            )}


            {/* Error */}
            {error && (

              <div className="p-10 text-center">

                <p className="text-red-600">
                  {error}
                </p>

              </div>

            )}


            {/* Empty */}
            {!loading &&
              !error &&
              employees.length === 0 && (

                <div className="p-10 text-center">

                  <p className="text-gray-500">
                    No employees found.
                  </p>

                </div>

              )}


            {/* Employee Table */}
            {!loading &&
              !error &&
              employees.length > 0 && (

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead className="bg-gray-50">

                      <tr>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Employee
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Department
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Designation
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Salary
                        </th>

                      </tr>

                    </thead>


                    <tbody className="divide-y divide-gray-100">

                      {recentEmployees.map((employee) => (

                        <tr
                          key={employee._id}
                          className="transition hover:bg-gray-50"
                        >

                          {/* Employee */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">

                                {employee.name
                                  ?.charAt(0)
                                  .toUpperCase()}

                              </div>

                              <div>

                                <p className="font-medium text-gray-900">
                                  {employee.name}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                  {employee.email}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* Department */}
                          <td className="px-6 py-5">

                            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                              {employee.department}
                            </span>

                          </td>


                          {/* Designation */}
                          <td className="px-6 py-5 text-sm text-gray-700">
                            {employee.designation}
                          </td>


                          {/* Salary */}
                          <td className="px-6 py-5 text-sm font-medium text-gray-900">
                            ₹{Number(employee.salary).toLocaleString()}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;