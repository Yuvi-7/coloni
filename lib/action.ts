"use server";
import connectDB from "./dbConnection";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export async function signUpAuth(_currentState: unknown, formData: FormData) {
  await connectDB();
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);

  if (!email || !password) {
    return { message: "All fields are mandatory!" };
  }

  const userAvailable = await User.findOne({ email });
  console.log(userAvailable, "userAvailable");
  if (userAvailable) {
    console.log("1213");
    return { message: "User already registered!" };
  }

  // Hash password
  const hashedPassword =
    typeof password === "string" && (await bcrypt.hash(password, 10));
  console.log(hashedPassword, "hash");
  const user = await User.create({
    email,
    password: hashedPassword,
  });

  if (user) {
    redirect("/sign-in");
  } else {
    return { message: "User data is not valid!" };
  }
}

export async function authenticate(_currentState: unknown, formData: FormData) {
  if (!formData.get("email") || !formData.get("password")) {
    return { message: "Email or Password is not provided." };
  }
  await connectDB();
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password, "pp", typeof password);

  const user = await User.findOne({ email });
  const reader = new FileReader();

  //compare password with hashed password
  if (
    user &&
    typeof password === "string" &&
    (await bcrypt.compare(password, user.password))
  ) {
    const acccesToken = jwt.sign(
      {
        user: { name: user.name, email: user.email, id: user.id },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "30m" }
    );
    // res.status(200).json({ acccesToken });
  } else {
    // res.status(401);
    throw new Error("Email or Password is not valid!");
  }

  // const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword, "hash");
  // const user = await User.create({
  //   // username,
  //   email,
  //   password: hashedPassword,
  // });

  // console.log(user, "user created");
  // console.log(userAvailable, "userAvailable");
  // auth(formData);

  //   const userAvailable = await User.findOne({ email });
  //   if (userAvailable) {
  //     res.status(400);
  //     throw new Error("User already registered!");
  //   }

  //   try {
  //     await signIn("credentials", formData);
  //   } catch (error) {
  //     if (error) {
  //       switch (error.type) {
  //         case "CredentialsSignin":
  //           return "Invalid credentials.";
  //         default:
  //           return "Something went wrong.";
  //       }
  //     }
  //     throw error;
  //   }
}
