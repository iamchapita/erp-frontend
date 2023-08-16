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

export const uploadLoginToBinacleAction = (token) => {
	return async (dispatch, getState) => {
		const { auth } = getState();

		const data = {
			actionType: "Inicio de Sesión",
			uid: auth.uid,
			actionOn: "N/A",
			description: "Inicio de Sesión de usuario en el Sistema.",
		};

		FetchData("binacle/addAction", token, "POST", data).then((data) => {
			dispatch(binacleActive(data));
		});
	};
};

export const uploadLogoutToBinacleAction = (token) => {
	return async (dispatch, getState) => {
		const { auth } = getState();

		const data = {
			actionType: "Cierre de Sesión",
			uid: auth.uid,
			actionOn: "N/A",
			description: "Cierre de sesión de usuario en el Sistema.",
		};

		FetchData("binacle/addAction", token, "POST", data).then((data) => {
			dispatch(binacleActive(data));
		});
	};
};

export const uploadSignUpToBinacleAction = (token) => {
	return async (dispatch, getState) => {
		const { auth } = getState();

		const data = {
			actionType: "Registro",
			uid: auth.uid,
			actionOn: "N/A",
			description: "Registro de usuario en el Sistema.",
		};

		FetchData("binacle/addAction", token, "POST", data).then((data) => {
			dispatch(binacleActive(data));
		});
	};
};
