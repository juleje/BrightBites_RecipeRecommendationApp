import React, { useState } from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import '../../css/IngredientSelection.css'; 
import SearchIcon from '@mui/icons-material/Search';


const IngredientSelection = ({handleGenerateRecipies}) => {
  const [ingredient, setIngredient] = useState('');
  const [chosenIngredients, setChosenIngredients] = useState([]);

  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient && !chosenIngredients.includes(ingredient)) {
      setChosenIngredients((prev) => [...prev, ingredient]);
      setIngredient(''); // Clear input field
    }
  };

  return (
    <div className="ingredient-container">
      <Typography variant="h5" className="header">
        Which ingredients would you like to include?
      </Typography>

      <Box className="input-container">
        <TextField
          label="Type ingredient"
          value={ingredient}
          onChange={handleIngredientChange}
          variant="outlined"
          className="ingredient-input"
        />
        <Button
          variant="contained"
          color="primary"
          className="add-btn"
          onClick={handleAddIngredient}
        >
          Add
        </Button>
      </Box>

      <Box className="chosen-container">
        <Typography variant="body1" className="chosen-header">
          Chosen ingredients:
        </Typography>
        <div className="chosen-list">
          {chosenIngredients.map((ingredient, index) => (
            <div key={index} className="chosen-item">{ingredient}</div>
          ))}
        </div>
      </Box>

      <Box className="button-container">
        <Button variant="contained" color="secondary" className="prev-btn">
          Prev
        </Button>
        <Button variant="contained" color="primary" className="find-btn" endIcon={<SearchIcon />} onClick={()=>handleGenerateRecipies()}>
          Find
        </Button>
      </Box>
    </div>
  );
};

export default IngredientSelection;
