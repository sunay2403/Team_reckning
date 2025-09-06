import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Groceries from "./pages/Groceries";
import MealPlan from "./pages/MealPlan";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/groceries" replace />} />
      <Route path="/groceries" element={<Groceries />} />
      <Route path="/meal-plan" element={<MealPlan />} />
    </Routes>
  );
}

export default App;
