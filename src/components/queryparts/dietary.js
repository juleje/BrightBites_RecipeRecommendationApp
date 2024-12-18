import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, Button, Typography, Box } from '@mui/material';
import '../../css/DietaryPreferences.css';

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
			<Typography variant="h5" className="header">
				Any dietary preferences?
			</Typography>

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
				<Button variant="contained" color="primary" className="prev-btn" onClick={() => backToHome()}>
					Previous
				</Button>
				<Button variant="contained" color="secondary" className="skip-btn" onClick={() => handleToCuisine()}>
					{btnState}
				</Button>
			</Box>
		</div>
	);
};

export default DietaryPreferences;
