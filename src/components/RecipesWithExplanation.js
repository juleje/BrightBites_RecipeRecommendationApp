// src/components/RecipesWithoutExplanation.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../img/minimalist-logo-trimmed.jpg';
import '../css/RecipesWithExplenation.css';
import { Box, Button, Typography, Alert, AlertTitle, Card, CardContent, CardMedia, Grid2, CircularProgress } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ScaleIcon from '@mui/icons-material/Scale';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { useRecipes } from '../hooks/RecipeContext';
import go_back from '../img/go_back.png'
import star0 from '../img/0stars.png'
import star1 from '../img/1star.png'
import star2 from '../img/2stars.png'
import star3 from '../img/3stars.png'
import star4 from '../img/4stars.png'
import star5 from '../img/5stars.png'


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

const DisplayImage = ({ input }) => {
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		const urlArray = input.split('", "').map((url) => url.replace(/"/g, ''));
		setImageUrl(urlArray[0]);
	}, [input]);

	return (
		<div>
			{imageUrl && (
				<img
					src={imageUrl}
					alt="Recipe displayed"
				/>)}
		</div>
	);
};

const RecipesWithxplanation = () => {
	const { recipes, explanations } = useRecipes();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	// Run on component mount
	useEffect(() => {
		//console.log(recipes)
		if (recipes === "error") {
			setError(true)
		} else {
			setError(false)
		}
		setIsLoading(!recipes);
	}, [recipes]);


	return (
		<Box display="flex" height="100vh">
			{/* Header */}
			<Box className="header">
				<Typography variant="h5" className="title">Recipes</Typography>
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
			</Box>

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
							<Link key={index} to={`/recipe/${index}`}>
								<Grid2 item xs={12} sm={6} md={4}>
									<Card>
										<CardMedia
											component="img"
											height="140"
											image={meal["Images"]}

											//todo get one image of the list
											//.split(',').map(url => url.trim().replace(/^"|"$/g, ''))[0]
											//""https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/28/07/67/picWCKjGq.jpg", "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/28/07/67/picTftMcf.jpg", "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/28/07/67/picp0lR15.jpg""
											alt={meal["Name"]}
										/>
										<CardContent>
											<Typography variant="h6">{meal["Name"]}</Typography>
											<Typography variant="body2" color="textSecondary">
												Category: {meal["RecipeCategory"]}
											</Typography>
											<Typography variant="body2" color="textSecondary">
												Time: {meal["TotalTime"]}
											</Typography>
											<Box display="flex" alignItems="center" mt={1}>
												<LocalFireDepartmentIcon color="error" style={{ marginRight: 4 }} />
												<Typography variant="body2">Kcal: 500</Typography>
											</Box>
											<Box display="flex" alignItems="center" mt={1}>
												<ScaleIcon color="primary" style={{ marginRight: 4 }} />
												<Typography variant="body2">Fat: 20g</Typography>
											</Box>
											<Box display="flex" alignItems="center" mt={1}>
												<ViewInArIcon color="secondary" style={{ marginRight: 4 }} />
												<Typography variant="body2">Sugar: 15g</Typography>
											</Box>
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
		</Box>
	);
};

export default RecipesWithxplanation;
