export const handlePostRequest = async () => {
	try {
		const data = {
			"hello": "world"
		};

		const response = await fetch("http://127.0.0.1:5000/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`Error ${response.status}: ${response.statusText}`);
		}

		const jsonData = await response.json();
		console.log(jsonData); // Log the response to the console
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