import React, { useState, useEffect } from "react";

function ProfileSetup() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [diet, setDiet] = useState("omnivore");
  const [activity, setActivity] = useState("moderate");
  const [cuisine, setCuisine] = useState("any");
  const [allergies, setAllergies] = useState("");
  const [goals, setGoals] = useState("");

  const [activeSection, setActiveSection] = useState("profile");
  const [bgColor, setBgColor] = useState(0); // for background animation

  // Animate background color
  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prev) => (prev + 1) % 360); // cycle through hue degrees
    }, 50); // update every 50ms
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, age, diet, activity, cuisine, allergies, goals });
    alert("Profile saved! (Check console for details)");
  };

  const inputShape = { borderRadius: "50px 25px 50px 25px" };

  const baseInputStyle = {
    width: "60%",
    padding: "14px",
    margin: "15px 0",
    fontSize: "16px",
    outline: "none",
    border: "2px solid #2E8B57",
    borderRadius: inputShape.borderRadius,
    backgroundColor: "#ffffff",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
  };

  const getSubheadingStyle = (section) => ({
    color: activeSection === section ? "#ffffff" : "#2E8B57",
    backgroundColor: activeSection === section ? "#2E8B57" : "transparent",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "all 0.3s",
  });

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        // Animated gradient background using HSL
        background: `hsl(${bgColor}, 80%, 85%)`,
        transition: "background 0.05s linear",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          borderRadius: "20px",
          padding: "40px",
          // Gradient background with soft multi-color shadow
          background: "linear-gradient(135deg, #FFC0CB 0%, #87CEFA 100%)",
          boxShadow:
            "0 0 30px 10px rgba(255, 105, 180, 0.3), 0 0 50px 20px rgba(135, 206, 250, 0.3), 0 0 70px 30px rgba(255, 215, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Main heading */}
        <h1
          style={{
            fontFamily: "'Brush Script MT', cursive",
            fontSize: "50px",
            color: "#2E8B57",
            textAlign: "center",
            marginBottom: "20px",
            textShadow: "1px 1px 5px rgba(0,0,0,0.2)",
          }}
        >
          AI Meal Planner
        </h1>

        {/* Subheadings */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <h2
            style={getSubheadingStyle("profile")}
            onClick={() => setActiveSection("profile")}
          >
            Profile Setup
          </h2>
          <h2
            style={getSubheadingStyle("diet")}
            onClick={() => setActiveSection("diet")}
          >
            Diet Plan
          </h2>
          <h2
            style={getSubheadingStyle("shopping")}
            onClick={() => setActiveSection("shopping")}
          >
            Shopping List
          </h2>
        </div>

        {/* Profile Setup Form */}
        {activeSection === "profile" && (
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "rgba(255,255,255,0.85)", // overlay for inputs
              padding: "30px",
              borderRadius: "30px",
            }}
          >
            {["Name", "Age", "Diet", "Activity", "Cuisine", "Allergies / Restrictions", "Health / Goals"].map((placeholder, index) => (
              <input
                key={index}
                type={placeholder === "Age" ? "number" : "text"}
                placeholder={placeholder}
                value={
                  placeholder === "Name" ? name :
                  placeholder === "Age" ? age :
                  placeholder === "Diet" ? diet :
                  placeholder === "Activity" ? activity :
                  placeholder === "Cuisine" ? cuisine :
                  placeholder === "Allergies / Restrictions" ? allergies :
                  goals
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (placeholder === "Name") setName(val);
                  else if (placeholder === "Age") setAge(val);
                  else if (placeholder === "Diet") setDiet(val);
                  else if (placeholder === "Activity") setActivity(val);
                  else if (placeholder === "Cuisine") setCuisine(val);
                  else if (placeholder === "Allergies / Restrictions") setAllergies(val);
                  else if (placeholder === "Health / Goals") setGoals(val);
                }}
                style={baseInputStyle}
              />
            ))}

            <button
              type="submit"
              style={{
                width: "65%",
                padding: "16px",
                marginTop: "30px",
                borderRadius: "35px",
                border: "2px solid #2E8B57",
                background: "#2E8B57",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "18px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.background = "#3CB371")}
              onMouseOut={(e) => (e.target.style.background = "#2E8B57")}
            >
              Save Profile
            </button>
          </form>
        )}

        {activeSection === "diet" && (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h3>Diet Plan Section Coming Soon!</h3>
          </div>
        )}
        {activeSection === "shopping" && (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h3>Shopping List Section Coming Soon!</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileSetup;
