import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, Tooltip, Legend);

const TrendChart = ({ expenses }) => {
  // מיון הוצאות לפי תאריך
  const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));

  // חישוב סך הוצאות לכל יום
  const dailyExpenses = sortedExpenses.reduce((acc, expense) => {
    acc[expense.date] = (acc[expense.date] || 0) + expense.amount;
    return acc;
  }, {});

  // יצירת נתוני גרף
  const labels = Object.keys(dailyExpenses);
  const data = Object.values(dailyExpenses);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "הוצאות יומיות (₪)",
        data: data,
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "תאריך",
        },
      },
      y: {
        title: {
          display: true,
          text: "סה\"כ הוצאות (₪)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h3 style={{ textAlign: "center" }}>מגמת הוצאות לאורך זמן</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TrendChart;
