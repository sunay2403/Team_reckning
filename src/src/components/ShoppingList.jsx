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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">Shopping List</h1>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Input
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-8 bg-gray-100 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Shopping Progress</h2>
              <span className="text-sm text-gray-600">{checkedCount} of {totalItems} items</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="text-center mt-2">
              <span className="text-lg font-semibold text-gray-700">{progressPercent}% Complete</span>
            </div>
          </div>

          {/* Meal Plan Preview */}
          <div className="mb-8 bg-green-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Weekly Meal Plan Preview
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {safeData.meals.slice(0, 3).map((dayMeals, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {(dayMeals && dayMeals.day) || `Day ${index + 1}`}
                  </h3>
                  {Array.isArray(dayMeals?.meals) && dayMeals.meals.map((meal, mealIndex) => (
                    <div key={mealIndex} className="text-sm text-gray-600 mb-1">
                      <span className="capitalize font-medium text-green-600">
                        {(meal && meal.type) || 'meal'}:
                      </span> {(meal && meal.name) || 'Unknown meal'}
                      <span className="text-xs text-gray-500 ml-2">
                        ({(meal && meal.calories) || 0} cal)
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {safeData.meals.length > 3 && (
              <p className="text-sm text-gray-600 mt-3 text-center">
                + {safeData.meals.length - 3} more days...
              </p>
            )}
          </div>

          {/* Shopping List by Category */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {Object.keys(safeData.shopping).map(category => {
              const items = safeData.shopping[category];
              if (!Array.isArray(items) || items.length === 0) return null;
              
              return (
                <div key={category} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${
                        category === 'Proteins' ? 'bg-red-500' :
                        category === 'Vegetables' ? 'bg-green-500' :
                        category === 'Fruits' ? 'bg-yellow-500' :
                        category === 'Dairy' ? 'bg-blue-500' :
                        category === 'Pantry' ? 'bg-purple-500' : 'bg-gray-500'
                      }`}></div>
                      {category}
                    </h3>
                    <span className="text-sm text-gray-500">{items.length} items</span>
                  </div>
                  <div className="space-y-2">
                    {items.map((item, index) => {
                      const isChecked = checkedItems[`${category}-${index}`] || false;
                      return (
                        <div 
                          key={index} 
                          className={`flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                            isChecked ? 'bg-green-50 border border-green-200' : ''
                          }`}
                          onClick={() => toggleItemCheck(category, index)}
                        >
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => toggleItemCheck(category, index)}
                            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                          />
                          <span className={`text-gray-700 flex-1 ${
                            isChecked ? 'line-through text-gray-500' : ''
                          }`}>
                            {item || 'Unknown item'}
                          </span>
                          {isChecked && <Check className="w-4 h-4 text-green-600" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Shopping Summary
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div className="text-center bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{checkedCount}</div>
                <div className="text-sm text-gray-600">Items Collected</div>
              </div>
              <div className="text-center bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">7</div>
                <div className="text-sm text-gray-600">Days Planned</div>
              </div>
              <div className="text-center bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">
                  {(safeData.profile.healthGoals && Array.isArray(safeData.profile.healthGoals)) 
                    ? safeData.profile.healthGoals.length 
                    : 2}
                </div>
                <div className="text-sm text-gray-600">Health Goals</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={exportList}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all flex items-center gap-2 justify-center shadow-lg"
            >
              <Download className="w-5 h-5" />
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
              className="bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all flex items-center gap-2 justify-center"
            >
              Print List
            </button>
          </div>

          {/* Tips */}
          <div className="mt-8 bg-yellow-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Shopping Tips</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
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