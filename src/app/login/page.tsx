"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function LogInPage() {
  const [user, setUser] = useState({
    email: "",

    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onlogIN = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Log-IN Successfully!");
      router.push("/profile");
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "log IN failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!user.email ||  !user.password);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          {loading ? "Processing..." : "Log-IN"}
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="button"
            onClick={onlogIN}
            className={`w-full py-2 px-4 rounded text-white ${
              buttonDisabled || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
            disabled={buttonDisabled || loading}
          >
            {loading ? "Signing Up..." : "Log-IN"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? 
          <Link href="/signup" className="text-teal-600 hover:text-teal-500">
            Visit Sign Up Page
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogInPage;
