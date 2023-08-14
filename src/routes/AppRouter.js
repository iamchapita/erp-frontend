import React, { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { PublicRouter } from "./PublicRouter";
import { Navigate, Route, Routes } from "react-router-dom";
import { login } from "../actions/auth.actions";
import { PrivateRouter } from "./PrivateRouter";
import SignUpScreen from "../components/auth/SignUpScreen";
import AuthScreen from "../components/auth/AuthScreen";
import { CircularProgress } from "@mui/material";
import { FetchData } from "../components/utils/fetch";

export const AppRouter = () => {
	const [checking, setChecking] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user?.uid) {
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
				});
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setChecking(false);
		});

		return () => {
			unsubscribe();
		};
	}, [dispatch, setIsLoggedIn, setChecking]);

	return checking ? (
		<div className="space-y-2 flex flex-col items-center justify-center h-screen">
			<CircularProgress color="inherit" />
		</div>
	) : (
		<Routes>
			<Route
				path="/*"
				element={
					<PublicRouter isLoggedIn={isLoggedIn}>
						<Route path="register" element={<SignUpScreen />} />
						<Route path="login" element={<AuthScreen />} />
						<Route path="*" element={<Navigate to={"login"} />} />
					</PublicRouter>
				}
			/>
			<Route
				path="/syncpro/*"
				element={
					<PrivateRouter isLoggedIn={isLoggedIn}></PrivateRouter>
				}
			/>
		</Routes>
	);
};
