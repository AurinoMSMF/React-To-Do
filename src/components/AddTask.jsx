import { useState } from "react";
import TaskInput from "./TaskInput";
import TaskTextArea from "./TaskTextArea";

function AddTask({ onAddNewTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div
      data-test="task-creation-container"
      className="task-creation-container h-fit p-6 space-y-2 bg-slate-100 rounded-lg shadow flex flex-col gap-4"
    >
      <h1>Add Task</h1>
      <TaskInput
        name="title"
        type="text"
        placeholder="Insert the title of the task"
        title={title}
        description={description}
        setTitle={setTitle}
        onInput={(event) => setTitle(event.target.value)}
      />
      <TaskTextArea
        name="description"
        placeholder="Insert the description of the task"
        value={description}
        setDescription={setDescription}
        onInput={(event) => setDescription(event.target.value)}
      />
      <button
        data-test="task-creation-button"
        onClick={() => {
          if (!title.trim() || !description.trim()) {
            return alert("Insert the task title and description");
          }
          onAddNewTask(title, description);
          setTitle("");
          setDescription("");
        }}
        className="task-creation-button rounded-md bg-green-400 text-white px-4 py-2 text-medium"
      >
        Add
      </button>
    </div>
  );
}

export default AddTask;
