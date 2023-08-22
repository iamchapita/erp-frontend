/* export const FetchData = async (url, authToken, data = null, method) => {
	try {
		const response = await fetch(`http://localhost:8082/${url}`, {
			method: method,
			headers: {
				"Content-Type": "application/json",
				Authorization: authToken,
			},
			body: JSON.stringify(data),
		});
		const data = await response.json();
		return data; // Hacer algo con los datos obtenidos
	} catch (error) {
		console.error("Error al realizar la solicitud:", error);
	}
}; */

export const FetchData = async (url, authToken, method = 'GET', data = null) => {
	try {
		let httpMethod;
		switch (method) {
			case "GET":
				httpMethod = "GET";
				break;
			case "POST":
				httpMethod = "POST";
				break;
			case "PUT":
				httpMethod = "PUT";
				break;

				case "PATCH":
				httpMethod = "PATCH";
				break;
			case "DELETE":
				httpMethod = "DELETE";
				break;
			default:
				throw new Error(`Método no válido: ${method}`);
		}

		const requestOptions = {
			method: httpMethod,
			headers: {
				"Content-Type": "application/json",
				Authorization: authToken,
			},
		};

		if (data && (httpMethod === "POST" || httpMethod === "PUT" || httpMethod === "PATCH")) {
			requestOptions.body = JSON.stringify(data);
		}

		const response = await fetch(`http://localhost:8082/${url}`, requestOptions);
		const responseData = await response.json();
		return responseData; // Hacer algo con los datos obtenidos
	} catch (error) {
		console.error("Error al realizar la solicitud:", error);
	}
};


export const PostData = async (url, authToken = null, body) => {
	try {
		const response = await fetch(`http://localhost:8082/${url}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: authToken,
			},
			body: JSON.stringify(body),
		});
		const data = await response.json();
		return data; // Hacer algo con los datos obtenidos
	} catch (error) {
		console.error("Error al realizar la solicitud:", error);
	}
};
