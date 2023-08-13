import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Chart({ tasks, todoCount, doingCount, doneCount }) {
  console.log(`todoCount${todoCount}`);
  const chartData = {
    labels: ["TODO", "DOING", "DONE"],
    datasets: [
      {
        label: "Marketing Progress",
        data: [todoCount, doingCount, doneCount],
        backgroundColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1,
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Marketing Plan Progress</h2>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Chart;
