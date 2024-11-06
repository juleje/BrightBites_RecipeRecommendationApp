// src/components/RecipesWithExplanation.js
import React from 'react';

const RecipesWithExplanation = () => {
    return (
        <div>
            <h2>Recipes with Explanation</h2>
            <p>Here are recipes with detailed instructions and explanations.</p>
            {/* Sample recipe */}
            <div>
                <h3>Spaghetti Bolognese</h3>
                <p>Explanation: This classic Italian pasta dish...</p>
                <p>Ingredients: Spaghetti, minced meat, tomatoes...</p>
                <p>Instructions: Boil pasta, cook meat, mix sauce...</p>
            </div>
        </div>
    );
};

export default RecipesWithExplanation;
