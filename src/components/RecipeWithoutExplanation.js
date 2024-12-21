import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecipes } from '../hooks/RecipeContext';
import '../css/Recipe.css';
import logo from '../img/minimalist-logo-trimmed.jpg';
import go_back from '../img/go_back.png'
import star0 from '../img/0stars.png'
import star1 from '../img/1star.png'
import star2 from '../img/2stars.png'
import star3 from '../img/3stars.png'
import star4 from '../img/4stars.png'
import star5 from '../img/5stars.png'
import calories_red from '../img/calorie_red.png'
import sugar_red from '../img/sugar_red.png'
import fat_red from '../img/fat_red.png'
import sodium_red from '../img/sodium_red.png'
import calories_orange from '../img/calorie_orange.png'
import sugar_orange from '../img/sugar_orange.png'
import fat_orange from '../img/fat_orange.png'
import sodium_orange from '../img/sodium_orange.png'
import calories_green from '../img/calorie_green.png'
import sugar_green from '../img/sugar_green.png'
import fat_green from '../img/fat_green.png'
import sodium_green from '../img/sodium_green.png'
import { Button } from '@mui/material';





import { click } from '@testing-library/user-event/dist/click';
import { useNavigate, Link } from 'react-router-dom';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ScaleIcon from '@mui/icons-material/Scale';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { Box, Typography, Alert, AlertTitle, Card, CardContent, CardMedia, Grid, CircularProgress } from '@mui/material';



function formatDuration(duration) {
	// Extract hours and minutes using regular expressions
	const hoursMatch = duration.match(/PT(\d+)H/); // Look for 'PT<number>H'
	const minutesMatch = duration.match(/(\d+)M/); // Look for '<number>M'

	const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
	const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

	// Format the output as 'h:mm' or '<minutes> min' if no hours
	if (hours > 0 && minutes > 0) {
		return `${hours}h ${minutes}min`;
	} else if (hours > 0) {
		return `${hours}h`;
	} else {
		return `${minutes}min`;
	}
};

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

const getRandomMotivation = (calories) => {
	const motivations = [
		`This meal equals ${Math.ceil(calories / 250)} of your favorite chocolate bars!`,
		`If you raise your fork ${Math.ceil(calories / 0.5)} of times you've burned as much calories as the meal equals!`,
		`While dancing during a night out, this meal equals ${Math.ceil(calories / 300)} hours of dancing!`,
		`This meal is equivalent to ${Math.ceil(calories / 150)} salads!`,
		`If you have sex for ${Math.ceil(calories / 100)} times, this meal is fully gone!`,
		`It’s like ${Math.ceil(calories / 250)} games of intense beach volleyball!`,
		`If you climb ${Math.ceil(calories / 10)} flights of stairs, this meal is balanced out!`,
		`This is equal to ${Math.ceil(calories / 50)} hours of binge-watching TV while fidgeting!`,
		`This meal equals ${Math.ceil(calories / 10)} minutes of running away from zombies!`,
		`You could garden for ${Math.ceil(calories / 200)} hours to cancel out this meal!`
	];

	const randomIndex = Math.floor(Math.random() * motivations.length);
	return motivations[randomIndex];
};


function DisplayImage({ input }) {
	// State to store the image URL
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		// Clean the input string, split by commas and remove the quotes
		const urlArray = input
			.replace(/^c\("/, "") // Remove the `c("` at the start
			.replace(/"\)$/, "") // Remove the `")` at the end
			.split('", "').map(url => url.replace(/"/g, ''));

		// Set the first URL in the state
		setImageUrl(urlArray[0]);
	}, [input]); // Only run when the input changes

	return (

		<div>
			{imageUrl && (
				<img
					src={imageUrl}
					alt="First"
				/>
			)}
		</div>
	);
}


function Recipe() {
	const { index } = useParams();
	const { recipes, explenations } = useRecipes();

	const navigate = useNavigate();

	const clickedRecipe = recipes[index];

	if (!clickedRecipe) {
		return <div>Recipe not found</div>;
	} else {

		const ingredientquantities = clickedRecipe.ingredients_raw_str
		? clickedRecipe.ingredients_raw_str
			.match(/"([^"]*)"/g) // Match text inside quotes
			.map((ingredientquant) => ingredientquant.replace(/^"|"$/g, "").trim()) // Remove quotes and trim
		: [];

		const steps = clickedRecipe.RecipeInstructions
			? clickedRecipe.RecipeInstructions
				.replace(/^c\("/, "") // Remove the `c("` at the start
				.replace(/"\)$/, "") // Remove the `")` at the end
				.split('", "') // Split sentences based on `", "`
				.map((step) => step.trim()) // Trim spaces from each sentence
			: [];

		// console.log(clickedRecipe.Images);

		return (

			<div class="recipe-card">
				<div class="header">BRIGHT BITES
					{/* Logo in top right */}
					<img
						onClick={() => navigate("/")}
						className="logoRecipe"
						src={logo}
						alt="Logo"
					/>
					<Button variant="contained" color="primary" onClick={() => navigate(-1)}>
						<img
							src={go_back}
							alt="Go back button"
							style={{ width: '50px', height: '50px' }} // Adjust image size
						/>
					</Button>
				</div>
				<div class="image-container">
					<DisplayImage input={clickedRecipe.Images} />
				</div>
				<div class="content">
					<div className="recipe-name">{clickedRecipe.Name}</div>
					<div class="stats">
						<span>⏱️ {formatDuration(clickedRecipe.TotalTime)}</span>
						<div>
							<RatingImage rating={clickedRecipe.AggregatedRating} />
						</div>
					</div>
					<div class="motivation">
						<div class="section-title">Motivation:</div>
						<p>{getRandomMotivation(clickedRecipe.Calories)}</p>
					</div>
					<div class="ingredients">
						<div class="section-title">Ingredients:</div>
						<ul>
							{ingredientquantities.map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					</div>
					<div class="steps">
						<div class="section-title">Steps:</div>
						<ol>
							{steps.map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ol>
					</div>
				</div>
			</div>
		);
	}
}

export default Recipe;