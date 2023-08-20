import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../../Title";
import InputComponent from "../../../InputComponent";
import {
	uploadCustomer,
	updateCustomer,
	loadCustomers,
	loadBusinessCustomers,
	loadNaturalCustomers,
} from "../../../../actions/customer.action";
import moment from "moment";

export const LicenseForm = ({
	formState,
	selectedRow,
	handleInputChange,
	reset,
}) => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);

	const handlePost = (e) => {
		e.preventDefault();

		// Envio de formulario
		// dispatch();

		reset();
	};

	const licenseStartDate = moment(
		formState.licenseStartDate,
		"YYYY-MM-DD"
	).format("YYYY-MM-DD");
	const licenseDueDate = moment(
		formState.licenseDueDate,
		"YYYY-MM-DD"
	).format("YYYY-MM-DD");

	return (
		<form onSubmit={handlePost} className="my-2">
			<Title title={"Actualizar Licencia"} />
			<div className="[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2">
				<div className="">
					<div>
						<p className="text-custom-150 font-normal">
							Inicio de Licencia:{" "}
						</p>
						<InputComponent
							value={licenseStartDate}
							required={true}
							type={"date"}
							min={"2023-01-01"}
							className={"w-full"}
							name={"licenseStartDate"}
							handleInputChange={handleInputChange}
							placeholder={"Fecha de Inicio de Licencia"}
						/>
					</div>
				</div>

				<div className="">
					<div>
						<p className="text-custom-150 font-normal">
							Inicio de Licencia:{" "}
						</p>
						<InputComponent
							value={licenseDueDate}
							required={true}
							type={"date"}
							min={"2023-01-01"}
							className={"w-full"}
							name={"licenseDueDate"}
							handleInputChange={handleInputChange}
							placeholder={"Fecha de Inicio de Licencia"}
						/>
					</div>
				</div>

				<div className="col-start-1">
					<button
						type="submit"
						className="
								w-full
								h-10
								p-2
								rounded
								text-custom-100
								bg-custom-300
								hover:bg-custom-250
								active:bg-custom-200
								focus:outline-none
								ring-0
								focus:ring-0
								outline-none
								focus:border-custom-400
								font-semibold
							"
					>
						Actualizar Licencia
					</button>
				</div>
			</div>
		</form>
	);
};
