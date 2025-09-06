import React, { useState } from 'react';
import { User, Target, ChefHat, ArrowRight } from 'lucide-react';

const GroceryInput = ({ onGenerateMealPlan }) => {
  const [userProfile, setUserProfile] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    healthGoals: [],
    dietaryRestrictions: [],
    allergies: [],
    mealsPerDay: 3,
    budget: 'moderate'
  });

  const healthGoalOptions = [
    'Weight Loss', 'Muscle Gain', 'Heart Health', 'Diabetes Management',
    'Lower Cholesterol', 'Increase Energy', 'Better Digestion', 'Bone Health'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Mediterranean',
    'Low Carb', 'High Protein', 'Gluten-Free', 'Dairy-Free', 'Low Sodium'
  ];

  const commonAllergies = [
    'Nuts', 'Shellfish', 'Eggs', 'Dairy', 'Soy', 'Wheat', 'Fish'
  ];

  const handleArrayToggle = (array, setArray, item) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const handleSubmit = () => {
    if (onGenerateMealPlan) {
      onGenerateMealPlan(userProfile);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f0fdf4, #eff6ff)',
      padding: '16px'
    },
    maxWidth: {
      maxWidth: '1024px',
      margin: '0 auto'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      padding: '32px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '32px'
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    sections: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    },
    section: {
      borderRadius: '12px',
      padding: '24px'
    },
    graySection: {
      backgroundColor: '#f9fafb'
    },
    blueSection: {
      backgroundColor: '#eff6ff'
    },
    greenSection: {
      backgroundColor: '#f0fdf4'
    },
    redSection: {
      backgroundColor: '#fef2f2'
    },
    purpleSection: {
      backgroundColor: '#faf5ff'
    },
    sectionHeader: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    grid3: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    grid2: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '12px'
    },
    grid4: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '12px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.2s',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: 'white',
      cursor: 'pointer',
      outline: 'none'
    },
    toggleButton: {
      padding: '12px',
      borderRadius: '8px',
      textAlign: 'left',
      transition: 'all 0.2s',
      cursor: 'pointer',
      border: '1px solid #d1d5db',
      backgroundColor: 'white'
    },
    toggleButtonActive: {
      backgroundColor: '#3b82f6',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #3b82f6'
    },
    toggleButtonActiveBlue: {
      backgroundColor: '#3b82f6'
    },
    toggleButtonActiveGreen: {
      backgroundColor: '#10b981'
    },
    toggleButtonActiveRed: {
      backgroundColor: '#ef4444'
    },
    submitButton: {
      width: '100%',
      background: 'linear-gradient(to right, #10b981, #3b82f6)',
      color: 'white',
      padding: '16px 32px',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '18px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    submitButtonHover: {
      background: 'linear-gradient(to right, #059669, #2563eb)'
    },
    fullWidth: {
      marginTop: '16px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.card}>
          <div style={styles.header}>
            <ChefHat size={32} color="#10b981" />
            <h1 style={styles.title}>Grocery Input Form</h1>
          </div>

          <div style={styles.sections}>
            {/* Personal Information */}
            <div style={{...styles.section, ...styles.graySection}}>
              <h2 style={styles.sectionHeader}>
                <User size={20} />
                Personal Information
              </h2>
              <div style={styles.grid3}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Age</label>
                  <input
                    type="number"
                    value={userProfile.age}
                    onChange={(e) => setUserProfile({...userProfile, age: e.target.value})}
                    style={styles.input}
                    placeholder="25"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Weight (kg)</label>
                  <input
                    type="number"
                    value={userProfile.weight}
                    onChange={(e) => setUserProfile({...userProfile, weight: e.target.value})}
                    style={styles.input}
                    placeholder="70"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Height (cm)</label>
                  <input
                    type="number"
                    value={userProfile.height}
                    onChange={(e) => setUserProfile({...userProfile, height: e.target.value})}
                    style={styles.input}
                    placeholder="175"
                  />
                </div>
              </div>
              
              <div style={{...styles.inputGroup, ...styles.fullWidth}}>
                <label style={styles.label}>Activity Level</label>
                <select
                  value={userProfile.activityLevel}
                  onChange={(e) => setUserProfile({...userProfile, activityLevel: e.target.value})}
                  style={styles.select}
                >
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="very">Very Active (6-7 days/week)</option>
                  <option value="extra">Extra Active (2x/day, intense)</option>
                </select>
              </div>
            </div>

            {/* Health Goals */}
            <div style={{...styles.section, ...styles.blueSection}}>
              <h2 style={styles.sectionHeader}>
                <Target size={20} />
                Health Goals
              </h2>
              <div style={styles.grid2}>
                {healthGoalOptions.map(goal => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => handleArrayToggle(userProfile.healthGoals, (goals) => setUserProfile({...userProfile, healthGoals: goals}), goal)}
                    style={{
                      ...styles.toggleButton,
                      ...(userProfile.healthGoals.includes(goal) ? 
                        {...styles.toggleButtonActive, ...styles.toggleButtonActiveBlue} : {})
                    }}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preferences */}
            <div style={{...styles.section, ...styles.greenSection}}>
              <h2 style={styles.sectionHeader}>Dietary Preferences</h2>
              <div style={styles.grid3}>
                {dietaryOptions.map(diet => (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => handleArrayToggle(userProfile.dietaryRestrictions, (diets) => setUserProfile({...userProfile, dietaryRestrictions: diets}), diet)}
                    style={{
                      ...styles.toggleButton,
                      ...(userProfile.dietaryRestrictions.includes(diet) ? 
                        {...styles.toggleButtonActive, ...styles.toggleButtonActiveGreen} : {})
                    }}
                  >
                    {diet}
                  </button>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div style={{...styles.section, ...styles.redSection}}>
              <h2 style={styles.sectionHeader}>Allergies & Food Intolerances</h2>
              <div style={styles.grid4}>
                {commonAllergies.map(allergy => (
                  <button
                    key={allergy}
                    type="button"
                    onClick={() => handleArrayToggle(userProfile.allergies, (allergies) => setUserProfile({...userProfile, allergies: allergies}), allergy)}
                    style={{
                      ...styles.toggleButton,
                      ...(userProfile.allergies.includes(allergy) ? 
                        {...styles.toggleButtonActive, ...styles.toggleButtonActiveRed} : {})
                    }}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Preferences */}
            <div style={{...styles.section, ...styles.purpleSection}}>
              <h2 style={styles.sectionHeader}>Meal Preferences</h2>
              <div style={styles.grid2}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Meals per day</label>
                  <select
                    value={userProfile.mealsPerDay}
                    onChange={(e) => setUserProfile({...userProfile, mealsPerDay: parseInt(e.target.value)})}
                    style={styles.select}
                  >
                    <option value={2}>2 meals</option>
                    <option value={3}>3 meals</option>
                    <option value={4}>4 meals</option>
                    <option value={5}>5 meals</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Budget</label>
                  <select
                    value={userProfile.budget}
                    onChange={(e) => setUserProfile({...userProfile, budget: e.target.value})}
                    style={styles.select}
                  >
                    <option value="low">Budget-friendly</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">Premium</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              style={styles.submitButton}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(to right, #059669, #2563eb)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(to right, #10b981, #3b82f6)';
              }}
            >
              Generate Meal Plan & Shopping List
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryInput;