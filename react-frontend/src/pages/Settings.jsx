import Sidebar from "../components/Sidebar";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSignOutAlt,
  FaShieldAlt,
  FaCamera
} from "react-icons/fa";


const Settings = () => {

  return (

    <div className="min-h-screen bg-gray-50">

      <Sidebar />


      {/* Main Content */}
      <main className="ml-64 min-h-screen p-8">

        <div className="mx-auto max-w-5xl">


          {/* Header */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-900">
              Settings
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your profile and account settings
            </p>

          </div>


          {/* ================= PROFILE ================= */}

          <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">


            {/* Section Header */}
            <div className="border-b border-gray-100 px-7 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FaUser />
                </div>

                <div>

                  <h2 className="font-semibold text-gray-900">
                    Profile Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Update your personal information
                  </p>

                </div>

              </div>

            </div>


            {/* Profile Content */}
            <div className="p-7">


              {/* Profile Picture */}
              <div className="mb-8 flex items-center gap-5">

                <div className="relative">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                    A
                  </div>

                  <button
                    type="button"
                    className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-xs text-white shadow"
                  >
                    <FaCamera />
                  </button>

                </div>


                <div>

                  <h3 className="font-semibold text-gray-900">
                    Profile Photo
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    JPG or PNG. Maximum size 2MB.
                  </p>

                </div>

              </div>


              {/* Form */}
              <div className="grid gap-6 md:grid-cols-2">


                {/* Name */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <div className="relative">

                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                  </div>

                </div>


                {/* Email */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>

                  <div className="relative">

                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />

                  </div>

                </div>

              </div>


              {/* Save */}
              <div className="mt-7 flex justify-end">

                <button
                  type="button"
                  className="rounded-xl bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>


          {/* ================= PASSWORD ================= */}

          <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">


            {/* Header */}
            <div className="border-b border-gray-100 px-7 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <FaLock />
                </div>

                <div>

                  <h2 className="font-semibold text-gray-900">
                    Change Password
                  </h2>

                  <p className="text-sm text-gray-500">
                    Keep your account secure with a strong password
                  </p>

                </div>

              </div>

            </div>


            {/* Password Form */}
            <div className="p-7">

              <div className="grid gap-6 md:grid-cols-2">


                {/* Current Password */}
                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Current Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />

                </div>


                {/* New Password */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    New Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />

                </div>


                {/* Confirm */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />

                </div>

              </div>


              <div className="mt-7 flex justify-end">

                <button
                  type="button"
                  className="rounded-xl bg-gray-900 px-6 py-2.5 font-medium text-white transition hover:bg-gray-800"
                >
                  Update Password
                </button>

              </div>

            </div>

          </div>


          {/* ================= SESSION ================= */}

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">


            <div className="border-b border-gray-100 px-7 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <FaShieldAlt />
                </div>

                <div>

                  <h2 className="font-semibold text-gray-900">
                    Account Session
                  </h2>

                  <p className="text-sm text-gray-500">
                    Manage your current login session
                  </p>

                </div>

              </div>

            </div>


            <div className="p-7">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

                    <p className="font-medium text-gray-900">
                      Current Session
                    </p>

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    You are currently signed in to EMS.
                  </p>

                </div>


                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 font-medium text-red-600 transition hover:bg-red-100"
                >

                  <FaSignOutAlt />

                  Logout

                </button>

              </div>

            </div>

          </div>


        </div>

      </main>

    </div>

  );

};


export default Settings;