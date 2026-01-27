import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskDetailPage from "./pages/TasksDetailPage.jsx";
// import { DatabaseSync } from "node:sqlite";

// const db = new DatabaseSync("todo_system.db");

// const createTables = () => {
//   db.exec(`
//       CREATE TABLE IF NOT EXISTS tasks (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         title TEXT NOT NULL,
//         description TEXT NOT NULL,
//         created_at DATE DEFAULT (DATE('now')),
//         expired INT DEFAULT 0
//       );
//     `);
// };

// const deleteTable

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/task-details",
    element: <TaskDetailPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
