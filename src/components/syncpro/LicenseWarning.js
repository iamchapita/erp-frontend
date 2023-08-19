import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

export const LicenseWarning = () => {
	const { licenseDueDate, remainingDays, licenseStatus } = useSelector(
		(state) => state.system
	);
	const [showBanner, setBannerShow] = useState(true);

	return showBanner === true ? (
		<div className="relative isolate flex justify-content items-center  gap-x-6 overflow-hidden bg-red-500 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
			<div className="flex flex-col items-center gap-x-4 gap-y-2 w-full">
				<p className="text-md text-black">
					<strong className="font-bold text-xl">
						{licenseStatus == true
							? remainingDays < 2
								? "La licencia vence en 1 día"
								: `La licencia vence en ${remainingDays} días`
							: "Licencia Vencida"}
					</strong>
				</p>
				<p className="text-md text-black font-semibold text-xl">
					{licenseStatus == true
						? `La Licencia vence en ${licenseDueDate}`
						: "Comuniquese con el Proveedor para renovar su licencia"}
				</p>
			</div>
			<div className="flex flex-1 justify-end">
				<button
					type="button"
					className="-m-3 p-3 focus-visible:outline-offset-[-10px]"
					onClick={() => setBannerShow(!showBanner)}
				>
					<span className="sr-only">Dismiss</span>
					<svg
						className="h-7 w-7 text-gray-900"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
					</svg>
				</button>
			</div>
		</div>
	) : null;
};
