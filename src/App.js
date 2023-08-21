import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import Footer from "./components/syncpro/Dashboard/Graph";
import React from "react";

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="flex flex-col bg-custom-800 font-thin text-center h-screen">
					<AppRouter />
				</div>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
