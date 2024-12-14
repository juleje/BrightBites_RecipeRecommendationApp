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
import calories from '../img/calorie.png'
import sugar from '../img/sugar.png'
import fat from '../img/fat.png'
import sodium from '../img/sodium.png'
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

function DisplayImage({input}) {
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
					<div className="nutrition-info">
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
					</div>
					<div class="motivation">
						<div class="section-title">Motivation:</div>
						<p> - Calorie amount: To burn this amount of calories, you need to climb 300 stairs</p>
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