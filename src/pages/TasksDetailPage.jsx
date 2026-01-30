import { useNavigate, useSearchParams } from "react-router-dom";

function TaskDetailPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return (
    <div className="w-screen h-screen bg-green-300 text-center text-medium flex justify-center p-6">
      <div
        data-test="task-details-container"
        className="task-details-container h-80 w-96 p-6 space-y-2 text-2xl bg-slate-100 rounded-lg shadow flex flex-col gap-4"
      >
        <h1>Task Details</h1>
        <div
          data-test="task-details-title"
          className="task-details-title h-15 w-[100%] bg-white rounded-md border border-green-200 outline-green-600 px-4 py-2"
          name="title"
          type="text"
          placeholder="Insert the title of the task"
        >
          {title}
        </div>
        <div
          data-test="task-details-description"
          className="task-details-description h-20 w-[100%] overflow-y-auto break-words text-xl rounded-md border bg-white  border-green-200 outline-red-600 px-4 py-2"
          name="description"
          placeholder="Insert the description of the task"
        >
          {description}
        </div>
        <button
          data-test="task-details-goback-button"
          onClick={() => navigate(-1)}
          className="task-details-goback-button rounded-md bg-green-400 text-white px-4 py-2 text-medium"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default TaskDetailPage;
