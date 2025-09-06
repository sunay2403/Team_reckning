import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const SPOONACULAR_KEYS = process.env.SPOONACULAR_KEYS.split(",");
let currentKeyIndex = 0;

function getNextKey() {
  const key = SPOONACULAR_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % SPOONACULAR_KEYS.length;
  return key;
}

// Helper: Calculate approximate daily calories
const calculateCalories = ({ age, weight, height, activityLevel, healthGoals }) => {
  // Basic BMR calculation (Mifflin-St Jeor)
  let bmr = 10 * weight + 6.25 * height - 5 * age + 5; // male default
  const activityMultiplier = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    extra: 1.9,
  }[activityLevel || "moderate"];
  let calories = Math.round(bmr * activityMultiplier);

  // Adjust for health goals
  if (healthGoals.includes("Weight Loss")) calories -= 500;
  if (healthGoals.includes("Muscle Gain")) calories += 300;

  return calories;
};

// Endpoint to generate meal plan
app.post("/api/generate-mealplan", async (req, res) => {
  try {
    const profile = req.body;

    const calories = calculateCalories(profile);
    const diet = profile.dietaryRestrictions.join(",") || undefined;
    const exclude = profile.allergies.join(",") || undefined;

    // Spoonacular API call
    const apiKey = getNextKey();
    const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=${calories}&diet=${diet}&exclude=${exclude}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    // Format meal plan
    const mealPlan = Object.entries(data.week || {}).map(([day, dayData]) => ({
      day,
      meals: dayData.meals.map(meal => ({
        name: meal.title,
        type: meal.type
      }))
    }));

    // Extract ingredients for shopping list
    const allIngredients = {};
    for (const dayData of Object.values(data.week || {})) {
      for (const meal of dayData.meals) {
        const mealDetailUrl = `https://api.spoonacular.com/recipes/${meal.id}/information?includeNutrition=false&apiKey=${getNextKey()}`;
        const mealResp = await fetch(mealDetailUrl);
        const mealInfo = await mealResp.json();
        mealInfo.extendedIngredients?.forEach(ing => {
          const category = ing.aisle || "Other";
          if (!allIngredients[category]) allIngredients[category] = [];
          const formatted = `${ing.original}`;
          if (!allIngredients[category].includes(formatted)) {
            allIngredients[category].push(formatted);
          }
        });
      }
    }

    res.json({
      mealPlan,
      shoppingItems: allIngredients,
      userProfile: profile
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate meal plan" });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});
