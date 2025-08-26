import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
