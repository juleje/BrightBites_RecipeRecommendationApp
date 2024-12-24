import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, Button, Typography, Box } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import '../../css/DietaryPreferences.css';
import { BorderLinearProgress } from './progressbar';

const DietaryPreferences = ({ handleToCuisine, backToHome, dietaryPreferences, setDietaryPreferences }) => {

	const [btnState, setBtnState] = useState("Skip");

	const dietaryPreferencesLists = [
		'Vegetarian',
		'Vegan',
		'Pescatarian',
		'Kosher',
		'Halal',
		'Dairyfree',
		'Glutenfree',
		'Keto',
		'Paleo',
		'Rawvegan',
		'Lactovegetarian',
		'Ovovegetarian',
		'Lactoovovegetarian',
		'Lowcarb',
		'Nutfree',
		'Soyfree',
		'Fruitarian',
		'Whole30',
		'Flexitarian',
		'Lowfodmap',
		'Carnivore',
		'Highprotein',
		'Diabeticfriendly',
		'Lowsodium',
	];


	// Update btnState based on preferences
	useEffect(() => {
		const hasSelectedPreferences = Object.values(dietaryPreferences).some((value) => value);
		setBtnState(hasSelectedPreferences ? "Next" : "Skip");
	}, [dietaryPreferences]);

	// Toggle checkbox state
	const handleCheckboxChange = (key) => {
		setDietaryPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<div className="dietary-container">
			<Typography variant="h5" className="header-diet">
				Any dietary preferences?
			</Typography>

			<Box sx={{ width: '100%' }} className="progress-bar">
    			<BorderLinearProgress color="success" variant="determinate" value={0} />
			</Box>

			<Box className="checkbox-container checkbox-con">
				{dietaryPreferencesLists.map((option) => (
					<FormControlLabel
						key={option}
						control={
							<Checkbox
								checked={dietaryPreferences[option]}
								onChange={() => handleCheckboxChange(option)}
							/>
						}
						label={option}
					/>
				))}
			</Box>

			<Box className="button-container">
				<Button variant="contained" color="error" className="prev-btn" onClick={() => backToHome()}>
					Back
				</Button>
				<Button variant="contained" color="success" className="skip-btn" onClick={() => handleToCuisine()}>
					{btnState}
				</Button>
			</Box>
		</div>
	);
};

export default DietaryPreferences;
