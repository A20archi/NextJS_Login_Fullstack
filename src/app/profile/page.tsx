"use client";

import React, { useEffect, useState } from "react";

type UserProfile = {
  name: string;
  email: string;
  avatarUrl?: string;
  about?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      setError("User not found");
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5e8d0]">
        <div className="w-12 h-12 border-4 border-[#8b5e3c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5e8d0]">
        <span className="text-red-600 text-lg">
          {error || "User not found"}
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5e8d0] flex items-center justify-center p-4">
      <div className="bg-[#e6d3b3] rounded-xl shadow-lg max-w-md w-full p-8">
        <div className="flex flex-col items-center">
          <button
            onClick={handleLogout}
            className="self-end mb-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
          <img
            src={user.avatarUrl || "https://i.pravatar.cc/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow mb-4"
          />
          <h2 className="text-2xl font-bold mb-1 text-[#5c4033]">
            {user.name}
          </h2>
          <p className="text-[#513a2a] mb-4">{user.email}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition mb-6">
            Edit Profile
          </button>
        </div>
        <div className="border-t border-[#8b5e3c] pt-6">
          <h3 className="text-lg font-semibold mb-2 text-[#5c4033]">About</h3>
          <p className="text-[#513a2a]">
            {user.about || "No information provided."}
          </p>
        </div>
      </div>
    </div>
  );
}
