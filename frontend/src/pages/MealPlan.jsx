import React from "react";
import styles from "../design.module.css";
import MealTabs from "../components/tab_module";

function MealPlan() {
  const sampleMealPlan = [
    {
      day: "Monday",
      meals: [
        { name: "Oatmeal", calories: 350 },
        { name: "Grilled Chicken", calories: 600 },
        { name: "Salad", calories: 400 }
      ]
    },
    {
      day: "Tuesday",
      meals: [
        { name: "Pancakes", calories: 450 },
        { name: "Fish & Rice", calories: 650 },
        { name: "Soup", calories: 300 }
      ]
    }
  ];

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>Your Diet Plan</h1>
      <div className={styles.inner_card}>
        <MealTabs mealPlan={sampleMealPlan} />
      </div>
    </div>
  );
}

export default MealPlan;
