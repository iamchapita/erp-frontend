import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import Footer from "./components/syncpro/Dashboard/Graph";
import React, { useEffect } from "react";
/* import { useServiceWorker } from "./serviceWorkerUpdates";
import addNotification from "react-push-notification";
 */
const App = () => {

	/* const { waitingWorker, showReload, reloadPage } = useServiceWorker();
 */
/* 
	useEffect(() => {
		if (showReload && waitingWorker) {
		  addNotification({
			title: "Actualización disponible",
			subtitle: "Actualización disponible",
			message: "Presione para actualizar",
			theme: "darkblue",
			native: true, // when using native, your OS will handle theming.
			duration: 5000, // when using native, the notification will close after the `duration` ms.
			backgroundColor: "#000",
			theme: "darkblue",
			onClick: () => {
							reloadPage();
			},
					  });
		}
	  }, [waitingWorker, showReload, reloadPage]);
 */
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
