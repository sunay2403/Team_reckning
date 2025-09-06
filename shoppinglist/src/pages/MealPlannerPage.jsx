import React, { useState } from "react";
import GroceryInput from "../components/GroceryInput";
import ShoppingList from "../components/ShoppingList";

export default function MealPlannerPage() {
  const [mealPlan, setMealPlan] = useState(null);
  const [shoppingItems, setShoppingItems] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

const handleGenerate = async (profile) => {
  try {
    const resp = await fetch("http://localhost:4000/api/generate-mealplan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const data = await resp.json();

    setMealPlan(data.mealPlan);
    setShoppingItems(data.shoppingItems);
    setUserProfile(data.userProfile);
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to generate meal plan");
  }
};


  return (
    <>
      {!mealPlan ? (
        <GroceryInput onGenerateMealPlan={handleGenerate} />
      ) : (
        <ShoppingList
          mealPlan={mealPlan}
          shoppingItems={shoppingItems}
          userProfile={userProfile}
          onBack={() => {
            setMealPlan(null);
            setShoppingItems(null);
            setUserProfile(null);
          }}
        />
      )}
    </>
  );
}
