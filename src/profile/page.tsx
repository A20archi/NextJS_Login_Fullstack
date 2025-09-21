'use client';

import React, { useEffect, useState } from 'react';

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
        async function fetchUser() {
            try {
                const res = await fetch('/api/users/profile');
                if (!res.ok) throw new Error('Failed to fetch user');
                const data = await res.json();
                setUser(data);
            } catch (err: any) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span>Loading...</span>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-red-500">{error || 'User not found'}</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
                <div className="flex flex-col items-center">
                    <img
                        src={user.avatarUrl || 'https://i.pravatar.cc/150'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full shadow mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                    <p className="text-gray-500 mb-4">{user.email}</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition mb-6">
                        Edit Profile
                    </button>
                </div>
                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-gray-700">
                        {user.about || "No information provided."}
                    </p>
                </div>
            </div>
        </div>
    );
}