import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import Budget from "./Budget";
import ExpenseChart from "./ExpenseChart";
import BarChart from "./BarChart";
import * as XLSX from "xlsx";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("budget");
    return savedBudget ? parseFloat(savedBudget) : 5000;
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", budget.toString());
  }, [budget]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(expenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "expenses.xlsx");
  };

  const totalExpenses = expenses.reduce((total, item) => total + item.amount, 0);
  const isCloseToBudget = totalExpenses >= budget * 0.9 && totalExpenses < budget;

  return (
    <div>
      <Budget budget={budget} setBudget={setBudget} totalExpenses={totalExpenses} />
      {isCloseToBudget && (
        <p style={{ color: "orange", textAlign: "center" }}>
          ⚠️ שים לב! אתה קרוב לחריגה מהתקציב.
        </p>
      )}
      <ExpenseForm addExpense={(expense) => setExpenses([...expenses, expense])} />
      <ExpenseChart expenses={expenses} />
      <BarChart expenses={expenses} />
      <ExpenseList expenses={expenses} deleteExpense={(id) => setExpenses(expenses.filter((expense) => expense.id !== id))} />
      <button onClick={exportToExcel} style={{ display: "block", margin: "20px auto" }}>
        ייצוא לקובץ Excel
      </button>
    </div>
  );
};

export default ExpenseTracker;
