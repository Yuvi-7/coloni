"use client";
import { authenticate } from "@/lib/action";
import { useFormState } from "react-dom";

const SignIn = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  console.log(errorMessage, "errorMessage");

    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
        <form className="flex flex-col" >
          <input
            type="email"
            name="email"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Username or Email address"
          />
          <input
            type="password"
            name="password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
          />
          <div className="flex items-center justify-between flex-wrap">
            <label
              htmlFor="remember-me"
              className="text-sm text-gray-900 cursor-pointer"
            >
              <input type="checkbox" id="remember-me" className="mr-2" />
              Remember me
            </label>
            <a
              href="#"
              className="text-sm text-blue-500 hover:underline mb-0.5"
            >
              Forgot password?
            </a>
            <p className="text-gray-900 mt-4">
              Don't have an account?
              <a
                href="#"
                className="text-sm text-blue-500 -200 hover:underline mt-4"
              >
                Signup
              </a>
            </p>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            onClick={async (e) => {
              e.preventDefault();
              const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: "",
              });
              console.log(response, "response");
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
