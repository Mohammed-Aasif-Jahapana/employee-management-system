import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/employees`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            department,
            designation,
            salary: Number(salary)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add employee"
        );
      }

      setSuccess(data.message);

      setName("");
      setEmail("");
      setDepartment("");
      setDesignation("");
      setSalary("");

      setTimeout(() => {
        navigate("/employees");
      }, 1000);

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">

      <Sidebar />


      <main className="ml-64 min-h-screen p-8">

        <div className="mx-auto max-w-5xl">

          {/* Header */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-900">
              Add Employee
            </h1>

            <p className="mt-2 text-gray-500">
              Add a new employee to the organization
            </p>

          </div>


          {/* Form Card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            <div className="border-b border-gray-100 px-8 py-6">

              <h2 className="text-xl font-semibold text-gray-900">
                Employee Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the employee details below
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
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter employee name"
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
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="employee@example.com"
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
                    value={department}
                    onChange={(e) =>
                      setDepartment(e.target.value)
                    }
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="">
                      Select department
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
                    value={designation}
                    onChange={(e) =>
                      setDesignation(e.target.value)
                    }
                    placeholder="e.g. Frontend Developer"
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
                      min="1"
                      value={salary}
                      onChange={(e) =>
                        setSalary(e.target.value)
                      }
                      placeholder="50000"
                      required
                      className="w-full rounded-lg border border-gray-300 py-3 pl-9 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                </div>

              </div>


              {/* Error */}
              {error && (
                <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}


              {/* Success */}
              {success && (
                <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-600">
                  {success}
                </div>
              )}


              <div className="my-8 border-t border-gray-100"></div>


              {/* Buttons */}
              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => navigate("/employees")}
                  className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Adding Employee..."
                    : "Add Employee"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
};

export default AddEmployee;