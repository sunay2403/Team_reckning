import React, { useState, useEffect } from 'react';
import { ShoppingCart, Check, Download, ArrowLeft, Clock, Users } from 'lucide-react';

const ShoppingList = ({ shoppingItems, userProfile, onBack }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [mealPlan, setMealPlan] = useState([]);

  // Utility: Generate simple meals based on shoppingItems
  const generateMealPlan = (items) => {
    if (!items) return [];

    // Extract some produce, proteins, etc.
    const produce = items.Produce || [];
    const proteins = items.Proteins || [];
    const grains = items['Pasta and Rice'] || [];
    const dairy = items['Milk, Eggs, Other Dairy'] || [];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return days.map((day, idx) => ({
      day,
      meals: [
        {
          name: produce[idx % produce.length] || 'Fruit Bowl',
          type: 'breakfast',
          calories: 250 + idx * 10
        },
        {
          name: proteins[idx % proteins.length] || 'Grilled Protein',
          type: 'lunch',
          calories: 400 + idx * 20
        },
        {
          name: grains[idx % grains.length] || 'Rice or Pasta',
          type: 'dinner',
          calories: 500 + idx * 30
        }
      ]
    }));
  };

  // Generate meal plan when shoppingItems change
  useEffect(() => {
    const plan = generateMealPlan(shoppingItems);
    setMealPlan(plan);
  }, [shoppingItems]);

  // Toggle checkbox for shopping items
  const toggleItemCheck = (category, index) => {
    const key = `${category}-${index}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Export shopping list as text
  const exportList = () => {
    let listText = 'SHOPPING LIST\n\n';
    Object.keys(shoppingItems).forEach(category => {
      const items = shoppingItems[category];
      if (!items || !items.length) return;
      listText += `${category.toUpperCase()}:\n`;
      items.forEach(item => listText += `• ${item}\n`);
      listText += '\n';
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
  };

  // Progress calculations
  const totalItems = Object.keys(shoppingItems).reduce((acc, cat) => acc + (shoppingItems[cat]?.length || 0), 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = totalItems ? Math.round((checkedCount / totalItems) * 100) : 0;

  const getCategoryColor = (category) => {
    const colors = {
      'Proteins': '#ef4444',
      'Vegetables': '#10b981',
      'Fruits': '#f59e0b',
      'Dairy': '#3b82f6',
      'Pantry': '#8b5cf6',
      'Other': '#6b7280',
      'Produce': '#34d399',
      'Milk, Eggs, Other Dairy': '#3b82f6'
    };
    return colors[category] || '#6b7280';
  };

  // ---- JSX ----
  return (
    <div style={{ minHeight: '100vh', padding: '16px', background: '#f3f4f6' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', padding: '32px', borderRadius: '16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShoppingCart size={32} color="#3b82f6" />
            <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Shopping List</h1>
          </div>
          {onBack && (
            <button onClick={onBack} style={{ background: '#6b7280', color: 'white', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none' }}>
              <ArrowLeft size={16} /> Back
            </button>
          )}
        </div>

        {/* Progress */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Progress</span>
            <span>{checkedCount} / {totalItems} items</span>
          </div>
          <div style={{ width: '100%', height: '12px', background: '#e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: '#10b981', transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Meal Plan */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={20} /> Weekly Meal Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {mealPlan.map((day, idx) => (
              <div key={idx} style={{ background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>{day.day}</h3>
                {day.meals.map((meal, mi) => (
                  <div key={mi} style={{ marginBottom: '4px', fontSize: '14px' }}>
                    <span style={{ textTransform: 'capitalize', fontWeight: '500', color: '#10b981' }}>{meal.type}:</span> {meal.name} <span style={{ fontSize: '12px', color: '#9ca3af' }}>({meal.calories} cal)</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Categories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {Object.keys(shoppingItems).map(category => (
            <div key={category} style={{ background: '#f9fafb', borderRadius: '12px', padding: '16px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: getCategoryColor(category), display: 'inline-block' }}></span>
                {category} ({shoppingItems[category]?.length || 0})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {shoppingItems[category]?.map((item, idx) => {
                  const key = `${category}-${idx}`;
                  const checked = !!checkedItems[key];
                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: checked ? '#f0fdf4' : 'white', padding: '8px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => toggleItemCheck(category, idx)}>
                      <input type="checkbox" checked={checked} onChange={() => toggleItemCheck(category, idx)} />
                      <span style={{ textDecoration: checked ? 'line-through' : 'none' }}>{item}</span>
                      {checked && <Check size={16} color="#10b981" />}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '24px' }}>
          <button onClick={exportList} style={{ background: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}><Download size={20} /> Export List</button>
          <button onClick={() => window.print()} style={{ background: '#4b5563', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: '600' }}>Print List</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
