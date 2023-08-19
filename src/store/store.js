import { compose, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";
import { productReducer } from "../reducers/productReducer";
import { customerReducer } from "../reducers/customerReducer";
import { invoiceReducer } from "../reducers/invoiceReducer";
import { binacleReducer } from "../reducers/binacleReducer";
import { systemReducer } from "../reducers/systemReducer";

const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

export const store = configureStore({
	reducer: {
		auth: authReducer,
		ui: uiReducer,
		product: productReducer,
		customer: customerReducer,
		invoice: invoiceReducer,
		binacle: binacleReducer,
		system: systemReducer,
	},
	middleware: [thunk],
	devTools: composeEnhancers(),
});
