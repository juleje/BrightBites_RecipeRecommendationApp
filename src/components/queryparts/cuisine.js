import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, Button, Typography, Box } from '@mui/material';
import '../../css/DietaryPreferences.css';


const CuisinePreferences = ({ handleToIngrdidients, backToDietary, cuisinePreferences, setCuisinePreferences }) => {
	const [btnState, setBtnState] = useState("Skip");
	

	const preferencesLists = [
		'Italian',
		'Chinese',
		'Japanese',
		'Belgian',
		'Indian',
		'Thai',
		'Mexican',
		'French',
		'Greek',
		'Spanish',
		'Vietnamese',
		'Korean',
		'American',
		'Mediterranean',
		'Turkish',
		'Lebanese',
		'Brazilian',
		'Ethiopian',
		'Moroccan',
		'Caribbean',
		'German',
		'Russian',
		'British',
		'Egyptian',
		'Filipino',
		'Malaysian',
		'Indonesian',
		'Persian',
		'Portuguese',
		'Polish',
		'Scandinavian',
	];

	// Update btnState based on preferences
	useEffect(() => {
		const hasSelectedPreferences = Object.values(cuisinePreferences).some((value) => value);
		setBtnState(hasSelectedPreferences ? "Next" : "Skip");
	}, [cuisinePreferences]);

	// Toggle checkbox state
	const handleCheckboxChange = (key) => {
		setCuisinePreferences((prev) => ({ ...prev, [key]: !prev[key] }));
	};

  return (
    <div className="dietary-container">
      <Typography variant="h5" className="header">
        Any prefered cuisine?
      </Typography>

			<Box className="checkbox-container checkbox-con">
				{preferencesLists.map((option) => (
					<FormControlLabel
						key={option}
						control={
							<Checkbox
								checked={cuisinePreferences[option]}
								onChange={() => handleCheckboxChange(option)}
							/>
						}
						label={option}
					/>
				))}
			</Box>

			<Box className="button-container">
				<Button variant="contained" color="primary" className="prev-btn" onClick={() => backToDietary()}>
					Back
				</Button>
				<Button variant="contained" color="secondary" className="skip-btn" onClick={() => handleToIngrdidients()}>
					{btnState}
				</Button>
			</Box>
		</div>
	);
};

export default CuisinePreferences;
