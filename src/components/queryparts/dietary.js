import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Button, Typography, Box } from '@mui/material';
import '../../css/DietaryPreferences.css';

const DietaryPreferences = ({ handleToCuisine }) => {
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    pescatarian: false,
  });

  const handleCheckboxChange = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="dietary-container">
      <Typography variant="h5" className="header">
        Any dietary preferences?
      </Typography>

      <Box className="checkbox-container">
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.vegetarian}
              onChange={() => handleCheckboxChange('vegetarian')}
            />
          }
          label="Vegetarian"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.vegan}
              onChange={() => handleCheckboxChange('vegan')}
            />
          }
          label="Vegan"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.pescatarian}
              onChange={() => handleCheckboxChange('pescatarian')}
            />
          }
          label="Pescatarian"
        />
      </Box>

      <Box className="button-container">
        <Button variant="contained" color="primary" className="prev-btn" onClick={() => console.log('Prev clicked')}>
          Prev
        </Button>
        <Button variant="contained" color="secondary" className="skip-btn" onClick={() => handleToCuisine()}>
          Skip
        </Button>
      </Box>
    </div>
  );
};

export default DietaryPreferences;
