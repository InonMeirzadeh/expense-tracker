import React, { useState } from "react";
import { TextField, Button, MenuItem, FormControlLabel, Checkbox } from "@mui/material";

const ExpenseForm = ({ addExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("אחר");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // תאריך נוכחי
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceInterval, setRecurrenceInterval] = useState("none");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !date) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      date,
      isRecurring,
      recurrenceInterval,
    };

    addExpense(newExpense);
    setDescription("");
    setAmount("");
    setCategory("אחר");
    setDate(new Date().toISOString().slice(0, 10)); // איפוס התאריך לברירת מחדל
    setIsRecurring(false);
    setRecurrenceInterval("none");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
      <TextField
        label="תיאור"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="סכום"
        type="number"
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <TextField
        select
        label="קטגוריה"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <MenuItem value="אוכל">אוכל</MenuItem>
        <MenuItem value="דיור">דיור</MenuItem>
        <MenuItem value="תחבורה">תחבורה</MenuItem>
        <MenuItem value="קניות">קניות</MenuItem>
        <MenuItem value="אחר">אחר</MenuItem>
      </TextField>
      <TextField
        label="תאריך"
        type="date"
        variant="outlined"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
        }
        label="הוצאה חוזרת"
      />
      {isRecurring && (
        <TextField
          select
          label="תדירות"
          value={recurrenceInterval}
          onChange={(e) => setRecurrenceInterval(e.target.value)}
        >
          <MenuItem value="daily">יומית</MenuItem>
          <MenuItem value="weekly">שבועית</MenuItem>
          <MenuItem value="monthly">חודשית</MenuItem>
        </TextField>
      )}
      <Button type="submit" variant="contained" color="primary">
        הוסף הוצאה
      </Button>
    </form>
  );
};

export default ExpenseForm;
