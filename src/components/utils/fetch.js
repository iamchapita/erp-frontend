export const FetchData = async (url, authToken) => {
	try {
		const response = await fetch(`http://localhost:8082/${url}`, {
			headers: {
				Authorization: authToken,
			},
		});
		const data = await response.json();
		return data; // Hacer algo con los datos obtenidos
	} catch (error) {
		console.error("Error al realizar la solicitud:", error);
	}
};
