export const handlePostRequest = async (setRecipes, dietaryPreferences, cuisinePreferences, chosenIngredients) => {
	try {
		const data = {
			"dietary": dietaryPreferences,
			"cuisine": cuisinePreferences,
			"ingredients": chosenIngredients
		};

		setRecipes(null)
		const response = await fetch("http://127.0.0.1:5000/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			setRecipes("error")
			throw new Error(`Error ${response.status}: ${response.statusText}`);
		}

		const jsonData = JSON.parse(await response.json());
		localStorage.setItem('recipes', JSON.stringify(jsonData));
		setRecipes(jsonData);
	} catch (error) {
		console.error("Error making POST request:", error);
	}
};

// Function To Test Backend
export const fetchTestBackend = async () => {
	try {
		const response = await fetch("http://127.0.0.1:5000/");
		if (!response.ok) {
			throw new Error(`Error ${response.status}: ${response.statusText}`);
		}
		console.log(await response.json())
	} catch (error) {
		throw error;
	}
};