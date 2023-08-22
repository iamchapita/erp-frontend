import Swal from "sweetalert2";
import {
	provider,
	auth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	sendEmailVerification,
	signOut,
} from "../firebase/firebase.config";

import { types } from "../types/types";
import { uiFinishLoading, uiStartLoading } from "./ui.actions";
import { PostData, FetchData } from "../components/utils/fetch";
import {
	uploadLoginToBinacleAction,
	uploadSignUpToBinacleAction,
	uploadLogoutToBinacleAction,
} from "./binacle.actions";
import addNotification from "react-push-notification";

export const googleLogin = () => {
	return (dispatch) => {
		dispatch(uiStartLoading());
		signInWithPopup(auth, provider)
			.then(async ({ user }) => {
				// Obteniendo el rol del usuario loggeado
				FetchData("user/getUserRolByUid", user.accessToken, "POST", {
					uid: user.uid,
				}).then((data) => {
					if (data.length > 0) {
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
					} else {
						PostData("user/addUser", null, {
							uid: user.uid,
							username: user.displayName,
							email: user.email,
							password: user.email,
							idUserRoleFK: 1,
							status: 1,
						}).then((data) => {
							dispatch(
								login(
									user.uid,
									user.displayName,
									user.email,
									user.photoURL,
									user.emailVerified,
									user.accessToken,
									1,
									"Administrador"
								)
							);
							dispatch(uploadLoginToBinacleAction(user.accessToken));
						});
					}
				});

				Swal.fire("Inicio de sesión Exitoso", "Bienvenido", "success");
				dispatch(uiFinishLoading());
				addNotification({
					title: "Inicio de sesión Exitoso",
					message: "Bienvenido",
					theme: "darkblue",
					native: true, // when using native, your OS will handle theming.
					icon: "https://cdn-icons-png.flaticon.com/128/1688/1688988.png",
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

					dispatch(uploadLoginToBinacleAction(user.accessToken));

					Swal.fire(
						"Inicio de sesión Exitoso",
						"Bienvenido",
						"success"
					);
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

export const googleRegister = () => {
	return (dispatch) => {
		dispatch(uiStartLoading());
		signInWithPopup(auth, provider)
			.then(async ({ user }) => {
				const userInfo = {
					uid: user.uid,
					username: user.displayName,
					email: user.email,
					password: user.email,
					idUserRoleFK: 1,
					status: 1,
				};

				FetchData(
					"user/addUser",
					user.accessToken,
					"POST",
					userInfo
				).then((data) => {
					FetchData(
						"user/getUserRolByUid",
						user.accessToken,
						"POST",
						{
							uid: user.uid,
						}
					).then((data) => {
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

						dispatch(uploadSignUpToBinacleAction(user.accessToken));
						Swal.fire("Registro Exitoso", "Bienvenido", "success");
					});
					dispatch(uiFinishLoading());
				});
			})
			.catch((error) => {
				console.log(error);
				dispatch(uiFinishLoading());
			});
	};
};

export const signUpWithEmailPasswordName = (displayName, email, password) => {
	return (dispatch) => {
		dispatch(uiStartLoading());
		createUserWithEmailAndPassword(auth, email, password)
			.then(async ({ user }) => {
				await updateProfile(user, { displayName });
				sendEmailVerification(user);

				const userInfo = {
					uid: user.uid,
					username: user.displayName,
					email: user.email,
					password: user.email,
					idUserRoleFK: 1,
					status: 1,
				};

				FetchData(
					"user/addUser",
					user.accessToken,
					"POST",
					userInfo
				).then((data) => {
					FetchData(
						"user/getUserRolByUid",
						user.accessToken,
						"POST",
						{
							uid: user.uid,
						}
					).then((data) => {
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

						dispatch(uploadSignUpToBinacleAction(user.accessToken));
						Swal.fire("Registro Exitoso", "Bienvenido", "success");
					});
					dispatch(uiFinishLoading());
				});
			})
			.catch((e) => {
				Swal.fire("Error", e.message, "error");
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

export const logoutAction = (accessToken) => {
	return async (dispatch, getState) => {
		const { auth: authData } = getState();
		try {
			Swal.fire({
				title: "¿Estás seguro?",
				text: "Estás a punto de cerrar sesión",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#4fD1C5",
				cancelButtonColor: "#d33",
				confirmButtonText: "Sí, cerrar sesión",
				cancelButtonText: "Cancelar",
			}).then(async (result) => {
				if (result.isConfirmed) {
					await signOut(auth)
						.then((data) => {
							dispatch(logout());
							dispatch(
								uploadLogoutToBinacleAction(
									accessToken,
									authData
								)
							);
							addNotification({
								title: "Cierre de sesión Exitoso",
								message: "Hasta pronto",
								theme: "darkblue",
								native: true, // when using native, your OS will handle theming.
								icon: "https://cdn-icons-png.flaticon.com/128/1688/1688988.png",
							});
						})
						.catch((error) => {
							console.log(error);
						});
				}
			});
		} catch (error) {
			console.error("Error durante el logout:", error);
		}
	};
};

const logout = () => ({
	type: types.logout,
});

// export const getUserId = () ={

// }
