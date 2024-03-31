"use server";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import connectDB from "@/lib/dbConnection";

export async function POST(req: Request) {
  try {
    const { email, password, username, fullname } = await req.json();
    console.log(req.json(), "res");

    if (!username || !email || !password || !fullname) {
      return NextResponse.json(
        { message: "All fields are mandatory!" },
        { status: 400 }
      );
    }

    await connectDB();
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return NextResponse.json(
        { message: "User already registered!" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      return NextResponse.json(
        {
          _id: user.id,
          email: user.email,
          username: user.username,
          fullname: user.fullname,
          message: "Sign-up successful! You can now log in.",
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "User data is not valid!" },
        { status: 400 }
      );
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
