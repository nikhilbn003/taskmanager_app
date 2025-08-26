import React from "react";

interface TaskCardProps {
  task: { _id: string; title: string; description: string; status: string };
  onEdit: (task: any) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded shadow flex flex-col gap-2 bg-white">
      {/* Title */}
      <h2
        className={`text-lg font-semibold ${
          task.status === "completed" ? "line-through text-green-600" : ""
        }`}
      >
        {task.title}
      </h2>

      {/* Description */}
      <p
        className={
          task.status === "completed"
            ? "line-through text-gray-500"
            : ""
        }
      >
        {task.description}
      </p>

      {/* Status */}
      <span
        className={`px-2 py-1 text-sm rounded w-fit ${
          task.status === "completed"
            ? "bg-green-100 text-green-700"
            : task.status === "in-progress"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {task.status}
      </span>

      {/* Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 transition"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 transition"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
