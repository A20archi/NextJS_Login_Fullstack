"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative w-screen h-screen">
      {/* Background Image */}
      <Image
        src="/IITBHU_Varanasi_banner.webp"
        alt="IIT BHU Campus"
        fill
        priority
        className="object-cover"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold drop-shadow-lg"
        >
          Welcome to IIT BHU
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/login")}
          className="mt-8 bg-white/80 text-[#5C4033] font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-white transition"
        >
          Move to Login / Signup
        </motion.button>
      </div>
    </div>
  );
}
