"use server";
import connectDB from "./dbConnection";
import User from "@/models/userModel";

const auth = async (formData: any) => {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  });
  console.log(response, "resp");
};

export async function authenticate(_currentState: unknown, formData: FormData) {
  if (!formData.get("email") || !formData.get("password")) {
    return { message: "Email or Password is not provided." };
  }
  await connectDB();
  const email = formData.get("email");
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
