// src/components/RecipesWithoutExplanation.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../img/minimalist-logo-trimmed.jpg';
import '../css/RecipesWithExplenation.css';
import { Box, Button, Typography, Alert, AlertTitle, Card, CardContent, CardMedia, Grid2, CircularProgress } from '@mui/material';
import { useRecipes } from '../hooks/RecipeContext';
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

const NutritionInfo = (cals, sug, fat, sod) => {

	const thresholds = {
		Calories: { low: 200, medium: 400 },
		Sugar: { low: 10, medium: 20 },
		Fat: { low: 5, medium: 15 },
		Sodium: { low: 150, medium: 300 }
	};

	const iconMap = {
		Calories_green: calories_green,
		Calories_orange: calories_orange,
		Calories_red: calories_red,
		Sugar_green: sugar_green,
		Sugar_orange: sugar_orange,
		Sugar_red: sugar_red,
		Fat_green: fat_green,
		Fat_orange: fat_orange,
		Fat_red: fat_red,
		Sodium_green: sodium_green,
		Sodium_orange: sodium_orange,
		Sodium_red: sodium_red,
	};

	// Define a utility function to determine icon and text based on thresholds
	const getIconAndText = (value, metric) => {
		const { low, medium } = thresholds[metric];

		if (value <= low) {
			return {
				icon: `${metric}_green`,
				text: `${metric}`,
				number_unit: `${metricsToValueStrings[metric]}`,
			};
		} else if (value > low && value <= medium) {
			return {
				icon: `${metric}_orange`,
				text: `${metric}`,
				number_unit: `${metricsToValueStrings[metric]}`,
			};
		} else {
			return {
				icon: `${metric}_red`,
				text: `${metric}`,
				number_unit: `${metricsToValueStrings[metric]}`,
			};
		}
	};

	const metricsToValueStrings = {
		"calories": `${cals} kcal`,
		"sugar": `${sug} g`,
		"fat": `${fat} g`,
		"sodium": `${sod} mg`,
	};

	// Metrics and their corresponding recipe properties
	const metrics = [
		{ metric: "Calories", value: cals },
		{ metric: "Sugar", value: sug },
		{ metric: "Fat", value: fat },
		{ metric: "Sodium", value: sod },
	];

	return (
		<div className="nutrition-info">
			{metrics.map(({ metric, value }) => {
				const { icon, text, number_unit } = getIconAndText(value, metric);
				return (
					<div className="icon-container" key={metric}>
						<img src={iconMap[icon]} alt={metric} />
						<p class="description_overview">{text}</p>
						{/* <p class="number-unit">{number_unit}</p> */}
					</div>
				);
			})}
		</div>
	);
};

const starRatingMap = {
	0: star0,
	1: star1,
	2: star2,
	3: star3,
	4: star4,
	5: star5,
};

const RatingImage = ({ rating }) => {
	const normalizedRating = Math.max(0, Math.min(5, Math.floor(rating)));
	return (
		<div>
			<img src={starRatingMap[normalizedRating]}
				alt={`${normalizedRating} stars`}
				width="140"
				height="30" />
		</div>
	);
};

const DisplayImage = ({ images_list }) => {
	if (images_list[0] !== "character(0)") {
		return (images_list[0])
	} else {
		return null;
	}
};

const RecipesWithxplanation = () => {
	const { recipes, explanations } = useRecipes();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	// Run on component mount
	useEffect(() => {
		// console.log(recipes)
		if (recipes === "error") {
			setError(true)
		} else {
			setError(false)
		}
		setIsLoading(!recipes);
	}, [recipes]);

	const images_url = recipes ? (recipes.map((recipe) =>
		recipe["Images"]
			? recipe["Images"]
				.replace(/^c\("/, "") // Remove the `c("` at the start
				.replace(/"\)$/, "") // Remove the `")` at the end
				.split('", "') // Split strings based on `", "`
				.map((image) => image.trim().replace(/^"|"$/g, "")) // Trim spaces and remove extra quotes
			: [] // If no "Images" field, return an empty array
	)) : null;

	console.log(images_url);

	return (
		<Box display="flex" height="100vh">
			{/* Header */}
			<div class="header"> Recipes
				{/* Logo in top right */}
				<img
					onClick={() => navigate("/")}
					className="logo"
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

			{/* Main Content Area */}
			<Box className="main">
				{isLoading ? (
					<div>
						<CircularProgress />
					</div>
				) : error ? (
					<Box display="flex" justifyContent="center" alignItems="center" height="200px">
						<Alert severity="error">
							<AlertTitle>Error</AlertTitle>
							There was an error fetching the meal data — <strong>{error}</strong>
						</Alert>
					</Box>
				) : recipes && recipes.length > 0 ? (
					<Grid2 container spacing={3} className='cardgrid'>
						{recipes.map((meal, index) => (
							<Link key={index} to={`/recipe/${index}`} style={{ textDecoration: 'none', maxWidth: '100%' }}>
								<Grid2 item xs={12} sm={6} md={4}>
									<Card className='card'>
										{/* <p>{images_url ? images_url[0] : []}</p> */}
										<CardMedia
											component="img"
											image={images_url[index][0]}
											alt={meal["Name"]}
											max-height="20vw"
										/>
										<CardContent>
											<Typography variant="h6">{meal["Name"]}</Typography>
											<Typography variant="body2" color="textSecondary">
												Category: {meal["RecipeCategory"]}
											</Typography>
											<div className="time-rating">
												<span>⏱️: {formatDuration(meal["TotalTime"])}</span>
												<div>
													<RatingImage rating={meal["AggregatedRating"]} />
												</div>
											</div>
											<div>
												{NutritionInfo(meal["Calories"], meal["SugarContent"], meal["FatContent"], meal["SodiumContent"])}
											</div>
											<div className="description_over">
												{meal["Description"].replaceAll("&quot;", "\"")}
											</div>
										</CardContent>
									</Card>
								</Grid2>
							</Link>
						))}
					</Grid2>
				) : (
					<div>No recipes available</div>
				)}
			</Box>
		</Box >
	);
};

export default RecipesWithxplanation;
