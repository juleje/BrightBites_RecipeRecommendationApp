// src/components/RecipesWithoutExplanation.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../img/logo.svg';
import '../css/RecipesWithExplenation.css';
import { Box, Typography, Alert, AlertTitle, Card, CardContent, CardMedia, Grid, CircularProgress } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ScaleIcon from '@mui/icons-material/Scale';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { useRecipes } from '../hooks/RecipeContext';


const RecipesWithxplanation = () => {
	const { recipes } = useRecipes();

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
		if (!recipes) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [recipes]);



	return (
		<Box display="flex" height="100vh">

			{/* Main Content Area */}
			<Box className="main">
				{/* Logo in top right */}
				<img
					onClick={() => navigate("/")}
					className="logo"
					src={logo}
					alt="Logo"
				/>
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
					<Grid container spacing={3} className='cardgrid'>
						{recipes.map((meal, index) => (
							<Link key={index} to={`/recipe/${index}`}>
								<Grid item xs={12} sm={6} md={4}>
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
											{/* Icons for kcal, fat, and sugar */}
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
								</Grid>
							</Link>
						))}
					</Grid>
				) : (
					<div>No recipes available</div>
				)}
			</Box>
		</Box>
	);
};

export default RecipesWithxplanation;
