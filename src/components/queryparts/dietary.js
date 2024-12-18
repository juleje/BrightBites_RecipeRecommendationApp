import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";
import "../../css/DietaryPreferences.css";

const DietaryPreferences = ({ handleToCuisine }) => {
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    pescatarian: false,
    kosher: false,
    halal: false,
    dairyfree: false,
    glutenfree: false,
    keto: false,
  });

  const handleCheckboxChange = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="dietary-container">
      <Typography variant="h5" className="dietary-header">
        Any dietary preferences?
      </Typography>

      <Box className="checkbox-container">
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.vegetarian}
              onChange={() => handleCheckboxChange("vegetarian")}
            />
          }
          label="Vegetarian"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.vegan}
              onChange={() => handleCheckboxChange("vegan")}
            />
          }
          label="Vegan"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.pescatarian}
              onChange={() => handleCheckboxChange("pescatarian")}
            />
          }
          label="Pescatarian"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.kosher}
              onChange={() => handleCheckboxChange("kosher")}
            />
          }
          label="Kosher"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.halal}
              onChange={() => handleCheckboxChange("halal")}
            />
          }
          label="Halal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.dairyfree}
              onChange={() => handleCheckboxChange("dairyfree")}
            />
          }
          label="Dairy-free"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.glutenfree}
              onChange={() => handleCheckboxChange("glutenfree")}
            />
          }
          label="Gluten-free"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.keto}
              onChange={() => handleCheckboxChange("keto")}
            />
          }
          label="Keto"
        />
      </Box>

      <Box className="button-container">
        <Button
          variant="contained"
          color="primary"
          className="prev-btn"
          onClick={() => console.log("Prev clicked")}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="skip-btn"
          onClick={() => handleToCuisine()}
        >
          Skip
        </Button>
      </Box>
    </div>
  );
};

export default DietaryPreferences;
