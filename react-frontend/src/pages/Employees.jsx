import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { fetchEmployees } from "../redux/employeeSlice";

const Employees = () => {

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [department, setDepartment] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [debouncedSalary, setDebouncedSalary] = useState("");

  // LOAD MORE
  const [visibleCount, setVisibleCount] = useState(5);

  // for search text
  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSearch(searchText);

    }, 500);

    return () => {

      clearTimeout(timer);

    };

  }, [searchText]);


  // for salary input filter
  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSalary(minSalary);

    }, 500);

    return () => {

      clearTimeout(timer);

    };

  }, [minSalary]);


  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState("");


  const navigate = useNavigate();

  const dispatch = useDispatch();


  // GET EMPLOYEES FROM REDUX
  const employees = useSelector((state) => {

    return state.employeeStore.employeeSliceArray;

  });


  // GET LOADING FROM REDUX
  const loading = useSelector((state) => {

    return state.employeeStore.loading;

  });


  // GET ERROR FROM REDUX
  const error = useSelector((state) => {

    return state.employeeStore.error;

  });


  // LOAD EMPLOYEES USING REDUX
  useEffect(() => {

    dispatch(fetchEmployees());

  }, [dispatch]);


  // RESET LOAD MORE WHEN FILTER INPUT CHANGES
  useEffect(() => {

    setVisibleCount(5);

  }, [
    department,
    debouncedSalary,
    debouncedSearch
  ]);


  // FRONTEND FILTERING TEMPORARILY
  const filteredEmployees = employees.filter((employee) => {

    const matchesDepartment =
      department === "" ||
      employee.department === department;


    const matchesSalary =
      debouncedSalary === "" ||
      Number(employee.salary) >= Number(debouncedSalary);


    const searchValue =
      debouncedSearch.toLowerCase();


    const matchesSearch =
      debouncedSearch === "" ||
      employee.name
        ?.toLowerCase()
        .includes(searchValue) ||
      employee.email
        ?.toLowerCase()
        .includes(searchValue);


    return (
      matchesDepartment &&
      matchesSalary &&
      matchesSearch
    );

  });


  // OPEN DELETE POPUP
  const handleDelete = (employee) => {

    setDeleteEmployee(employee);

    setDeleteSuccess("");

    setShowDeletePopup(true);

  };


  // CONFIRM DELETE
  const handleDeleteConfirm = async () => {

    const id = deleteEmployee._id;

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/employees/${id}`,
        {
          method: "DELETE"
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message || "Failed to delete employee"
        );

      }


      // REFRESH REDUX EMPLOYEE DATA
      dispatch(fetchEmployees());


      // Show success message
      setDeleteSuccess(
        data.message || "Employee deleted successfully"
      );


      // Close popup after 1 second
      setTimeout(() => {

        setShowDeletePopup(false);

        setDeleteSuccess("");

        setDeleteEmployee(null);

      }, 1000);


    } catch (error) {

      console.log(error.message);

    }

  };


  // LOAD MORE FUNCTION
  const handleLoadMore = () => {

    setVisibleCount((previousCount) => {

      return previousCount + 5;

    });

  };


  return (

    <div className="min-h-screen bg-gray-50">

      <Sidebar />


      {/* Main Content */}
      <main className="ml-64 min-h-screen p-8">

        <div className="mx-auto max-w-7xl">


          {/* Header */}
          <div className="mb-8 flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">
                Employees
              </h1>

              <p className="mt-2 text-gray-500">
                Manage all employees in the system
              </p>

            </div>


            <button
              onClick={() => navigate("/add-employee")}
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              + Add Employee
            </button>

          </div>


          {/* Search & Filter */}
          <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm md:flex-row">


            {/* Search */}
            <input
              type="text"
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
              placeholder="Search by name or email..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />


            {/* Department */}
            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            >

              <option value="">
                All Departments
              </option>

              <option value="IT">
                IT
              </option>

              <option value="HR">
                HR
              </option>

              <option value="Finance">
                Finance
              </option>

              <option value="Marketing">
                Marketing
              </option>

            </select>


            {/* Minimum Salary */}
            <input
              type="number"
              value={minSalary}
              onChange={(e) =>
                setMinSalary(e.target.value)
              }
              placeholder="Minimum Salary"
              className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />

          </div>


          {/* Employee Table */}
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">


            {/* Loading */}
            {loading && (

              <div className="p-10 text-center text-gray-500">
                Loading employees...
              </div>

            )}


            {/* Error */}
            {error && (

              <div className="p-10 text-center text-red-600">
                {error}
              </div>

            )}


            {/* Empty */}
            {!loading &&
              !error &&
              filteredEmployees.length === 0 && (

                <div className="p-10 text-center text-gray-500">
                  No employees found.
                </div>

              )}


            {/* Table */}
            {!loading &&
              !error &&
              filteredEmployees.length > 0 && (

                <div>

                  <div className="overflow-x-auto">

                    <table className="w-full">

                      <thead className="border-b bg-gray-50">

                        <tr>

                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                            Employee
                          </th>

                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                            Department
                          </th>

                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                            Designation
                          </th>

                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                            Salary
                          </th>

                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                            Actions
                          </th>

                        </tr>

                      </thead>


                      <tbody className="divide-y divide-gray-100">

                        {filteredEmployees
                          .slice(0, visibleCount)
                          .map((employee) => (

                            <tr
                              key={employee._id}
                              className="transition hover:bg-gray-50"
                            >


                              {/* Employee */}
                              <td className="px-6 py-4">

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

                                    <p className="text-sm text-gray-500">
                                      {employee.email}
                                    </p>

                                  </div>

                                </div>

                              </td>


                              {/* Department */}
                              <td className="px-6 py-4">

                                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">

                                  {employee.department}

                                </span>

                              </td>


                              {/* Designation */}
                              <td className="px-6 py-4 text-gray-700">

                                {employee.designation}

                              </td>


                              {/* Salary */}
                              <td className="px-6 py-4 font-medium text-gray-900">

                                ₹
                                {Number(
                                  employee.salary
                                ).toLocaleString()}

                              </td>


                              {/* Actions */}
                              <td className="px-6 py-4">

                                <button
                                  onClick={() =>
                                    navigate(
                                      `/edit-employee/${employee._id}`
                                    )
                                  }
                                  className="mr-4 font-medium text-blue-600 hover:text-blue-800"
                                >
                                  Edit
                                </button>


                                <button
                                  onClick={() =>
                                    handleDelete(employee)
                                  }
                                  className="font-medium text-red-600 hover:text-red-800"
                                >
                                  Delete
                                </button>

                              </td>

                            </tr>

                          ))}

                      </tbody>

                    </table>

                  </div>


                  {/* LOAD MORE */}
                  {visibleCount < filteredEmployees.length && (

                    <div className="flex justify-center border-t border-gray-100 p-5">

                      <button
                        onClick={handleLoadMore}
                        className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700"
                      >
                        Load More
                      </button>

                    </div>

                  )}

                </div>

              )}

          </div>

        </div>

      </main>


      {/* DELETE POPUP */}
      {showDeletePopup && deleteEmployee && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">


            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">

              <span className="text-2xl">
                🗑️
              </span>

            </div>


            {/* Content */}
            <div className="mt-5 text-center">

              <h2 className="text-xl font-semibold text-gray-900">

                Delete Employee{" "}

                <span className="text-red-600">
                  {deleteEmployee.name}
                </span>

                ?

              </h2>


              <p className="mt-2 text-sm leading-6 text-gray-500">

                Are you sure you want to delete this employee?

                <br />

                This action cannot be undone.

              </p>

            </div>


            {/* Success Message */}
            {deleteSuccess && (

              <div className="mt-5 rounded-lg bg-green-50 p-3 text-center text-sm font-medium text-green-600">

                {deleteSuccess}

              </div>

            )}


            {/* Buttons */}
            {!deleteSuccess && (

              <div className="mt-6 flex gap-3">


                {/* Cancel */}
                <button
                  onClick={() => {

                    setShowDeletePopup(false);

                    setDeleteEmployee(null);

                  }}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>


                {/* Confirm */}
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition hover:bg-red-700"
                >
                  Yes, Delete
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

};


export default Employees;