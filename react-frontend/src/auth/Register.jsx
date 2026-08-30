import React from 'react'

import { useState } from "react";
import { FaTimes, FaUsers, FaBuilding, FaChartLine  } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { Link } from 'react-router-dom';

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("submit clicked");
        console.log("formData:", formData);

        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            console.log("password mismatch");
            setError("Password and confirm password do not match");
            return;
        }

        console.log("before fetch");

        try {
            const response = await fetch(
                "http://localhost:5000/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            console.log("after fetch", response);

            const data = await response.json();

            console.log("response data:", data);

        } catch (error) {
            console.log("fetch error:", error);
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
                            className="space-y-5"
                        >


                            {/* Name */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
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
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>


                            {/* Password */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>


                            {/* Confirm Password */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>


                            {/* Error */}
                            {error && (

                                <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
                                    {error}
                                </div>

                            )}


                            {/* Success */}
                            {success && (

                                <div className="rounded-lg bg-green-50 p-3 text-sm font-medium text-green-600">
                                    {success}
                                </div>

                            )}


                            {/* Register */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"
                                }

                            </button>


                            {/* Login text */}
                            <p className="text-center text-sm text-gray-500">

                                Already have an account?{" "}

                                <button
                                    type="button"
                                    className="font-medium text-blue-600 hover:text-blue-700"
                                >
                                    <Link to="/login">
                                    Login
                                    </Link>
                                    
                                </button>

                            </p>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Register
















