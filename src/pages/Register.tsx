import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/register", { username, email, password });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 via-teal-400 to-blue-500">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold mb-4 text-center text-green-600">Register Account</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button>
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span className="text-green-600 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
