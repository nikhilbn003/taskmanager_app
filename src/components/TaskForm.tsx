import React, { useState, useEffect } from "react";

interface TaskFormProps {
  initialData?: { title: string; description: string; status: string };
  onSubmit: (data: { title: string; description: string; status: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status });
    setTitle("");
    setDescription("");
    setStatus("pending");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-4 flex flex-col gap-3">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {initialData ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
