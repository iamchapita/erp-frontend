import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Binacle } from "../components/syncpro/modules/Binacle/Binacle";
import { useSelector } from "react-redux";
import { LicenseWarning } from "../components/syncpro/LicenseWarning";
import { SuperAdminDashboard } from "../components/syncpro/SuperAdminDashboard";
import { SideBar } from "../components/syncpro/SideBar";

export const SuperAdminRouter = ({ isLoggedIn }) => {
	const { role } = useSelector((state) => state.auth);

	return isLoggedIn ? (
		<div className="flex h-screen">
			<SideBar />

			<div className="overflow-y-auto w-full">
				<LicenseWarning />

				<Routes>
					<Route path="dashboard" element={<SuperAdminDashboard />} />
					<Route path="bitacora" element={<Binacle />} />
					<Route path="usuarios" element={<Binacle />} />
					<Route path="licencia" element={<Binacle />} />
					<Route path="" element={<Binacle />} />

					<Route path="*" element={<Navigate to={"dashboard"} />} />
				</Routes>
			</div>
		</div>
	) : (
		<Navigate to={"/auth/login"} />
	);
};
