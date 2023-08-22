import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Binacle } from "../components/syncpro/modules/Binacle/Binacle";
import { Customer } from "../components/syncpro/modules/Customer/Customer";
import { Invoice } from "../components/syncpro/modules/Invoice/Invoice";
import { SideBar } from "../components/syncpro/SideBar";
import { Dashboard } from "../components/syncpro/Dashboard";
import { Product } from "../components/syncpro/modules/Product/Product";
import { useSelector } from "react-redux";
import { LicenseWarning } from "../components/syncpro/LicenseWarning";
import { Sales } from "../components/syncpro/modules/Sales/Sales";

import NavBar from "../components/syncpro/NavBar/NavBar";
import Footer from "../components/syncpro/Dashboard/Graph";
import { ControlPanel } from "../components/admin/ControlPanel";

export const PrivateRouter = ({ isLoggedIn }) => {
	const { role } = useSelector((state) => state.auth);

	return isLoggedIn ? (
		<div className="flex-none sm:flex h-screen">
			<NavBar />

			<SideBar />

			<div className="overflow-y-auto w-full">
				{role === "Administrador" ? <LicenseWarning /> : null}

				<Routes>
					{role === "Administrador" ? (
						<>
						<Route path="bitacora" element={<Binacle />} />
						<Route path="gestionUsuarios" element={<ControlPanel />} />
						</>
					) : (
						<></>
					)}
					<Route path="clientes" element={<Customer />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="productos" element={<Product />} />
					<Route path="facturas" element={<Invoice />} />
					<Route path="ventas" element={<Sales />} />
					<Route path="*" element={<Navigate to={"dashboard"} />} />
				</Routes>

			</div>
		</div>
	) : (
		<Navigate to={"/"} />
	);
};
