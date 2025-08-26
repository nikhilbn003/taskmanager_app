import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);

  // Fetch tasks for logged-in user
  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
      setTasks(res.data);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (data: { title: string; description: string; status: string }) => {
    try {
      if (editTask) {
        const res = await axiosInstance.put(`/tasks/${editTask._id}`, data);
        setTasks(tasks.map(t => t._id === editTask._id ? res.data : t));
        setEditTask(null);
      } else {
        const res = await axiosInstance.post("/tasks", data);
        setTasks([...tasks, res.data]);
      }
    } catch (err: any) {
     
      alert(err.response?.data?.message || "Failed to save task");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Task Dashboard</h1>

        <TaskForm initialData={editTask ?? undefined} onSubmit={handleCreate} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No tasks yet!</p>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={setEditTask}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
