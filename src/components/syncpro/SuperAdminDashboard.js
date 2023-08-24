import React, { useEffect } from "react";
import { dashBoardItems } from "../../data/util";
import { ItemCard } from "./ItemCard";
import { Bolt } from "@mui/icons-material";

import { useSelector } from "react-redux";
import { useOpen } from "../../hooks/useOpen";
import CustomizedSnackbars from "../SnackBar";

export const SuperAdminDashboard = () => {
	const { accessToken } = useSelector((state) => state.auth);
	useEffect(() => {
		// FetchData("product/getProduct/1", accessToken);
	}, [accessToken]);

	const { open, message, handleOpen, handleClose } = useOpen({
		open: true,
		message: "Haz doble click en una fila para editar",
	});
 
	
	return (
		<div className="relative">
			<CustomizedSnackbars	open={open} handleClose={handleClose} message={message} />

			<div className="flex-1 p-5 space-y-3">
				<div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-5 h-auto">
					<div className="bg-white shadow-sm grid col-span-5 p-5 rounded-xl">
						<div className="flex items-center justify-center font-bold text-3xl">
							Panel de Administrador
						</div>
					</div>
				</div>

				<div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-5 h-auto mt-2 sm:mt-5">
					<div className="bg-white shadow-sm grid col-span-1 sm:grid-cols-1 lg:grid-cols-5 p-5 sm:col-span-5 rounded-xl">
						<div className="bg-custom-300 h-64 flex items-center justify-center sm:col-span-5 rounded text-6xl">
							<Bolt
								fontSize="inherit"
								className="text-custom-300 text-6xl bg-white rounded-full me-2"
							/>
							<p className="font-medium text-white">SyncPro</p>
						</div>
					</div>
				</div>

				<div className="sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 space-y-2 sm:space-y-0 gap-2 sm:mt-5 flex-1 justify-between [&>*]:sm:px-5 [&>*]:px-1 [&>*]:rounded-xl [&>*]:w-auto [&>*]:h-20 [&>*]:bg-white [&>*]:shadow-sm">
					{dashBoardItems.map((item, index) => (
						<ItemCard key={index} {...item} />
					))}
				</div>
			</div>
		</div>
	);
};
