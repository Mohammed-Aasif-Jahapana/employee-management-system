import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaUsers,
    FaBuilding,
    FaChartLine
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";  


const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!formData.email || !formData.password) {
            setError("Email and password are required");
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                }
            );

            const result = await response.json();


            if (!response.ok) {
                throw new Error(
                    result.message || "Login failed"
                );
            }

            localStorage.setItem("token", result.token);

            localStorage.setItem("user", JSON.stringify(result.user));

            console.log("Login Response:", result);

            navigate("/");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100">

           

            <div className="flex min-h-screen">


                {/* ================= LEFT PANEL ================= */}

                <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 lg:flex lg:flex-col lg:justify-between lg:p-12">


                    {/* Background decoration */}
                    <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5"></div>

                    <div className="absolute bottom-20 right-10 h-64 w-64 rounded-full border border-white/10"></div>

                    <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-blue-400/10"></div>


                    {/* Logo */}
                    <div className="relative z-10">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-bold text-blue-700 shadow-lg">
                            EMS
                        </div>

                    </div>


                    {/* Main content */}
                    <div className="relative z-10 max-w-xl">

                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
                            Employee Management System
                        </p>

                        <h1 className="text-5xl font-bold leading-tight text-white">
                            Manage your team
                            <span className="block text-blue-300">
                                efficiently.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-blue-100">
                            Manage employees, departments and workforce information
                            from one simple and powerful dashboard.
                        </p>


                        {/* Dashboard preview */}
                        <div className="mt-10 rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md">


                            {/* Mini top bar */}
                            <div className="mb-5 flex items-center justify-between">

                                <div>

                                    <h3 className="font-semibold text-white">
                                        Workforce Overview
                                    </h3>

                                    <p className="text-xs text-blue-200">
                                        Employee statistics
                                    </p>

                                </div>

                                <div className="rounded-lg bg-white/10 px-3 py-1 text-xs text-blue-100">
                                    Dashboard
                                </div>

                            </div>


                            {/* Stats cards */}
                            <div className="grid grid-cols-3 gap-3">

                                <div className="rounded-2xl bg-white p-4">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-xs text-slate-500">
                                                Employees
                                            </p>

                                            <h3 className="mt-1 text-2xl font-bold text-slate-900">
                                                245
                                            </h3>

                                        </div>

                                        <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
                                            <FaUsers />
                                        </div>

                                    </div>

                                </div>


                                <div className="rounded-2xl bg-white p-4">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-xs text-slate-500">
                                                Departments
                                            </p>

                                            <h3 className="mt-1 text-2xl font-bold text-slate-900">
                                                12
                                            </h3>

                                        </div>

                                        <div className="rounded-xl bg-green-100 p-2 text-green-600">
                                            <FaBuilding />
                                        </div>

                                    </div>

                                </div>


                                <div className="rounded-2xl bg-white p-4">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-xs text-slate-500">
                                                Active
                                            </p>

                                            <h3 className="mt-1 text-2xl font-bold text-slate-900">
                                                231
                                            </h3>

                                        </div>

                                        <div className="rounded-xl bg-orange-100 p-2 text-orange-600">
                                            <FaChartLine />
                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* Lower preview */}
                            <div className="mt-4 grid grid-cols-5 gap-4">


                                {/* Employees */}
                                <div className="col-span-3 rounded-2xl bg-white p-4">

                                    <p className="mb-4 text-xs font-semibold text-slate-800">
                                        Recent Employees
                                    </p>

                                    <div className="space-y-4">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                                                A
                                            </div>

                                            <div className="h-2 w-28 rounded-full bg-slate-200"></div>

                                        </div>


                                        <div className="flex items-center gap-3">

                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600">
                                                R
                                            </div>

                                            <div className="h-2 w-32 rounded-full bg-slate-200"></div>

                                        </div>


                                        <div className="flex items-center gap-3">

                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-600">
                                                S
                                            </div>

                                            <div className="h-2 w-24 rounded-full bg-slate-200"></div>

                                        </div>

                                    </div>

                                </div>


                                {/* Bar chart */}
                                <div className="col-span-2 flex items-end rounded-2xl bg-white p-4">

                                    <div className="flex h-28 w-full items-end gap-2">

                                        <div className="h-10 flex-1 rounded-t-md bg-blue-200"></div>

                                        <div className="h-16 flex-1 rounded-t-md bg-blue-300"></div>

                                        <div className="h-12 flex-1 rounded-t-md bg-blue-400"></div>

                                        <div className="h-24 flex-1 rounded-t-md bg-blue-500"></div>

                                        <div className="h-20 flex-1 rounded-t-md bg-blue-600"></div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Bottom text */}
                    <div className="relative z-10 text-sm text-blue-200">
                        EMS • Employee Management made simple
                    </div>

                </div>



                {/* ================= RIGHT PANEL ================= */}

                <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-16">


                    <div className="w-full max-w-md">


                        {/* Mobile Logo */}
                        <div className="mb-8 flex justify-center lg:hidden">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
                                EMS
                            </div>

                        </div>


                        {/* Heading */}
                        <div className="mb-8">

                            <div className="mb-6 hidden h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg lg:flex">
                                EMS

                               
                                
                            </div>

                            <h1 className="text-4xl font-bold text-slate-900">
                                Welcome Back
                            </h1>
 

                            <p className="mt-3 text-slate-500">
                                Login to continue to your Employee Management System
                            </p>

                        </div> 

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >


                            {/* Email */}
                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Email Address
                                </label>

                                <div className="relative">

                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-slate-300 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />

                                </div>

                            </div>


                            {/* Password */}
                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Password
                                </label>

                                <div className="relative">

                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full rounded-xl border border-slate-300 py-3.5 pl-11 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                                    >

                                        {showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                        }

                                    </button>

                                </div>

                            </div>


                            {/* Remember + forgot */}
                            <div className="flex items-center justify-between">

                                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">

                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) =>
                                            setRememberMe(e.target.checked)
                                        }
                                        className="h-4 w-4"
                                    />

                                    Remember me

                                </label>


                                <button
                                    type="button"
                                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Forgot password?
                                </button>

                            </div>


                            {/* Error */}
                            {error && (

                                <div className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
                                    {error}
                                </div>

                            )}


                            {/* Login button */}
                            <GoogleLogin
                                onSuccess={async (credentialResponse) => {

                                    try {

                                        const response = await fetch(
                                            "http://localhost:5000/api/google-login",
                                            {
                                                method: "POST",

                                                headers: {
                                                    "Content-Type": "application/json"
                                                },

                                                body: JSON.stringify({
                                                    credential: credentialResponse.credential
                                                })
                                            }
                                        );

                                        const result = await response.json();

                                        console.log("Google Login Result:", result);

                                        if (!response.ok) {
                                            throw new Error(
                                                result.message || "Google login failed"
                                            );
                                        }

                                        localStorage.setItem("token", result.token);
                                        localStorage.setItem("user",JSON.stringify(result.user));

                                        navigate("/");

                                    } catch (error) {

                                        console.log(error);
                                        setError(error.message);

                                    }

                                }}

                                onError={() => {
                                    console.log("Google Login Failed");
                                }}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {loading
                                    ? "Logging in..."
                                    : "Login"
                                }

                            </button>


                            {/* Divider */}
                            <div className="flex items-center gap-4">

                                <div className="h-px flex-1 bg-slate-200"></div>

                                <span className="text-xs text-slate-400">
                                    NEW TO EMS?
                                </span>

                                <div className="h-px flex-1 bg-slate-200"></div>

                            </div>


                            {/* Register */}
                           
                                <button className="w-full rounded-xl border border-slate-300 bg-white py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50">
                                   <Link to="/register">
                                   Create New Account
                                   </Link>
                                    
                                </button>
                            


                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Login;