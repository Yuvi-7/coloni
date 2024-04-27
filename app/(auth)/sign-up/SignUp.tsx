"use client";
import React, { FormEvent } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        fullname: formData.get("fullname"),
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });
    const resData = await res.json();
    if (!res.ok) {
      return toast.error(resData?.message);
    }

    toast.success(resData?.message);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
        <p className="text-gray-600 text-[11px] mb-4">
          Create a free account or
          <a
            href="/sign-in"
            className="hover:text-blue-900 font-medium hover:underline pl-1"
          >
            log in
          </a>
        </p>

        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="email"
            name="email"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Mobile Number or Email"
          />
          <input
            type="text"
            name="fullname"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Full Name"
          />
          <input
            type="text"
            name="username"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
          />

          <p className="text-gray-600 mt-4 text-[11px]">
            By clicking Sign Up, you agree to our
            <a
              href=""
              className="hover:text-blue-900 font-medium hover:underline pl-1"
            >
              Terms
            </a>
            ,
            <a
              href=""
              className="hover:text-blue-900 font-medium hover:underline px-1"
            >
              Privacy Policy
            </a>
            and
            <a
              href=""
              className="hover:text-blue-900 font-medium hover:underline pl-1"
            >
              Cookies Policy
            </a>
            . You may receive SMS notifications from us and can opt out at any
            time.
          </p>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
