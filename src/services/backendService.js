//import ip from "ip";

const ipAddress = "192.168.1.16"//ip.address();
const pc = "http://127.0.0.1:5000"
const mobile = `http://${ipAddress}:5000`; // Adjust if different IP is needed for mobile


export const handlePostRequest = async (setRecipes, setExplenations, dietaryPreferences, cuisinePreferences, chosenIngredients) => {
	try {
		const data = {
			"dietary": dietaryPreferences,
			"cuisine": cuisinePreferences,
			"ingredients": chosenIngredients
		};

		setRecipes(null)
		const response = await fetch(pc + "/generate", {
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

		const responseread = await response.text()
		const jsonData = JSON.parse(responseread);
		const jsonRecipes = JSON.parse(jsonData.recipes);
		const jsonExplenations = JSON.parse(jsonData.explanations);
		localStorage.setItem('recipes', JSON.stringify(jsonRecipes));
		localStorage.setItem('explenations', JSON.stringify(jsonExplenations));
		setRecipes(jsonRecipes);
		setExplenations(jsonExplenations);
	} catch (error) {
		console.error("Error making POST request:", error);
	}
};

// Function To Test Backend
export const fetchTestBackend = async () => {
	try {
		const response = await fetch(mobile + "/");
		if (!response.ok) {
			throw new Error(`Error ${response.status}: ${response.statusText}`);
		}
		console.log(await response.json())
	} catch (error) {
		throw error;
	}
};