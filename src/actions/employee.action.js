import Swal from "sweetalert2";
import { FetchData } from "../components/utils/fetch";
import { types } from "../types/types";
import { cleanFormsFields } from "../data/cleanFormsFields";
import { uploadBinacleAction } from "./binacle.actions";
import { getTransactType } from "../components/utils/getTransactType";

const module = "Usuarios";

export const sellerLoaded = (seller) => ({
	type: types.sellerLoaded,
	payload: seller,
});

export const loadSellers = (token) => {
	return async (dispatch) => {
		FetchData("user/getSellers", token).then((data) => {
			dispatch(sellerLoaded(data));
		});
	};
};
