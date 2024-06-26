import { NextResponse } from "next/server";
import connectDB from "../../../lib/dbConnection";
import User from "../../../models/userModel";
import { auth } from "../auth/auth";

export async function GET() {
  try {
    await connectDB();
    const session = await auth();

    const users = await User.find(
      { _id: { $ne: session?.user?.id } },
      "-password"
    );

    if (users) {
      return NextResponse.json({ users }, { status: 200 });
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
