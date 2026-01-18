import { CheckIcon, InfoIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TaskButton from "./TaskButton";

function Tasks({ tasks, onTaskClick, onDeleteTask }) {
  const navigate = useNavigate();

  const onClickDetailsButton = function (task) {
    const queryParams = new URLSearchParams();

    queryParams.set("title", task.title);
    queryParams.set("description", task.description);

    navigate(`/task-details?${queryParams.toString()}`);
  };
  console.log(tasks);
  if (tasks === null || tasks?.length == 0) {
    return;
  }

  return (
    <ul className="h-fit p-6 space-y-2 bg-slate-100 rounded-lg shadow">
      {tasks.map((task) => {
        if (task !== "") {
          return (
            <li key={task.id} className="flex gap-2">
              <button
                onClick={() => onTaskClick(task.id)}
                className={`w-full text-white text-left text-2xl p-2 rounded-md bg-green-400 ${
                  task.isComplete && "line-through"
                }`}
              >
                {task.isComplete && <CheckIcon />}
                {task.title}
              </button>
              <TaskButton
                onClick={() => onClickDetailsButton(task)}
                className="text-2xl p-2 rounded-md bg-green-400"
              >
                <InfoIcon color="white" />
              </TaskButton>
              <TaskButton
                onClick={() => onDeleteTask(task.id)}
                className="text-2xl p-2 rounded-md bg-green-400"
              >
                <TrashIcon color="white" />
              </TaskButton>
            </li>
          );
        }
      })}
    </ul>
  );
}

export default Tasks;
