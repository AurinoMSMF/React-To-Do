import { Chart, registerables } from "chart.js";
import { useEffect, useRef, useState } from "react";

Chart.register(...registerables);

function TasksChart({ currentAllTasksObjects }) {
  //   const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");
  //   const ctx = document.getElementById("myChart");
  const allDaysTasksObjects = currentAllTasksObjects;

  const canvasRef = useRef(null);

  let countDates = 1;
  const lastSixDates = allDaysTasksObjects.map((dayObject) => {
    if (countDates <= 6) {
      const date = dayObject.date;

      countDates++;

      return date;
    }
  });

  let countDays = 1;
  console.log(allDaysTasksObjects);
  const arrayPercentageOfCompletedTasksPerDay = allDaysTasksObjects.map(
    (dayObject) => {
      console.log(dayObject);
      if (countDays <= 6) {
        countDays++;
        const tasksTotal = dayObject.tasks.length;
        const completedTasks = dayObject.tasks.filter(
          (task) => task.isComplete,
        );
        if (completedTasks.length > 0) {
          const completedTasksPercentage =
            (completedTasks.length * 100) / tasksTotal;

          return completedTasksPercentage;
        }

        return 0;
      }
    },
  );

  console.log(arrayPercentageOfCompletedTasksPerDay);
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    const myChart = new Chart(context, {
      type: "bar",
      data: {
        labels: lastSixDates,
        datasets: [
          {
            label: "Percentage of concluded tasks(%)",
            // data: [12, 19, 3, 5, 2, 3],
            data: arrayPercentageOfCompletedTasksPerDay,
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [lastSixDates, arrayPercentageOfCompletedTasksPerDay]);

  return (
    <div className="h-fit p-6 space-y-2 bg-slate-100 rounded-lg shadow flex flex-col gap-4">
      <h1>Tasks Chart</h1>
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default TasksChart;
