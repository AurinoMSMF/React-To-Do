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

  if (tasks === null || tasks?.length == 0) {
    return;
  }

  return (
    <ul
      data-test="tasks-list"
      className="tasks-list h-96 p-6 overflow-y-auto scrollbar-thin space-y-2 bg-slate-100 rounded-lg shadow"
    >
      {tasks.map((task) => {
        if (task !== "") {
          return (
            <li
              data-test="task-item"
              key={task.id}
              className="task-item flex gap-2"
            >
              <button
                data-test="task-title-button"
                onClick={() => onTaskClick(task.id)}
                className={`task-title-button w-full text-white text-left text-2xl flex items-center flex-row gap-3 p-2 rounded-md bg-green-400 ${
                  task.isComplete && "line-through"
                }`}
              >
                {task.isComplete && <CheckIcon />}
                {task.title}
              </button>
              <TaskButton
                data-test="task-details-button"
                onClick={() => onClickDetailsButton(task)}
                className="task-details-button text-2xl p-2 rounded-md bg-green-400"
              >
                <InfoIcon color="white" />
              </TaskButton>
              <TaskButton
                data-test="task-deletion-button"
                onClick={() => onDeleteTask(task.id)}
                className="task-deletion-button text-2xl p-2 rounded-md bg-green-400"
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
