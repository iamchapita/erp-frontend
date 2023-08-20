import Swal from "sweetalert2";
import addNotification from "react-push-notification";

export const logOut = () => {
	Swal.fire({
		title: "¿Está seguro?",
		text: "¿Está seguro que desea cerrar sesión?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#4fD1C5",
		cancelButtonColor: "#d33",
		confirmButtonText: "Sí, cerrar sesión",
		cancelButtonText: "Cancelar",
	}).then((result) => {
		if (result.isConfirmed) {
			indexedDB.deleteDatabase("firebaseLocalStorageDb");
			window.location.reload();
			addNotification({
				title: "Cierre de sesión Exitoso",
				message: "Hasta pronto",
				theme: "darkblue",
				native: true, // when using native, your OS will handle theming.
				icon: "https://cdn-icons-png.flaticon.com/128/1688/1688988.png",
			});
			return true;
		} else {
			return false;
		}
	});
};
