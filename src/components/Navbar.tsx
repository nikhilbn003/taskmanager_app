import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">Task Manager</h1>
      <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
