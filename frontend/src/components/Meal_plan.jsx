import React from "react";
import { useLocation } from "react-router-dom";
import styles from '../design.module.css';
import ScrollTabs from './tab_module';

function Meal_plan() {
  const location = useLocation();
  const mealPlan = location.state?.mealPlan; // data from GroceryInput

  console.log("Meal Plan Data:", mealPlan);

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>Your Diet Plan</h1>
      <div className={styles.inner_card}>
        <ScrollTabs mealPlan={mealPlan} />
      </div>
    </div>
  );
}

export default Meal_plan;
