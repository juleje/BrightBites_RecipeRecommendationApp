import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Button, Typography, Box } from '@mui/material';
import '../../css/DietaryPreferences.css';

const CuisinePreferences = ({ handleToIngrdidients }) => {
	const [preferences, setPreferences] = useState({
		italian: false,
		thai: false,
		mexican: false,
	});

	const handleCheckboxChange = (key) => {
		setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<div className="dietary-container">
			<Typography variant="h5" className="header">
				Any preffered cuisine?
			</Typography>

			<Box className="checkbox-container">
				<FormControlLabel
					control={
						<Checkbox
							checked={preferences.italian}
							onChange={() => handleCheckboxChange('italian')}
						/>
					}
					label="Italian"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={preferences.thai}
							onChange={() => handleCheckboxChange('thai')}
						/>
					}
					label="Thai"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={preferences.mexican}
							onChange={() => handleCheckboxChange('mexican')}
						/>
					}
					label="Mexican"
				/>
			</Box>

			<Box className="button-container">
				<Button variant="contained" color="primary" className="prev-btn" onClick={() => console.log('Prev clicked')}>
					Prev
				</Button>
				<Button variant="contained" color="secondary" className="skip-btn" onClick={() => handleToIngrdidients()}>
					Skip
				</Button>
			</Box>
		</div>
	);
};

export default CuisinePreferences;
