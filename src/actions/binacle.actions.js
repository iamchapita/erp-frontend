import { FetchData } from "../components/utils/fetch";
import { types } from "../types/types";
import { getTransactType } from "../components/utils/getTransactType";

export const binacleActive = (binacle) => ({
	type: types.binacleActive,
	payload: binacle,
});

export const loadBinacle = (token) => {
	return async (dispatch) => {
		FetchData("binacle/getBinacle", token).then((data) => {
			dispatch(binacleLoaded(data));
		});
	};
};

export const binacleLoaded = (binacles) => ({
	type: types.binacleLoaded,
	payload: binacles,
});

export const uploadBinacleAction = (table, transactInfo, token) => {
	return async (dispatch, getState) => {
		const { auth } = getState();
		const data = { ...transactInfo, uid: auth.uid, actionOn: table };

		FetchData("binacle/addAction", token, "POST", data).then((data) => {
			dispatch(binacleActive(data));
		});
	};
};

// !TODO
// ! 2. Acción para inicio/cierre de sesión
// ! 3. Agregar a la ruta de cada FetchData una variable que contenta el modulo a consultar en el backendd
