import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecipes } from '../hooks/RecipeContext';

function Recipe() {
  const { index } = useParams();
  const { recipes } = useRecipes();


  // Assuming the recipes array is accessible here (e.g., through context or props)
  const recipe = recipes[index];
  console.log(recipes.size)

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="recipe-page">
      <h2>{recipe.name}</h2>
      <p>{recipe.category}</p>
      <p>{recipe.cuisine}</p>
      {/* Add more recipe details as needed */}
    </div>
  );
}

export default Recipe;