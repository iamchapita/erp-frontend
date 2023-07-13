import { useSelector } from "react-redux";

export const FetchData = (url, authToken) => {
    fetch(url, {
        headers: {
            Authorization: authToken
        }
    }
    )
        .then(response => response.json())
        .then(data => {
            console.log(data); // Hacer algo con los datos obtenidos
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        })
}