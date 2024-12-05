import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecipes } from '../hooks/RecipeContext';

function Recipe() {
	const { index } = useParams();
	const { recipes } = useRecipes();


	// Assuming the recipes array is accessible here (e.g., through context or props)
	const t = recipes[index];
	const clickedRecipe = t.meals[0];

	if (!clickedRecipe) {
		return <div>Recipe not found</div>;
	} else {
		return (
			<div className="recipe-page">
				<h2>{clickedRecipe.strMeal}</h2>
				<p>{clickedRecipe.strCategory}</p>
				<p>{clickedRecipe.strArea}</p>
				{/* Add more recipe details as needed */}
			</div>
		);
	}
}

export default Recipe;