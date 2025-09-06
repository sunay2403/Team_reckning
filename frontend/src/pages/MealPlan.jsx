import React, { useState, useEffect } from "react";
import styles from "../design.module.css";
import MealTabs from "../components/tab_module";

function MealPlan() {
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {        //! User profile to be imported
        const userProfile = {
          age: 25,
          weight: 70,
          height: 175,
          activityLevel: "moderate",
          healthGoals: ["Weight Loss"],
          dietaryRestrictions: ["vegetarian"],
          allergies: ["peanuts"],
        };

        const response = await fetch("http://localhost:4000/api/generate-mealplan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userProfile),
        });

        const data = await response.json();
        setMealPlan(data.mealPlan || []);
      } catch (err) {
        console.error("Error fetching meal plan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, []); // runs once when component mounts

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>Your Diet Plan</h1>
      <div className={styles.inner_card}>
        {loading ? (
          <p>Loading meal plan...</p>
        ) : (
          <MealTabs mealPlan={mealPlan} />
        )}
      </div>
    </div>
  );
}

export default MealPlan;
