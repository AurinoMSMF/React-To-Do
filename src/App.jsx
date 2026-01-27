import { useEffect, useState, useRef } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import TasksChart from "./components/TasksChart";
import { v4 } from "uuid";

function App() {
  const getTodaysDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  const getAllTasksObjects = () => {
    const allTasksObjects = JSON.parse(localStorage.getItem("allTasksObjects"));
    return allTasksObjects ? allTasksObjects : [];
  };

  const [currentAllTasksObjects, setAllTasksObjects] =
    useState(getAllTasksObjects());

  const [currentTodaysTasks, setTodaysTasks] = useState([]);

  const onAddNewTask = function (title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      date: getTodaysDate(),
      isComplete: false,
    };
    currentTodaysTasks.push(newTask);
    // console.log(currentTodaysTasks);

    setTodaysTasks(currentTodaysTasks);

    const todaysTasksObject = currentAllTasksObjects.find(
      (taskObject) => taskObject.date === newTask.date,
    );

    // console.log(todaysTasksObject);

    if (todaysTasksObject) {
      todaysTasksObject.tasks = currentTodaysTasks;

      const newAlltasksObjects = currentAllTasksObjects.filter(
        (taskObject) => taskObject.date !== newTask.date,
      );

      newAlltasksObjects.push(todaysTasksObject);

      setAllTasksObjects(newAlltasksObjects);
    }
  };

  const updateAllTasksObjects = (updatedTasks) => {
    const todaysDate = getTodaysDate();

    const todaysTasksObject = currentAllTasksObjects.find(
      (taskObject) => taskObject.date === todaysDate,
    );

    todaysTasksObject.tasks = updatedTasks;

    setAllTasksObjects((previousAllTasksObjects) =>
      previousAllTasksObjects.map((dayObject) => {
        if (dayObject.date === todaysDate) {
          return todaysTasksObject;
        }

        return dayObject;
      }),
    );
  };

  const onTaskClick = function (taskId) {
    const updatedTasks = currentTodaysTasks.map((task) => {
      if (taskId === task.id) {
        return { ...task, isComplete: !task.isComplete };
      }

      return task;
    });

    setTodaysTasks(updatedTasks);

    console.log(updatedTasks);
    updateAllTasksObjects(updatedTasks);
  };

  const onDeleteTask = function (taskId) {
    const updatedTasks = currentTodaysTasks.filter(
      (task) => taskId !== task.id,
    );

    setTodaysTasks(updatedTasks);

    updateAllTasksObjects(updatedTasks);
  };

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    if (currentAllTasksObjects) {
      const todaysDate = getTodaysDate();

      let todaysTasks = [];

      const todaysTasksObject = currentAllTasksObjects.find(
        (taskObject) => taskObject.date === todaysDate,
      );

      if (todaysTasksObject) {
        todaysTasks = todaysTasksObject.tasks;

        setTodaysTasks(todaysTasks);

        return;
      }

      const newTodaysTasksObject = {};
      newTodaysTasksObject.date = todaysDate;
      newTodaysTasksObject.tasks = todaysTasks;

      // Stacks the new object for the daily tasks collection in the array with all tasks objects.
      setAllTasksObjects((previousDaysObjects) => [
        ...previousDaysObjects,
        newTodaysTasksObject,
      ]);

      setTodaysTasks([]);
    }
  }, []);

  useEffect(() => {
    // console.log(currentTodaysTasks);
    localStorage.setItem(
      "allTasksObjects",
      JSON.stringify(currentAllTasksObjects),
    );
  }, [currentAllTasksObjects]);

  return (
    <div className="w-full h-screen bg-green-300 grid sm:grid-cols-1 md:grid-cols-2 mx-auto justify-items-center p-6 gap-4">
      <div className="w-full max-w-[28rem] h-auto text-center text-2xl rounded-md flex flex-col gap-6">
        <TasksChart currentAllTasksObjects={currentAllTasksObjects} />
      </div>
      <div className="w-full max-w-[28rem] h-auto text-center text-2xl rounded-md flex flex-col gap-6">
        <AddTask onAddNewTask={onAddNewTask} />
        <Tasks
          tasks={currentTodaysTasks}
          onTaskClick={onTaskClick}
          onDeleteTask={onDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
