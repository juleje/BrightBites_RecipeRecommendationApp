import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecipes } from '../hooks/RecipeContext';

function Recipe() {
	const { index } = useParams();
	const { recipes, explenations } = useRecipes();

	const clickedRecipe = recipes[index];

	if (!clickedRecipe) {
		return <div>Recipe not found</div>;
	} else {
		return (
			<div className="recipe-page">
				<h2>{clickedRecipe.Name}</h2>

				{/* Add more recipe details as needed */
					
				}
			</div>
		);
	}
}

export default Recipe;