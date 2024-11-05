"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [loading, setLoading] = useState(false);

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/me");
      setData(response.data.data._id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      alert("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Profile Page</h1>
        
      
        <div className="mb-4">
          <h2 className="text-xl text-center">
            {data === "nothing" ? (
              <span className="text-gray-500">No user data available</span>
            ) : (
              <Link href={`/profile/${data}`} className="text-blue-500 hover:underline">
                {data}
              </Link>
            )}
          </h2>
        </div>

        <div className="space-y-4">
           
          <button
            onClick={getUserDetails}
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-md ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {loading ? "Loading..." : "Get User Details"}
          </button>

          
          <button
            onClick={logOut}
            className="w-full py-2 px-4 text-white font-semibold rounded-md bg-red-500 hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
