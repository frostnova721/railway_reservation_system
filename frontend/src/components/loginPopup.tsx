import React, { useState } from "react";
import "../style/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPopup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false)

  const api = import.meta.env.API || "http://127.0.0.1:3000/user/";

  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
    const res =  
        await axios.post(api + "login", {
          password,
          email,
        }, { validateStatus: () => true})

        if(res.status != 201) {
            return setError(true)
        }
  
      localStorage.setItem('token', res.data.token)
  
      nav(`/dashboard`);
  };

  return (
    <div className="p-8 h-full flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-6 flex flex-col">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Sign In</h2>
          <p className="mt-2 text-gray-400">
            { error ? "Invalid Email or Password" : "Welcome back! Please sign in to your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 bg-gray-700 border ${error ? "border-red-800" :"border-gray-600"} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500`}
              placeholder="Email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full px-3 py-2 bg-gray-700 border ${error ? "border-red-800" :"border-gray-600"} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex text-lg font-bold justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-neutral-900 bg-white
               hover:bg-transparent hover:outline-1 hover:outline-white hover:text-white"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
