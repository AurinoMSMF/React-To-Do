import { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import TasksChart from "./components/TasksChart";
import { v4 } from "uuid";

function App() {
  // const [count, setCount] = useState(0);
  // <div className="card">
  //   <button onClick={() => setCount((count) => count + 1)}>
  //     count is {count}
  //   </button>
  // </div>
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")));

  const onAddNewTask = function (title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
    };

    setTasks([...tasks, newTask]);
  };

  const onTaskClick = function (taskId) {
    const updatedTasks = tasks.map((task) => {
      if (taskId === task.id) {
        return { ...task, isComplete: !task.isComplete };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  const onDeleteTask = function (taskId) {
    const updatedTasks = tasks.filter((task) => taskId !== task.id);

    setTasks(updatedTasks);
  };

  useEffect(() => {
    if (tasks === null || tasks?.length == 0) {
      return localStorage.setItem("tasks", JSON.stringify(""));
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="w-screen h-screen bg-green-300 grid grid-cols-2 grid-flow-col justify-items-center p-6 gap-4">
      <div className="w-[28rem] h-auto text-center text-2xl rounded-md flex flex-col gap-6">
        <TasksChart tasks={tasks} />
      </div>
      <div className="w-[28rem] h-auto text-center text-2xl rounded-md flex flex-col gap-6">
        <AddTask onAddNewTask={onAddNewTask} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTask={onDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
