import Swal from "sweetalert2";
import {
	provider,
	auth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	sendEmailVerification,
} from "../firebase/firebase.config";
import { types } from "../types/types";
import { uiFinishLoading, uiStartLoading } from "./ui.actions";
import { PostData, FetchData } from "../components/utils/fetch";

export const googleLogin = () => {
	return (dispatch) => {
		dispatch(uiStartLoading());
		signInWithPopup(auth, provider)
			.then(async ({ user }) => {
				// Obteniendo el rol del usuario loggeado
				FetchData("user/getUserRolByUid", user.accessToken, "POST", {
					uid: user.uid,
				}).then((data) => {
					dispatch(
						login(
							user.uid,
							user.displayName,
							user.email,
							user.photoURL,
							user.emailVerified,
							user.accessToken,
							data[0].id,
							data[0].name
						)
					);
					Swal.fire("Success", "Welcome", "success");
					dispatch(uiFinishLoading());
				});
			})
			.catch((error) => {
				console.log(error);
				dispatch(uiFinishLoading());
			});
	};
};

export const signInWithEmailPassword = (email, password) => {
	return (dispatch) => {
		dispatch(uiStartLoading());
		signInWithEmailAndPassword(auth, email, password)
			.then(async ({ user }) => {
				// Obteniendo el rol del usuario loggeado
				FetchData("user/getUserRolByUid", user.accessToken, "POST", {
					uid: user.uid,
				}).then((data) => {
					dispatch(
						login(
							user.uid,
							user.displayName,
							user.email,
							user.photoURL,
							user.emailVerified,
							user.accessToken,
							data[0].id,
							data[0].name
						)
					);
					Swal.fire("Success", "Welcome", "success");
					dispatch(uiFinishLoading());
				});
			})
			.catch((e) => {
				const message =
					e.message === "Firebase: Error (auth/user-not-found)." &&
					"El usuario no existe";
				Swal.fire("Error", message, "error");
				console.log(e);
				dispatch(uiFinishLoading());
			});
	};
};

export const login = (
	uid,
	displayName,
	email,
	photoURL,
	emailVerified,
	accessToken,
	idRole,
	role
) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
		email,
		photoURL,
		emailVerified,
		accessToken,
		idRole,
		role,
	},
});

export const signUpWithEmailPasswordName = (displayName, email, password) => {
	return (dispatch) => {
		dispatch(uiStartLoading());
		createUserWithEmailAndPassword(auth, email, password)
			.then(async ({ user }) => {
				await updateProfile(user, { displayName });
				sendEmailVerification(user);

				// Se registra el usuario como inactivo y con rol "No Asignado"
				// El administrador debe establecer elr rol del nuevo usuario
				await PostData("user/addUser", null, {
					uid: user.uid,
					username: user.displayName,
					email: user.email,
					password: user.email,
					idUserRoleFK: 6,
					status: 0,
				});

				console.log(user);
			})
			.catch((e) => {
				Swal.fire("Error", e.message, "error");
				dispatch(uiFinishLoading());
			});
	};
};
