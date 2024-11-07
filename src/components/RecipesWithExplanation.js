// src/components/RecipesWithoutExplanation.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.svg';
import '../css/RecipesWithExplenation.css';
import { Box, Typography, Alert, AlertTitle, Card, CardContent, CardMedia, Grid, CircularProgress } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ScaleIcon from '@mui/icons-material/Scale';
import ViewInArIcon from '@mui/icons-material/ViewInAr';


const RecipesWithxplanation = () => {
	const navigate = useNavigate();
	const [mealData, setMealData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Function to fetch data from the API
	const fetchMealData = async () => {
		try {
			setIsLoading(true)
			const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata");
			if (!response.ok) {
				throw new Error(`Error ${response.status}: ${response.statusText}`);
			}
			const data = await response.json();
			setTimeout(50000)
			return data;
		} catch (error) {
			throw error;
		}
	};

	// Sequentially fetch data six times 
	const fetchMealsSixTimes = async () => {
		try {
			//LOOP FOR TESTING REASONS
			const results = [];
			for (let i = 0; i < 12; i++) {
				const result = await fetchMealData();
				results.push(result);
			}
			setMealData(results); // Store all six results in state
		} catch (error) {
			setError(error.message); // Set the error message in state
		} finally {
			setIsLoading(false); // Set loading to false after all calls complete, regardless of success or failure
		}
	};

	// Run on component mount
	useEffect(() => {
		fetchMealsSixTimes()
		setIsLoading(false);  // Set loading to false after all calls complete
	}, []);

	return (
		<Box display="flex" height="100vh">
			{/* Sidebar */}
			<Box class="sidebar">
				<Typography variant="h6">Lorem ipsum</Typography>
			</Box>

			{/* Main Content Area */}
			<Box class="main">
				{/* Logo in top right */}
				<img
					onClick={() => navigate("/")}
					class="logo"
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
				) : (
					<Grid container spacing={3} className='cardgrid'>
						{mealData.map((meal, index) => (
							<Grid item xs={12} sm={6} md={4} key={index}>
								<Card>
									<CardMedia
										component="img"
										height="140"
										image={meal["meals"][0]["strMealThumb"]}
										alt={meal["meals"][0]["strMeal"]}
									/>
									<CardContent>
										<Typography variant="h6">{meal["meals"][0]["strMeal"]}</Typography>
										<Typography variant="body2" color="textSecondary">
											Category: {meal["meals"][0]["strCategory"]}
										</Typography>
										<Typography variant="body2" color="textSecondary">
											Cuisine: {meal["meals"][0]["strArea"]}
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
						))}
					</Grid>
				)}
			</Box>
		</Box>
	);
};
/*

					
					*/
export default RecipesWithxplanation;
