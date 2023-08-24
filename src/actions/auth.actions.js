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
	updateEmail,
	updatePassword,
	sendPasswordResetEmail
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





export const updatePasswordAction = (user, newPassword) => {
	console.log(updatePassword)
	return async (dispatch) => {
		try {
			await updatePassword(user, newPassword);

			Swal.fire("Contraseña actualizada", "La contraseña se ha actualizado correctamente", "success");
		} catch (error) {
			Swal.fire("Error", error.message, "error");
		}
	};
}


export const sendEmailPasswordReset = async (email) => {

		await sendPasswordResetEmail(auth, email)
			.then(() => {
				Swal.fire("Correo enviado", "Se ha enviado un correo electrónico para restablecer la contraseña", "success").
					then(() => {
						window.location.href = "/login"
					})
					
			})
			.catch((error) => {
				Swal.fire("Error", error.message, "error");

			});
	
}


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
					(e.message === "Firebase: Error (auth/user-not-found)." && "El usuario no existe")
					|| (e.message === "Firebase: Error (auth/wrong-password)." && "La contraseña es incorrecta")
					|| (e.message === "Firebase: Error (auth/invalid-email)." && "El correo no es válido")
					|| (e.message === "Firebase: Error (auth/too-many-requests)." && "Demasiados intentos de inicio de sesión fallidos. Intente más tarde.")
					|| (e.message === "Firebase: Error (auth/user-disabled)." && "El usuario ha sido deshabilitado")
					|| (e.message === "Firebase: Error (auth/invalid-credential)." && "Las credenciales proporcionadas no son válidas")
					|| (e.message === "Firebase: Error (auth/operation-not-allowed)." && "El tipo de cuenta correspondiente a esta credencial, aún no está activado.")
					|| (e.message === "Firebase: Error (auth/invalid-verification-code)." && "El código de verificación no es válido")
					|| (e.message === "Firebase: Error (auth/invalid-verification-id)." && "El ID de verificación no es válido")
					|| (e.message === "Firebase: Error (auth/code-expired)." && "El código de verificación ha expirado")
					|| (e.message === "Firebase: Error (auth/credential-already-in-use)." && "Esta credencial ya está asociada con una cuenta de usuario diferente")
					|| (e.message === "Firebase: Error (auth/email-already-in-use)." && "El correo electrónico ya está en uso por otra cuenta")
					|| (e.message === "Firebase: Error (auth/phone-number-already-exists)." && "El número de teléfono ya está en uso por otra cuenta")
					|| (e.message === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)." && "El acceso a esta cuenta se ha deshabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede intentarlo nuevamente más tarde.")

				Swal.fire("Error", message, "error")
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
