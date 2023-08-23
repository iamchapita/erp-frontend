import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Binacle } from "../components/syncpro/modules/Binacle/Binacle";
import { useSelector } from "react-redux";
import { LicenseWarning } from "../components/syncpro/LicenseWarning";
import { SuperAdminDashboard } from "../components/syncpro/SuperAdminDashboard";
import { SideBar } from "../components/syncpro/SideBar";
import { User } from "../components/syncpro/modules/User/User";
import { License } from "../components/syncpro/modules/License/License";
import NavBar from "../components/syncpro/NavBar/NavBar";

export const SuperAdminRouter = ({ isLoggedIn }) => {
	const { role } = useSelector((state) => state.auth);

	return isLoggedIn ? (
		<div className="flex h-screen">
			<SideBar />
			<NavBar />
			<div className="overflow-y-auto w-full">
				<LicenseWarning />

				<Routes>
					<Route path="dashboard" element={<SuperAdminDashboard />} />
					<Route path="bitacora" element={<Binacle />} />
					<Route path="usuarios" element={<User />} />
					<Route path="licencia" element={<License />} />
					<Route path="" element={<Binacle />} />

					<Route path="*" element={<Navigate to={"dashboard"} />} />
				</Routes>
			</div>
		</div>
	) : (
		<Navigate to={"/auth/login"} />
	);
};
