import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ expenses }) => {
  const categories = ["קניות", "אוכל", "דיור", "תחבורה", "אחר"];
  const data = {
    labels: categories,
    datasets: [
      {
        label: "הוצאות לפי קטגוריה (₪)",
        data: categories.map((cat) =>
          expenses
            .filter((expense) => expense.category === cat)
            .reduce((sum, expense) => sum + expense.amount, 0)
        ),
        backgroundColor: [
          "#FF6384", // ורוד
          "#36A2EB", // כחול
          "#FFCE56", // צהוב
          "#4BC0C0", // ירוק
          "#9966FF", // סגול
        ],
        borderWidth: 1,
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
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h3 style={{ textAlign: "center" }}>הוצאות לפי קטגוריה</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
