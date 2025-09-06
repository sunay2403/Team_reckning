import React from "react";
import GroceryInput from "../components/GroceryInput";
import ShoppingList from "../components/ShoppingList";

function Groceries() {
  return (
    <div>
      <h1>Groceries</h1>
      <GroceryInput />
      <ShoppingList />
    </div>
  );
}

export default Groceries;
