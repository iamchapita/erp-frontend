import { FetchData } from "../components/utils/fetch";
import { types } from "../types/types";

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
