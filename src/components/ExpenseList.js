
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CategoryIcon from "@mui/icons-material/Category";

const getCategoryIcon = (category) => {
  switch (category) {
    case "קניות":
      return <ShoppingCartIcon />;
    case "אוכל":
      return <FastfoodIcon />;
    case "דיור":
      return <HomeIcon />;
    case "תחבורה":
      return <DirectionsCarIcon />;
    default:
      return <CategoryIcon />;
  }
};

const ExpenseList = ({ expenses, deleteExpense }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ margin: "20px auto", maxWidth: "600px" }}>
      <div style={{ marginBottom: "20px" }}>
        <TextField
          label="חפש לפי תיאור"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {filteredExpenses.map((expense) => (
          <li
            key={expense.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fff",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {getCategoryIcon(expense.category)}
              <strong>{expense.description}</strong> - {expense.amount} ₪ ({expense.category}) - {expense.date}
            </div>
            <Button variant="contained" color="secondary" onClick={() => deleteExpense(expense.id)}>
              מחק
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
