// src/components/RecipesWithoutExplanation.js
import React from 'react';

const RecipesWithoutExplanation = () => {
	return (
		<div>
			<h2>Recipes without Explanation</h2>
			<p>Here are recipes with minimal instructions.</p>
			{/* Sample recipe */}
			<div>
				<h3>Spaghetti Bolognese</h3>
				<p>Ingredients: Spaghetti, minced meat, tomatoes...</p>
				<p>Instructions: Boil pasta, cook meat, mix sauce...</p>
			</div>
		</div>
	);
};

export default RecipesWithoutExplanation;
