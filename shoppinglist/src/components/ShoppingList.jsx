import React, { useState } from 'react';
import { ShoppingCart, Check, Download, ArrowLeft, Clock, Users } from 'lucide-react';

const ShoppingList = ({ 
  mealPlan, 
  shoppingItems, 
  userProfile, 
  onBack 
}) => {
  const [checkedItems, setCheckedItems] = useState({});

  // Safe demo data
  const defaultMealPlan = [
    {
      day: 'Monday',
      meals: [
        { name: 'Greek Yogurt Bowl', calories: 320, type: 'breakfast' },
        { name: 'Chicken Salad', calories: 450, type: 'lunch' },
        { name: 'Salmon with Vegetables', calories: 520, type: 'dinner' }
      ]
    },
    {
      day: 'Tuesday', 
      meals: [
        { name: 'Protein Smoothie', calories: 280, type: 'breakfast' },
        { name: 'Quinoa Bowl', calories: 380, type: 'lunch' },
        { name: 'Grilled Chicken', calories: 480, type: 'dinner' }
      ]
    },
    {
      day: 'Wednesday',
      meals: [
        { name: 'Oatmeal with Berries', calories: 250, type: 'breakfast' },
        { name: 'Turkey Wrap', calories: 420, type: 'lunch' },
        { name: 'Baked Fish', calories: 460, type: 'dinner' }
      ]
    }
  ];

  const defaultShoppingItems = {
    'Proteins': ['Chicken Breast (2 lbs)', 'Salmon Fillets (1.5 lbs)', 'Greek Yogurt (32 oz)', 'Eggs (1 dozen)', 'Turkey Slices (1 lb)'],
    'Vegetables': ['Spinach (1 bag)', 'Broccoli (2 heads)', 'Bell Peppers (3)', 'Carrots (2 lbs)', 'Cucumber (2)', 'Tomatoes (1 lb)'],
    'Fruits': ['Bananas (6)', 'Mixed Berries (1 lb)', 'Apples (4)', 'Lemons (3)'],
    'Dairy': ['Almond Milk (64 oz)', 'Cheese (8 oz)', 'Butter (1 lb)'],
    'Pantry': ['Quinoa (2 cups)', 'Olive Oil', 'Rolled Oats (1 container)', 'Almonds (1 cup)', 'Honey', 'Whole Wheat Tortillas'],
    'Other': ['Protein Powder', 'Multivitamins', 'Green Tea']
  };

  const defaultUserProfile = {
    healthGoals: ['Weight Loss', 'Heart Health'],
    age: 28,
    activityLevel: 'moderate'
  };

  // Safe data extraction with fallbacks
  const safeData = {
    meals: (() => {
      try {
        if (Array.isArray(mealPlan) && mealPlan.length > 0) {
          return mealPlan;
        }
        return defaultMealPlan;
      } catch (e) {
        return defaultMealPlan;
      }
    })(),
    
    shopping: (() => {
      try {
        if (shoppingItems && typeof shoppingItems === 'object' && !Array.isArray(shoppingItems)) {
          const hasValidItems = Object.keys(shoppingItems).some(key => 
            Array.isArray(shoppingItems[key]) && shoppingItems[key].length > 0
          );
          if (hasValidItems) {
            return shoppingItems;
          }
        }
        return defaultShoppingItems;
      } catch (e) {
        return defaultShoppingItems;
      }
    })(),
    
    profile: (() => {
      try {
        if (userProfile && typeof userProfile === 'object' && !Array.isArray(userProfile)) {
          return userProfile;
        }
        return defaultUserProfile;
      } catch (e) {
        return defaultUserProfile;
      }
    })()
  };

  const toggleItemCheck = (category, index) => {
    try {
      const key = `${category}-${index}`;
      setCheckedItems(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    } catch (e) {
      console.error('Error toggling item:', e);
    }
  };

  const exportList = () => {
    try {
      let listText = 'SHOPPING LIST\n\n';
      
      Object.keys(safeData.shopping).forEach(category => {
        const items = safeData.shopping[category];
        if (Array.isArray(items) && items.length > 0) {
          listText += `${category.toUpperCase()}:\n`;
          items.forEach(item => {
            listText += `• ${item || 'Unknown item'}\n`;
          });
          listText += '\n';
        }
      });
      
      const blob = new Blob([listText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'shopping-list.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export failed:', e);
      alert('Export failed. Please try again.');
    }
  };

  // Safe calculations
  const totalItems = (() => {
    try {
      let count = 0;
      Object.keys(safeData.shopping).forEach(category => {
        const items = safeData.shopping[category];
        if (Array.isArray(items)) {
          count += items.length;
        }
      });
      return count;
    } catch (e) {
      return 0;
    }
  })();

  const checkedCount = (() => {
    try {
      return Object.values(checkedItems).filter(Boolean).length;
    } catch (e) {
      return 0;
    }
  })();

  const progressPercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const getCategoryColor = (category) => {
    const colors = {
      'Proteins': '#ef4444',
      'Vegetables': '#10b981',
      'Fruits': '#f59e0b',
      'Dairy': '#3b82f6',
      'Pantry': '#8b5cf6',
      'Other': '#6b7280'
    };
    return colors[category] || '#6b7280';
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #eff6ff, #f0fdf4)',
      padding: '16px'
    },
    maxWidth: {
      maxWidth: '1536px',
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
      justifyContent: 'space-between',
      marginBottom: '32px'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    backButton: {
      backgroundColor: '#6b7280',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'background-color 0.2s'
    },
    progressSection: {
      marginBottom: '32px',
      backgroundColor: '#f3f4f6',
      borderRadius: '12px',
      padding: '24px'
    },
    progressHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px'
    },
    progressTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937'
    },
    progressText: {
      fontSize: '14px',
      color: '#6b7280'
    },
    progressBar: {
      width: '100%',
      backgroundColor: '#e5e7eb',
      borderRadius: '9999px',
      height: '12px',
      overflow: 'hidden'
    },
    progressFill: {
      background: 'linear-gradient(to right, #10b981, #3b82f6)',
      height: '100%',
      borderRadius: '9999px',
      transition: 'width 0.3s'
    },
    progressPercent: {
      textAlign: 'center',
      marginTop: '8px',
      fontSize: '18px',
      fontWeight: '600',
      color: '#374151'
    },
    mealPlanSection: {
      marginBottom: '32px',
      backgroundColor: '#f0fdf4',
      borderRadius: '12px',
      padding: '24px'
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
    mealGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '16px'
    },
    mealCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    },
    dayTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px'
    },
    mealItem: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '4px'
    },
    mealType: {
      textTransform: 'capitalize',
      fontWeight: '500',
      color: '#10b981'
    },
    calories: {
      fontSize: '12px',
      color: '#9ca3af',
      marginLeft: '8px'
    },
    moreText: {
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '12px',
      textAlign: 'center'
    },
    shoppingGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    categoryCard: {
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      padding: '24px'
    },
    categoryHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    categoryTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    categoryDot: {
      width: '16px',
      height: '16px',
      borderRadius: '50%'
    },
    itemCount: {
      fontSize: '14px',
      color: '#9ca3af'
    },
    itemsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    itemRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      backgroundColor: 'white',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    itemRowChecked: {
      backgroundColor: '#f0fdf4',
      border: '1px solid #bbf7d0'
    },
    checkbox: {
      width: '16px',
      height: '16px',
      accentColor: '#10b981',
      borderRadius: '4px'
    },
    itemText: {
      color: '#374151',
      flex: 1
    },
    itemTextChecked: {
      textDecoration: 'line-through',
      color: '#9ca3af'
    },
    summarySection: {
      backgroundColor: '#eff6ff',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px'
    },
    summaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    summaryCard: {
      textAlign: 'center',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px'
    },
    summaryNumber: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    summaryLabel: {
      fontSize: '14px',
      color: '#6b7280'
    },
    buttonSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      alignItems: 'center',
      marginBottom: '32px'
    },
    buttonRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      justifyContent: 'center'
    },
    primaryButton: {
      background: 'linear-gradient(to right, #10b981, #3b82f6)',
      color: 'white',
      padding: '12px 32px',
      borderRadius: '12px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    secondaryButton: {
      backgroundColor: '#4b5563',
      color: 'white',
      padding: '12px 32px',
      borderRadius: '12px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    tipsSection: {
      backgroundColor: '#fefce8',
      borderRadius: '12px',
      padding: '24px'
    },
    tipsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px',
      fontSize: '14px',
      color: '#374151'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <ShoppingCart size={32} color="#3b82f6" />
              <h1 style={styles.title}>Shopping List</h1>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                style={styles.backButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
              >
                <ArrowLeft size={16} />
                Back to Input
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div style={styles.progressSection}>
            <div style={styles.progressHeader}>
              <h2 style={styles.progressTitle}>Shopping Progress</h2>
              <span style={styles.progressText}>{checkedCount} of {totalItems} items</span>
            </div>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${progressPercent}%`
                }}
              ></div>
            </div>
            <div style={styles.progressPercent}>
              <span>{progressPercent}% Complete</span>
            </div>
          </div>

          {/* Meal Plan Preview */}
          <div style={styles.mealPlanSection}>
            <h2 style={styles.sectionHeader}>
              <Clock size={20} />
              Weekly Meal Plan Preview
            </h2>
            <div style={styles.mealGrid}>
              {safeData.meals.slice(0, 3).map((dayMeals, index) => (
                <div key={index} style={styles.mealCard}>
                  <h3 style={styles.dayTitle}>
                    {(dayMeals && dayMeals.day) || `Day ${index + 1}`}
                  </h3>
                  {Array.isArray(dayMeals?.meals) && dayMeals.meals.map((meal, mealIndex) => (
                    <div key={mealIndex} style={styles.mealItem}>
                      <span style={styles.mealType}>
                        {(meal && meal.type) || 'meal'}:
                      </span> {(meal && meal.name) || 'Unknown meal'}
                      <span style={styles.calories}>
                        ({(meal && meal.calories) || 0} cal)
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {safeData.meals.length > 3 && (
              <p style={styles.moreText}>
                + {safeData.meals.length - 3} more days...
              </p>
            )}
          </div>

          {/* Shopping List by Category */}
          <div style={styles.shoppingGrid}>
            {Object.keys(safeData.shopping).map(category => {
              const items = safeData.shopping[category];
              if (!Array.isArray(items) || items.length === 0) return null;
              
              return (
                <div key={category} style={styles.categoryCard}>
                  <div style={styles.categoryHeader}>
                    <h3 style={styles.categoryTitle}>
                      <div style={{
                        ...styles.categoryDot,
                        backgroundColor: getCategoryColor(category)
                      }}></div>
                      {category}
                    </h3>
                    <span style={styles.itemCount}>{items.length} items</span>
                  </div>
                  <div style={styles.itemsList}>
                    {items.map((item, index) => {
                      const isChecked = checkedItems[`${category}-${index}`] || false;
                      return (
                        <div 
                          key={index} 
                          style={{
                            ...styles.itemRow,
                            ...(isChecked ? styles.itemRowChecked : {})
                          }}
                          onClick={() => toggleItemCheck(category, index)}
                          onMouseEnter={(e) => e.target.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}
                          onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                        >
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => toggleItemCheck(category, index)}
                            style={styles.checkbox}
                          />
                          <span style={{
                            ...styles.itemText,
                            ...(isChecked ? styles.itemTextChecked : {})
                          }}>
                            {item || 'Unknown item'}
                          </span>
                          {isChecked && <Check size={16} color="#10b981" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div style={styles.summarySection}>
            <h3 style={styles.sectionHeader}>
              <Users size={20} />
              Shopping Summary
            </h3>
            <div style={styles.summaryGrid}>
              <div style={styles.summaryCard}>
                <div style={{...styles.summaryNumber, color: '#3b82f6'}}>{totalItems}</div>
                <div style={styles.summaryLabel}>Total Items</div>
              </div>
              <div style={styles.summaryCard}>
                <div style={{...styles.summaryNumber, color: '#10b981'}}>{checkedCount}</div>
                <div style={styles.summaryLabel}>Items Collected</div>
              </div>
              <div style={styles.summaryCard}>
                <div style={{...styles.summaryNumber, color: '#8b5cf6'}}>7</div>
                <div style={styles.summaryLabel}>Days Planned</div>
              </div>
              <div style={styles.summaryCard}>
                <div style={{...styles.summaryNumber, color: '#f59e0b'}}>
                  {(safeData.profile.healthGoals && Array.isArray(safeData.profile.healthGoals)) 
                    ? safeData.profile.healthGoals.length 
                    : 2}
                </div>
                <div style={styles.summaryLabel}>Health Goals</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonSection}>
            <div style={styles.buttonRow}>
              <button 
                onClick={exportList}
                style={styles.primaryButton}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(to right, #059669, #2563eb)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(to right, #10b981, #3b82f6)';
                }}
              >
                <Download size={20} />
                Export Shopping List
              </button>
              <button 
                onClick={() => {
                  try {
                    if (window.print) {
                      window.print();
                    } else {
                      alert('Print functionality not available in this environment');
                    }
                  } catch (e) {
                    alert('Print functionality not available');
                  }
                }}
                style={styles.secondaryButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#4b5563'}
              >
                Print List
              </button>
            </div>
          </div>

          {/* Tips */}
          <div style={styles.tipsSection}>
            <h3 style={styles.sectionHeader}>Shopping Tips</h3>
            <div style={styles.tipsGrid}>
              <div>• Shop the perimeter first for fresh items</div>
              <div>• Check for seasonal produce discounts</div>
              <div>• Buy proteins in bulk and freeze portions</div>
              <div>• Compare unit prices for best deals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;