import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const LicenseWarning = () => {
	const { licenseDueDate, remainingDays, licenseStatus } = useSelector(
		(state) => state.system
	);

	// Boton para cerrar banner

	return (
		<div className="relative isolate flex justify-content items-center  gap-x-6 overflow-hidden bg-red-500 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
			<div className="flex flex-col items-center gap-x-4 gap-y-2 w-full">
				<p className="text-md leading-10 text-black">
					<strong className="font-bold text-2xl">
						{licenseStatus == true
							? remainingDays < 2
								? "La licencia vence en 1 día"
								: `La licencia vence en ${remainingDays} días`
							: "Licencia Vencida"}
					</strong>
				</p>
				<p className="text-md leading-6 text-black font-semibold text-xl">
					{licenseStatus == true
						? `La Licencia vence en ${licenseDueDate}`
						: "Comuniquese con el Proveedor para renovar su licencia"}
				</p>
			</div>
		</div>
	);
};
