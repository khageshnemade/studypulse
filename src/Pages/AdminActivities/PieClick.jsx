import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

const PieClick = () => {
  // Pie chart data
  const data = {
    labels: ['Red', 'Blue', 'Yellow'], // Labels for the pie sections
    datasets: [
      {
        data: [300, 50, 100], // Values for each section
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for the sections
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Hover colors
      },
    ],
  }

  // Pie chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
     // Handle click event on the pie chart
     onClick: (event, chartElement) => {
        if (chartElement.length > 0) {
          // Get the index of the clicked element
          const clickedIndex = chartElement[0].index
          const label = data.labels[clickedIndex] // Get the label of the clicked section
          console.log(`Clicked on ${label} section`)
        }
      },
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-center text-xl font-semibold mb-4">Simple Pie Chart</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}

export default PieClick
