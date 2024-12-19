// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./components/Home";
import RecipesWithExplanation from "./components/RecipesWithExplanation";
import RecipesWithoutExplanation from "./components/RecipesWithoutExplanation";
import Recipe from "./components/Recipe";
import "./css/App.css";
import Querymaker from "./components/Querymaker";
import { RecipeProvider } from "./hooks/RecipeContext";

function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/query" element={<Querymaker />} />
            <Route path="/recipies" element={<RecipesWithExplanation />} />
            <Route path="/recipe/:index" element={<Recipe />} />
            <Route
              path="/recipiesnoexplanation"
              element={<RecipesWithoutExplanation />}
            />
            <Route path="/recipenoexplanation/:index" element={<Recipe />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RecipeProvider>
  );
}
//<Route path="/recipesexplanation" element={<RecipesWithoutExplanation />} />
export default App;
