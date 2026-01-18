import { useState } from "react";

function TasksChart({ onAddNewTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="h-fit p-6 space-y-2 bg-slate-100 rounded-lg shadow flex flex-col gap-4">
      <h1>Tasks Chart</h1>
      <input
        className="rounded-md border border-green-200 outline-green-600 px-4 py-2"
        name="title"
        type="text"
        placeholder="Insert the title of the task"
        value={title}
        onInput={(event) => setTitle(event.target.value)}
      />
      <textarea
        className="rounded-md border border-green-200 outline-red-600 px-4 py-2"
        name="description"
        placeholder="Insert the description of the task"
        value={description}
        onInput={(event) => setDescription(event.target.value)}
      ></textarea>
      <button
        onClick={() => {
          if (!title.trim() || !description.trim()) {
            return alert("Insert the task title and description");
          }
          onAddNewTask(title, description);
          setTitle("");
          setDescription("");
        }}
        className="rounded-md bg-green-400 text-white px-4 py-2 text-medium"
      >
        Add
      </button>
    </div>
  );
}

export default TasksChart;
