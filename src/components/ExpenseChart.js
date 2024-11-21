import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses, setFilteredCategory, updateBudgetByCategory }) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newBudget, setNewBudget] = useState("");

  const categories = ["קניות", "אוכל", "דיור", "תחבורה", "אחר"];
  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map((cat) =>
          expenses
            .filter((expense) => expense.category === cat)
            .reduce((sum, expense) => sum + expense.amount, 0)
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
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
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const chartIndex = elements[0].index;
        const category = data.labels[chartIndex];
        setSelectedCategory(category);
        setOpen(true);
      }
    },
  };

  const handleSave = () => {
    if (selectedCategory && newBudget) {
      updateBudgetByCategory(selectedCategory, parseFloat(newBudget));
    }
    setOpen(false);
    setNewBudget("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3>התפלגות הוצאות</h3>
      <Doughnut data={data} options={options} />

      {/* דיאלוג עריכת תקציב */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>ערוך תקציב עבור {selectedCategory}</DialogTitle>
        <DialogContent>
          <TextField
            label="תקציב חדש (₪)"
            type="number"
            fullWidth
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            ביטול
          </Button>
          <Button onClick={handleSave} color="primary">
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExpenseChart;
