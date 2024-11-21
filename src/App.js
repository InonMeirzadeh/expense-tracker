import React, { useState } from "react";
import ExpenseTracker from "./components/ExpenseTracker";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div>
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "10px",
          zIndex: 1000,
        }}
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
      <h1>מעקב אחרי הוצאות חודשיות</h1>
      <ExpenseTracker />
    </div>
  );
}

export default App;
