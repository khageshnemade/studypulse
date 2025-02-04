import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const AnimatedPieChart = () => {
  // Initial state for the dataset
  const [data, setData] = useState({
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Votes",
        data: [12, 19, 7], // Initial values
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF4365", "#259ADB", "#FFBA45"],
        borderWidth: 1,
      },
    ],
  });

  // Chart options for animations
  const options = {
    responsive: true,
    animation: {
      duration: 1500, // Animation duration in milliseconds
      easing: "easeOutBounce", // Animation effect
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>Animated Pie Chart</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default AnimatedPieChart;
