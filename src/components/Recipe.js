import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecipes } from '../hooks/RecipeContext';
import '../css/Recipe.css';
import logo from '../img/logo.svg';
import star0 from '../img/0stars.png'
import star1 from '../img/1star.png'
import star2 from '../img/2stars.png'
import star3 from '../img/3stars.png'
import star4 from '../img/4stars.png'
import star5 from '../img/5stars.png'
import { click } from '@testing-library/user-event/dist/click';
import { useNavigate, Link } from 'react-router-dom';

// Function to convert ISO 8601 duration format to h:mm format
function formatDuration(duration) {
    // Extract hours and minutes using regular expressions
    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);

    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

    // Format the output as 'h:mm'
    return `${hours > 0 ? hours + 'h' : ''}${minutes < 10 && hours > 0 ? '0' : ''}${minutes}`;
}

// Map rating values to corresponding images
const starRatingMap = {
    0: star0,
    1: star1,
    2: star2,
    3: star3,
    4: star4,
    5: star5,
};

// Create a React component that displays the image based on the rating
const RatingImage = ({ rating }) => {
    // Ensure the rating is a valid number between 0 and 5
    const normalizedRating = Math.max(0, Math.min(5, Math.floor(rating)));

    return (
        <div>
            <img 
				src={starRatingMap[normalizedRating]} 
				alt={`Rating ${normalizedRating}`} 
				width="140" 
				height="30"
				/>
        </div>
    );
};



function Recipe() {
	const { index } = useParams();
	const { recipes } = useRecipes();

	const navigate = useNavigate();

	const clickedRecipe = recipes[index];

	if (!clickedRecipe) {
		return <div>Recipe not found</div>;
	} else {
		return (
			// <div className="recipe-page">
			// 	<h2>{clickedRecipe.Name}</h2>
			// 	<h3>{"hellooe"}</h3>

			// 	{/* Add more recipe details as needed */

			// 	}
			// </div>
			<div class="recipe-card">
				<div class="header">BRIGHT BITES
				{/* Logo in top right */}
					<img
						onClick={() => navigate("/")}
						className="logo"
						src={logo}
						alt="Logo"
					/>
				</div>
				{/* <div class="image-container">
					<img src="<%= clickedRecipe.ImageURL %>" alt="Recipe Image">
				</div> */}
				<div class="content">
					<div className="recipe-name">{clickedRecipe.Name}</div>
					<div class="stats">
						<span>⏱️ {formatDuration(clickedRecipe.TotalTime)}</span>
						<div>
							<RatingImage rating={clickedRecipe.AggregatedRating} />
						</div>
					</div>
					<div class="labels">
						<span>Low Calories</span>
						<span>High Sugar</span>
						<span>Medium Fat</span>
						<span>Low Sodium</span>
					</div>
					<div class="motivation">
						<div class="section-title">Motivation:</div>
						<p>Calorie amount: To burn this amount of calories, you need to climb 300 stairs</p>
					</div>
					<div class="health-explanations">
						<div class="section-title">Health Explanations:</div>
						<p>{clickedRecipe.Calories} kcal</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Recipe;