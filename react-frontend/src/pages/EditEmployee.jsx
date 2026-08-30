import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";


const EditEmployee = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [empData, setEmpData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    salary: ""
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // GET PARTICULAR EMPLOYEE
  useEffect(() => {

    const loadEmployee = async () => {

      try {

        const response = await fetch(
          `http://localhost:5000/api/employees/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch employee"
          );
        }

        setEmpData(data.employee);

      } catch (error) {

        setError(error.message);

      } finally {

        setLoading(false);

      }

    };

    loadEmployee();

  }, [id]);


  // UPDATE EMPLOYEE
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");
    setUpdating(true);

    try {

      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            ...empData,
            salary: Number(empData.salary)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update employee"
        );
      }

      setSuccess(
        data.message || "Employee updated successfully"
      );

      setEmpData(data.employee);

      setTimeout(() => {
        navigate("/employees");
      }, 1200);

    } catch (error) {

      setError(error.message);

    } finally {

      setUpdating(false);

    }

  };


  return (

    <div className="min-h-screen bg-gray-50">

      <Sidebar />


      <main className="ml-64 min-h-screen p-8">

        <div className="mx-auto max-w-5xl">


          {/* Page Header */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-900">
              Edit Employee
            </h1>

            <p className="mt-2 text-gray-500">
              Update employee information
            </p>

          </div>


          {/* Loading */}
          {loading && (

            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

              <p className="text-gray-500">
                Loading employee details...
              </p>

            </div>

          )}


          {/* Form */}
          {!loading && (

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">


              {/* Card Header */}
              <div className="border-b border-gray-100 px-8 py-6">

                <h2 className="text-xl font-semibold text-gray-900">
                  Employee Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Modify the details and save your changes
                </p>

              </div>


              <form
                onSubmit={handleSubmit}
                className="p-8"
              >

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


                  {/* Name */}
                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Employee Name
                    </label>

                    <input
                      type="text"
                      value={empData.name}
                      onChange={(e) =>
                        setEmpData({
                          ...empData,
                          name: e.target.value
                        })
                      }
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* Email */}
                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={empData.email}
                      onChange={(e) =>
                        setEmpData({
                          ...empData,
                          email: e.target.value
                        })
                      }
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* Department */}
                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Department
                    </label>

                    <select
                      value={empData.department}
                      onChange={(e) =>
                        setEmpData({
                          ...empData,
                          department: e.target.value
                        })
                      }
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >

                      <option value="">
                        Select Department
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

                      <option value="Operations">
                        Operations
                      </option>

                    </select>

                  </div>


                  {/* Designation */}
                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Designation
                    </label>

                    <input
                      type="text"
                      value={empData.designation}
                      onChange={(e) =>
                        setEmpData({
                          ...empData,
                          designation: e.target.value
                        })
                      }
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* Salary */}
                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Salary
                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        ₹
                      </span>

                      <input
                        type="number"
                        value={empData.salary}
                        onChange={(e) =>
                          setEmpData({
                            ...empData,
                            salary: e.target.value
                          })
                        }
                        required
                        className="w-full rounded-lg border border-gray-300 py-3 pl-9 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                    </div>

                  </div>

                </div>


                {/* Error */}
                {error && (

                  <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600">
                    {error}
                  </div>

                )}


                {/* Success */}
                {success && (

                  <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-600">
                    {success}
                  </div>

                )}


                <div className="my-8 border-t border-gray-100"></div>


                {/* Buttons */}
                <div className="flex justify-end gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/employees")
                    }
                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    disabled={updating}
                    className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {updating
                      ? "Updating..."
                      : "Update Employee"
                    }

                  </button>

                </div>

              </form>

            </div>

          )}

        </div>

      </main>

    </div>

  );

};

export default EditEmployee;