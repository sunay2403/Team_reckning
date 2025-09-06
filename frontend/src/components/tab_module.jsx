import * as React from "react";

// Basic MealCard component
function MealCard({ mealType, name, calories }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "1em",
        marginBottom: "1em",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <div style={
        { 
          fontWeight: "bold", 
          fontStyle:"italic",
          fontSize: "2em", 
          color: "#555",
          background: "linear-gradient(0deg, #11cda7d2, #05ea01ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }
       }>
        {mealType}
      </div>
      <div style={{ fontSize: "1.2em" }}>{name}</div>
      <div style={{ color: "#555" }}>{calories} kcal</div>
    </div>
  );
}

// TabPanel component
function TabPanel({ children, value, index }) {
  return (
    <div
      style={{
        display: value === index ? "block" : "none",
        padding: "1em",
        backgroundColor: "#f9e8979f",
        borderRadius: "0 0 10px 10px",
      }}
    >
      {children}
    </div>
  );
}

// Tabs component
export default function MealTabs({ mealPlan }) {
  const [value, setValue] = React.useState(0);
  const mealTypes = ["Breakfast", "Lunch", "Dinner"]; // Fixed meal types

  return (
    <div style={{ width: "100%", borderRadius: "12px", backgroundColor: "#eee" }}>
      {/* Tabs */}
      <div style={{ display: "flex", overflowX: "auto" }}>
        {mealPlan.map((dayObj, index) => (
          <div
            key={index}
            onClick={() => setValue(index)}
            style={{
              fontSize:"1.5em",
              cursor: "pointer",
              padding: "1em 2em",
              marginRight: "0.5em",
              borderRadius: "10px 10px 0 0",
              fontWeight: "bold",
              backgroundColor: value === index ? "#f9e8979f" : "#eee",
              boxShadow: value === index ? "0 0 10px #f4e0bac1" : "none",
            }}
          >
            {dayObj.day.toUpperCase()}
          </div>
        ))}
      </div>

      {/* TabPanels */}
      {mealPlan.map((dayObj, index) => (
        <TabPanel key={index} value={value} index={index}>
          {dayObj.meals.slice(0, 3).map((meal, i) => (
            <MealCard
              key={i}
              mealType={mealTypes[i]}
              name={meal.name}
              calories={meal.calories}
            />
          ))}
        </TabPanel>
      ))}
    </div>
  );
}
