import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/dbConfig/dbConfig";

connectDB()
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password || "");

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    //storing the NextResponse.json in cookies is more secure
    

    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: { email: user.email, username: user.username },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
