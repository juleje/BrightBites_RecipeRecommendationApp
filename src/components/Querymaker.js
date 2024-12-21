import logo from '../img/logo.svg';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext} from 'react';
import DietaryPreferences from './queryparts/dietary';
import CuisinePreferences from './queryparts/cuisine';
import IngredientSelection from './queryparts/ingridients';
import {handlePostRequest} from '../services/backendService'
import { useRecipes } from '../hooks/RecipeContext';
import { PreferenceContext } from '../contexts/PreferenceContext';

function Querymaker() {
	const navigate = useNavigate();
	const { setRecipes, setExplenations } = useRecipes();
	const state = useContext(PreferenceContext)

	const [dietaryPreferences, setDietaryPreferences] = useState({
		vegetarian: false,
		vegan: false,
		pescatarian: false,
		kosher: false,
		halal: false,
		dairyfree: false,
		glutenfree: false,
		keto: false,
		paleo: false,
		rawvegan: false,
		lactovegetarian: false,
		ovovegetarian: false,
		lactoovovegetarian: false,
		lowcarb: false,
		nutfree: false,
		soyfree: false,
		fruitarian: false,
		whole30: false,
		flexitarian: false,
		lowfodmap: false,
		carnivore: false,
		highprotein: false,
		diabeticfriendly: false,
		lowsodium: false,
	});
	const [cuisinePreferences, setCuisinePreferences] = useState({
		Italian: false,
		Chinese: false,
		Japanese: false,
		Belgian: false,
		Indian: false,
		Thai: false,
		Mexican: false,
		French: false,
		Greek: false,
		Spanish: false,
		Vietnamese: false,
		Korean: false,
		American: false,
		Mediterranean: false,
		Turkish: false,
		Lebanese: false,
		Brazilian: false,
		Ethiopian: false,
		Moroccan: false,
		Caribbean: false,
		German: false,
		Russian: false,
		British: false,
		Egyptian: false,
		Filipino: false,
		Malaysian: false,
		Indonesian: false,
		Persian: false,
		Portuguese: false,
		Polish: false,
		Scandinavian: false,
	});

	const [chosenIngredients, setChosenIngredients] = useState([]);


	const [isDietary, setIsDietary] = useState(true);
	const [isCuisine, setIsCuisine] = useState(false);
	const [isIngredients, setIsingriedients] = useState(false);

	const backToHome = () => {
		navigate("/")
	}

	const handleToCuisine = () => {
		setIsDietary(false);
		setIsCuisine(true);
	}

	const backToDietary = () => {
		setIsDietary(true);
		setIsCuisine(false);
	}

	const handleToIngrdidients = () => {
		setIsCuisine(false);
		setIsingriedients(true)
	}

	const backToCuisine = () => {
		setIsCuisine(true);
		setIsingriedients(false);
	}

	const handleGenerateRecipies = () => {
		if (state.preference === false) {
			navigate("/recipies")
		} else {
			navigate("/recipesnoexplanation")
		}

		handlePostRequest(
			setRecipes,
			setExplenations,
			getSelected(dietaryPreferences),
			getSelected(cuisinePreferences),
			chosenIngredients
		)
	}

	const getSelected = (list) => {
		return Object.keys(list)
			.filter((preference) => list[preference])
			.map((preference) => preference.charAt(0).toUpperCase() + preference.slice(1));
	}


	return (
		<>{isDietary ?
			<DietaryPreferences handleToCuisine={handleToCuisine} backToHome={backToHome} dietaryPreferences={dietaryPreferences} setDietaryPreferences={setDietaryPreferences} />
			:
			<>
				{isCuisine ?
					<CuisinePreferences handleToIngrdidients={handleToIngrdidients} backToDietary={backToDietary} cuisinePreferences={cuisinePreferences} setCuisinePreferences={setCuisinePreferences} />
					:
					<>
						{isIngredients ?
							<IngredientSelection handleGenerateRecipies={handleGenerateRecipies} backToCuisine={backToCuisine} chosenIngredients={chosenIngredients} setChosenIngredients={setChosenIngredients} />
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
