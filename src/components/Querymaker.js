import logo from '../img/logo.svg';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DietaryPreferences from './queryparts/dietary';
import CuisinePreferences from './queryparts/cuisine';
import IngredientSelection from './queryparts/ingridients';
import {handlePostRequest} from '../services/backendService'
import { useRecipes } from '../hooks/RecipeContext';

function Querymaker() {
	const navigate = useNavigate();
	const { setRecipes } = useRecipes();

	
	const [isDietary, setIsDietary] = useState(true);
	const [isCuisine, setIsCuisine] = useState(false);
	const [isIngredients, setIsingriedients] = useState(false);

	const handleToCuisine = () => {
		setIsDietary(false);
		setIsCuisine(true);
	}

	const handleToIngrdidients = () => {
		setIsCuisine(false);
		setIsingriedients(true)
	}

	const handleGenerateRecipies = () => {
		navigate("/recipies")
		handlePostRequest(setRecipes)
	}
	


	return (
		<>{isDietary?
			<DietaryPreferences handleToCuisine={handleToCuisine} />
			:
				<>
					{isCuisine?
					<CuisinePreferences handleToIngrdidients={handleToIngrdidients} />
					:
					<>
						{isIngredients?
						<IngredientSelection handleGenerateRecipies={handleGenerateRecipies} />
						:
						<>
							Something went wrong...  Go back to the home page.
						</>
					}
					</>
				}
				</>
			}
		</>
		
	);
}

export default Querymaker;
