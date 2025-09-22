"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const carouselImages = ["/iitbhu_1.webp", "/iitbhu_2.webp", "/iitbhu_3.webp"];

interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UserResponse {
  message: string;
  token?: string;
  user?: { email: string; username: string };
}

function LeftPaneCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center text-center p-8 bg-[#f5e8d0] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={carouselImages[current]}
            alt={`IIT BHU Slide ${current + 1}`}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#f5e8d0]/70"></div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-4 left-4 z-10">
        <Image
          src="/iitbhu_logo.webp"
          alt="IIT BHU Logo"
          width={120}
          height={120}
        />
      </div>

      <div className="absolute top-4 right-4 z-10">
        <Image
          src="/madan_mohan_malviya.webp"
          alt="Madan Mohan Malviya"
          width={100}
          height={100}
          className="rounded-full border border-brown-800"
        />
      </div>

      <div className="z-10 mt-20 px-4">
        <h1 className="text-4xl font-extrabold text-[#5c4033] mb-4 drop-shadow-lg">
          Welcome to IIT BHU
        </h1>
        <p className="text-[#513a2a] text-lg leading-relaxed">
          Upholding a century-long legacy of academic excellence and rigor, IIT
          (BHU) Varanasi fosters innovation, leadership, and holistic education.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
  });
  const [showSignup, setShowSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post<UserResponse>("/api/users/login", loginData);
      if (res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Login successful!");
        router.push("/profile");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post<UserResponse>(
        "/api/users/signup",
        signupData
      );
      if (res.status === 201) {
        toast.success("Signup successful! Please login.");
        setShowSignup(false);
        setSignupData({ username: "", email: "", password: "" });
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#d4b595] to-[#f5e8d0]">
      <Toaster position="top-right" />

      <div className="w-4/5 hidden md:flex">
        <LeftPaneCarousel />
      </div>

      <div className="w-full md:w-3/5 flex items-center justify-center bg-[#e6d3b3] p-4">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-[#5c4033] mb-6 text-center">
            {showSignup ? "Sign Up" : "Login"}
          </h2>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <form
            onSubmit={showSignup ? handleSignup : handleLogin}
            className="flex flex-col gap-4 text-amber-900"
          >
            {showSignup && (
              <input
                type="text"
                name="username"
                value={signupData.username}
                onChange={handleSignupChange}
                placeholder="Username"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#451414]"
                required
              />
            )}

            <input
              type="email"
              name="email"
              value={showSignup ? signupData.email : loginData.email}
              onChange={showSignup ? handleSignupChange : handleLoginChange}
              placeholder="Email"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#451414]"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={showSignup ? signupData.password : loginData.password}
                onChange={showSignup ? handleSignupChange : handleLoginChange}
                placeholder="Password"
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5d4228]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5c4033] hover:text-[#8b5e3c]"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>

            {/* ✅ Forgot Password Button */}
            {!showSignup && (
              <div className="text-sm text-right">
                <Link
                  href="/forgot-password"
                  className="text-[#8b5e3c] hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`bg-[#8b5e3c] hover:bg-[#734c30] text-white font-semibold py-2 rounded-lg transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {showSignup ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-center text-[#6b4f3b] mt-4">
            {showSignup ? (
              <>
                Already have an account?{" "}
                <button
                  className="text-[#8b5e3c] hover:underline"
                  onClick={() => setShowSignup(false)}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button
                  className="text-[#8b5e3c] hover:underline"
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
