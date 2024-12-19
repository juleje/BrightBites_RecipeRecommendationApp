import React, { useState, useEffect } from 'react';
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





import { click } from '@testing-library/user-event/dist/click';
import { useNavigate, Link } from 'react-router-dom';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ScaleIcon from '@mui/icons-material/Scale';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { Box, Typography, Alert, AlertTitle, Card, CardContent, CardMedia, Grid, CircularProgress } from '@mui/material';



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

const NutritionInfo = ({ nutrition_icons }) => {

	const thresholds = {
		calories: { low: 200, medium: 400 },
		sugar: { low: 10, medium: 20 },
		fat: { low: 5, medium: 15 },
		sodium: { low: 150, medium: 300 }
	};

	const iconMap = {
		calories_green: calories_green,
		calories_orange: calories_orange,
		calories_red: calories_red,
		sugar_green: sugar_green,
		sugar_orange: sugar_orange,
		sugar_red: sugar_red,
		fat_green: fat_green,
		fat_orange: fat_orange,
		fat_red: fat_red,
		sodium_green: sodium_green,
		sodium_orange: sodium_orange,
		sodium_red: sodium_red,
	};

	// Define a utility function to determine icon and text based on thresholds
	const getIconAndText = (value, metric) => {
		const { low, medium } = thresholds[metric];

		if (value <= low) {
			return {
				icon: `${metric}_green`,
				text: `Low ${metric}`,
			};
		} else if (value > low && value <= medium) {
			return {
				icon: `${metric}_orange`,
				text: `Medium ${metric}`,
			};
		} else {
			return {
				icon: `${metric}_red`,
				text: `High ${metric}`,
			};
		}
	};

	// Metrics and their corresponding recipe properties
	const metrics = [
		{ metric: "calories", value: nutrition_icons.Calories },
		{ metric: "sugar", value: nutrition_icons.SugarContent },
		{ metric: "fat", value: nutrition_icons.FatContent },
		{ metric: "sodium", value: nutrition_icons.SodiumContent },
	];

	return (
		<div className="nutrition-info">
			{metrics.map(({ metric, value }) => {
				const { icon, text } = getIconAndText(value, metric);
				return (
					<div className="icon-container" key={metric}>
						<img src={iconMap[icon]} alt={metric} />
						<p>{text}</p>
					</div>
				);
			})}
		</div>
	);
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
		`This meal equals ${Math.round(calories / 250)} of your favorite chocolate bars!`,
		`If you raise your fork ${Math.round(calories / 0.5)} of times you've burned as much calories as the meal equals!`,
		`While dancing during a night out, this meal equals ${Math.round(calories / 300)} hours of dancing!`,
		`This meal is equivalent to ${Math.round(calories / 150)} salads!`,
		`If you have sex for ${Math.round(calories / 100)} times, this meal is fully gone!`,
		`It’s like ${Math.round(calories / 250)} games of intense beach volleyball!`,
		`If you climb ${Math.round(calories / 10)} flights of stairs, this meal is balanced out!`,
		`This is equal to ${Math.round(calories / 50)} hours of binge-watching TV while fidgeting!`,
		`This meal equals ${Math.round(calories / 10)} minutes of running away from zombies!`,
		`You could garden for ${Math.round(calories / 200)} hours to cancel out this meal!`
	];

	const randomIndex = Math.floor(Math.random() * motivations.length);
	return motivations[randomIndex];
};


function DisplayImage({ input }) {
	// State to store the image URL
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		// Clean the input string, split by commas and remove the quotes
		const urlArray = input.split('", "').map(url => url.replace(/"/g, ''));

		// Set the first URL in the state
		setImageUrl(urlArray[0]);
	}, [input]); // Only run when the input changes

	return (

		<div>
			{imageUrl && (
				<img
					src={imageUrl}
					alt="First Image"
					width="200"
				// height="600"
				/>
			)}
		</div>
	);
}

function Recipe() {
	const { index } = useParams();
	const { recipes } = useRecipes();

	const navigate = useNavigate();

	const clickedRecipe = recipes[index];

	if (!clickedRecipe) {
		return <div>Recipe not found</div>;
	} else {


		const ingredientquantities = clickedRecipe.ingredients_raw_str
			? clickedRecipe.ingredients_raw_str
				.split(",") // split since these are stored in a list
				.map((ingredientQuant) => ingredientQuant.trim().replace(/^"|"$/g, ""))
			: [];

		const ingredients = clickedRecipe.RecipeIngredientParts
			? clickedRecipe.RecipeIngredientParts
				.split(",") // Split the string by commas
				.map((ingredient) => ingredient.trim().replace(/^"|"$/g, "")) // Remove quotes and trim spaces
			: [];
		const quantities = clickedRecipe.RecipeIngredientQuantities
			? clickedRecipe.RecipeIngredientQuantities
				.split(",") // Split the string by commas
				.map((quantity) => quantity.trim().replace(/^"|"$/g, "")) // Remove quotes and trim spaces
			: [];

		const combined = ingredients.map((ingredient, index) => ({
			ingredient: ingredient,
			quantity: quantities[index],
		}));

		const steps = clickedRecipe.RecipeInstructions
			? clickedRecipe.RecipeInstructions
				.split(",") // Split the string by commas
				.map((step) => step.trim().replace(/^"|"$/g, "")) // Remove quotes and trim spaces
			: [];

		return (
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
					<div>
						<NutritionInfo nutrition_icons={clickedRecipe} />
					</div>
					{/* <div className="nutrition-info">
						<div className="icon-container">
							<img src={calories} alt="Calories" />
							<p>{clickedRecipe.Calories} kcal</p>
						</div>
						<div className="icon-container">
							<img src={sugar} alt="Sugar" />
							<p>{clickedRecipe.SugarContent}g sugar</p>
						</div>
						<div className="icon-container">
							<img src={fat} alt="Fat" />
							<p>{clickedRecipe.FatContent}g fat</p>
						</div>
						<div className="icon-container">
							<img src={sodium} alt="Sodium" />
							<p>{clickedRecipe.SodiumContent}mg sodium</p>
						</div>
					</div> */}
					<div class="motivation">
						<div class="section-title">Motivation:</div>
						<p>{getRandomMotivation(clickedRecipe.Calories)}</p>
					</div>

					<div class="health-explanations">
						<div class="section-title">Health Explanations:</div>
						<ul>
							<li>Calorie amount: {clickedRecipe.Calories} kcal</li>
							<li>Sugar amount: {clickedRecipe.SugarContent} g</li>
							<li>Fat amount: {clickedRecipe.FatContent} g</li>
							<li>Sodium amount: {clickedRecipe.SodiumContent} mg</li>
						</ul>
					</div>
					<div class="ingredients">
						<div class="section-title">Ingredients:</div>
						<ul>
							{combined.map((item, index) => (
								<li key={index}>
									{item.quantity} {item.ingredient}
								</li>
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