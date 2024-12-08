import React, { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const  [recipes, setRecipes] = useState(()=>{
	//Try to load from localStorage or start with null
	const storedRecipes = localStorage.getItem('recipes');
	return storedRecipes ? JSON.parse(storedRecipes) : null;
  });

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipeContext);