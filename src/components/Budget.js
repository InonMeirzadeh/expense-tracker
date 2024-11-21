
import React from "react";
import { Card, CardContent, Typography, TextField, LinearProgress } from "@mui/material";

const Budget = ({ budget, setBudget, totalExpenses }) => {
  const remaining = budget - totalExpenses;
  const progress = Math.min((totalExpenses / budget) * 100, 100); // Calculate percentage of budget spent
  const remainingColor = remaining >= 0 ? "green" : "red";

  return (
    <Card style={{ maxWidth: "500px", margin: "20px auto", textAlign: "center" }}>
      <CardContent>
        {remaining < 0 && (
          <Typography
            variant="body1"
            style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}
          >
            ⚠️ אתה חורג מהתקציב ב-{Math.abs(remaining)} ₪!
          </Typography>
        )}
        <Typography variant="h5">תקציב חודשי: {budget} ₪</Typography>
        <Typography variant="h6">סה"כ הוצאות: {totalExpenses} ₪</Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ marginTop: "10px", height: "10px", borderRadius: "5px", backgroundColor: "#f5f5f5" }}
        />
        <Typography
          variant="body1"
          style={{ color: remainingColor, fontWeight: "bold", marginTop: "10px" }}
        >
          יתרה: {remaining} ₪
        </Typography>
        <TextField
          label="עדכן תקציב"
          type="number"
          variant="outlined"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
          style={{ marginTop: "10px" }}
        />
      </CardContent>
    </Card>
  );
};

export default Budget;
