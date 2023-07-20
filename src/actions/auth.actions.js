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
import { PostData } from "../components/utils/fetch";

export const googleLogin = () => {
	return (dispatch) => {
		dispatch(uiStartLoading());
		signInWithPopup(auth, provider)
			.then(({ user }) => {
				dispatch(
					login(
						user.uid,
						user.displayName,
						user.email,
						user.photoURL,
						user.emailVerified,
						user.accessToken
					)
				);
				dispatch(uiFinishLoading());
				console.log(user);
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
			.then(({ user }) => {
				console.log(user);
				dispatch(
					login(
						user.uid,
						user.displayName,
						user.email,
						user.photoURL,
						user.emailVerified,
						user.accessToken
					)
				);
				Swal.fire("Success", "Welcome", "success");
				dispatch(uiFinishLoading());
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
	accessToken
) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
		email,
		photoURL,
		emailVerified,
		accessToken,
	},
});

export const signUpWithEmailPasswordName = (displayName, email, password) => {
	return (dispatch) => {
		dispatch(uiStartLoading());
		createUserWithEmailAndPassword(auth, email, password)
			.then(async ({ user }) => {
				await updateProfile(user, { displayName });
				sendEmailVerification(user);

				await PostData("user/addUser", null, {
					uid: user.uid,
					username: user.displayName,
					email: user.email,
					password: user.email,
					idUserRoleFK: 1,
				});

				console.log(user);
			})
			.catch((e) => {
				Swal.fire("Error", e.message, "error");
				dispatch(uiFinishLoading());
			});
	};
};
