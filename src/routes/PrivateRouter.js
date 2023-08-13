import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Binacle } from "../components/syncpro/modules/Binacle/Binacle";
import { Customer } from "../components/syncpro/modules/Customer/Customer";
import { Invoice } from "../components/syncpro/modules/Invoice/Invoice";
import { SideBar } from "../components/syncpro/SideBar";
import { Dashboard } from "../components/syncpro/Dashboard";
import { Product } from "../components/syncpro/modules/Product/Product";

export const PrivateRouter = ({ isLoggedIn }) => {
	return isLoggedIn ? (
		<div className="flex">
			<SideBar />
			<Routes>
				<Route path="clientes" element={<Customer />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="productos" element={<Product />} />
				<Route path="facturas" element={<Invoice />} />
				<Route path="bitacora" element={<Binacle />} />
				<Route path="*" element={<Navigate to={"dashboard"} />} />
			</Routes>
		</div>
	) : (
		<Navigate to={"/auth/login"} />
	);
};
