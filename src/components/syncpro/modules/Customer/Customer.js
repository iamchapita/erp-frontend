import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "../../../Tab";
import {
	customerTabs,
	customerTableHead,
	businessCustomerTableHead,
	naturalCustomerTableHead,
} from "../../../../data/util";
import { Title } from "../../../Title";
import { DataGrid } from "@mui/x-data-grid";
import InputComponent from "../../../InputComponent";
import { useForm } from "../../../../hooks/useForm";
import {
	uploadCustomer,
	loadCustomers,
	loadBusinessCustomers,
	loadNaturalCustomers,
	loadCustomerById,
} from "../../../../actions/customer.action";
import { cleanFormsFields } from "../../../../data/cleanFormsFields";

export const Customer = React.memo(() => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const customers = useSelector((state) => state.customer.customers);
	const businessCustomers = useSelector(
		(state) => state.customer.businessCustomers
	);
	const naturalCustomers = useSelector(
		(state) => state.customer.naturalCustomers
	);
	const customerActive = useSelector(
		(state) => state.customer.customerActive
	);
	const customerTypes = useSelector((state) => state.customer.customerTypes);

	const [activeTab, setActiveTab] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);

	useEffect(() => {
		accessToken && dispatch(loadCustomers(accessToken));
		accessToken && dispatch(loadBusinessCustomers(accessToken));
		accessToken && dispatch(loadNaturalCustomers(accessToken));
	}, [accessToken, dispatch]);

	const handlePost = (e) => {
		e.preventDefault();

		// Limpiando campos según el tipo de cliente
		if (formState.id === 1) {
			formState.businessName = "";
			formState.businessRtn = "";
			formState.hasCredit = "";
			formState.creditAmount = "";
		}

		if (formState.id === 2) {
			formState.naturalRtn = "";
			if (formState.hasCredit === "0") {
				formState.creditAmount = "";
			}
		}

		if (selectedRow !== null) {
			// dispatch(updateCustomer(formState, accessToken));
		} else {
			dispatch(uploadCustomer(formState, accessToken));
		}
	};

	useEffect(() => {
		if (selectedRow !== null) {

			// Estableciendo a vacio los campos que son null
			const ca = cleanFormsFields(customerActive[0]);

			setFormState({
				idCustomerTypeFK: ca.idCustomerTypeFK,
				firstNames: ca.firstNames,
				lastNames: ca.lastNames,
				country: ca.country,
				city: ca.city,
				direction: ca.direction,
				phoneNumber: ca.phoneNumber,
				email: ca.email,
				businessName: ca.businessName,
				businessRtn: ca.businessRtn,
				hasCredit: ca.hasCredit,
				creditAmount: ca.creditAmount,
				naturalRtn: ca.naturalRtn,
			});
		}
	}, [customerActive]);

	const handleRowClick = (params) => {
		setSelectedRow(params.row);
		dispatch(loadCustomerById(params.row.id, accessToken));
	};

	const handleKeyDown = () => {
		setSelectedRow(null);
		setFormState({
			idCustomerTypeFK: "",
			firstNames: "",
			lastNames: "",
			country: "",
			city: "",
			direction: "",
			phoneNumber: "",
			email: "",
			businessName: "",
			businessRtn: "",
			hasCredit: "",
			creditAmount: "",
			naturalRtn: "",
		});
	};

	const [
		formState,
		handleInputChange,
		handleCheck,
		handleSubmit,
		setFormState,
		reset,
	] = useForm({
		// Customer
		idCustomerTypeFK: "",
		firstNames: "",
		lastNames: "",
		country: "",
		city: "",
		direction: "",
		// ContactInfo
		phoneNumber: "",
		email: "",
		// BusinessCustomerType
		businessName: "",
		businessRtn: "",
		hasCredit: "",
		creditAmount: "",
		// NaturalCustomerType
		naturalRtn: "",
	});

	return (
		<div className="p-5 text-start w-full">
			<Title title={"Clientes"} />
			<Tab data={customerTabs} action={setActiveTab} />

			<div className="grid grid-cols-1">
				{customers && activeTab === 0 && (
					<DataGrid
						className="col-span-1"
						autoHeight
						density="compact"
						columns={customerTableHead}
						rows={customers}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 5 },
							},
						}}
						onRowDoubleClick={handleRowClick}
						selectedRow={selectedRow}
						onCellKeyDown={handleKeyDown}
						pageSizeOptions={[5, 10, 20]}
					/>
				)}

				{businessCustomers && activeTab === 1 && (
					<DataGrid
						className="col-span-1"
						autoHeight
						density="compact"
						columns={businessCustomerTableHead}
						rows={businessCustomers}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 5 },
							},
						}}
						onRowDoubleClick={handleRowClick}
						selectedRow={selectedRow}
						onCellKeyDown={handleKeyDown}
						pageSizeOptions={[5, 10, 20]}
					/>
				)}

				{naturalCustomers && activeTab === 2 && (
					<DataGrid
						className="col-span-1"
						autoHeight
						density="compact"
						columns={naturalCustomerTableHead}
						rows={naturalCustomers}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 5 },
							},
						}}
						onRowDoubleClick={handleRowClick}
						selectedRow={selectedRow}
						onCellKeyDown={handleKeyDown}
						pageSizeOptions={[5, 10, 20]}
					/>
				)}
			</div>

			<form onSubmit={handlePost} className="my-2">
				{selectedRow === null ? (
					<Title title={"Agregar Cliente"} />
				) : (
					<Title title={"Actualizar Cliente"} />
				)}
				<div className="[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2">
					<div className="">
						<p className="text-custom-150 font-normal">
							Nombres del Cliente:{" "}
						</p>
						<InputComponent
							handleInputChange={handleInputChange}
							name={"firstNames"}
							className={"w-full"}
							required={true}
							placeholder={"Juan Antonio"}
							value={formState.firstNames}
						/>
					</div>

					<div className="">
						<p className="text-custom-150 font-normal">
							Apellidos del Cliente:{" "}
						</p>
						<InputComponent
							handleInputChange={handleInputChange}
							name={"lastNames"}
							className={"w-full"}
							required={true}
							placeholder={"Pérez Molina"}
							value={formState.lastNames}
						/>
					</div>

					<div>
						<p className="text-custom-150 font-normal">País </p>
						<InputComponent
							handleInputChange={handleInputChange}
							name={"country"}
							className={"w-full"}
							required={true}
							placeholder={"Honduras"}
							value={formState.country}
						/>
					</div>

					<div>
						<p className="text-custom-150 font-normal">Ciudad: </p>
						<InputComponent
							handleInputChange={handleInputChange}
							name={"city"}
							className={"w-full"}
							required={true}
							placeholder={"Distrito Central"}
							value={formState.city}
						/>
					</div>

					<div className="col-span-2">
						<p className="text-custom-150 font-normal">
							Dirección:{" "}
						</p>

						<textarea
							className="w-full
								h-20
								p-2
								rounded
                        		placeholder:text-custom-100
                            	bg-inherit
								border-custom-100
								focus:outline-none
								ring-0
								focus:ring-0
								outline-none
								focus:border-custom-400
							"
							placeholder="Calle Principal, 2do bloque, apartamento 240"
							name="direction"
							value={formState.direction}
							onChange={(e) => {
								handleInputChange(e, 150);
							}}
						/>
						<p className="text-sm text-custom-300 font-normal">
							Caracteres restantes:{" "}
							{150 - formState.direction.length}
						</p>
					</div>

					<div>
						<p className="text-custom-150 font-normal">
							Teléfono:{" "}
						</p>
						<InputComponent
							handleInputChange={handleInputChange}
							className={"w-full"}
							name={"phoneNumber"}
							placeholder={"33959171"}
							value={formState.phoneNumber}
						/>
					</div>

					<div>
						<p className="text-custom-150 font-normal">
							Correo Electrónico:{" "}
						</p>
						<InputComponent
							handleInputChange={handleInputChange}
							className={"w-full"}
							name={"email"}
							placeholder={"correo@ejemplo.com"}
							value={formState.email}
						/>
					</div>

					<div>
						<p className="text-custom-150 font-normal">
							Tipo de Cliente:{" "}
						</p>
						<select
							className="w-full
								h-10
								p-2
								rounded
								placeholder:text-custom-100
								bg-inherit
								border-custom-100
								focus:outline-none
								ring-0
								focus:ring-0
								outline-none
								focus:border-custom-400
							"
							name="idCustomerTypeFK"
							value={formState.idCustomerTypeFK}
							onChange={handleInputChange}
							required={true}
						>
							<option
								className="
									text-custom-100
									bg-custom-300
									hover:bg-custom-250
									active:bg-custom-200
								"
								value={0}
								defaultChecked={true}
							>
								Seleccione un tipo
							</option>
							<option
								className="
									text-custom-100
									bg-custom-300
									hover:bg-custom-250
									active:bg-custom-200
								"
								value={1}
							>
								Natural
							</option>
							<option
								className="
									text-custom-100
									bg-custom-300
									hover:bg-custom-250
									active:bg-custom-200
								"
								value={2}
							>
								Empresarial
							</option>
						</select>
					</div>

					{formState.idCustomerTypeFK === 1 ? (
						<div>
							<p className="text-custom-150 font-normal">RTN: </p>
							<InputComponent
								handleInputChange={handleInputChange}
								className={"w-full"}
								name={"naturalRtn"}
								maxLength={14}
								placeholder={
									"14 caracteres máximo, sin guiones"
								}
								value={formState.naturalRtn}
							/>
						</div>
					) : null}

					{formState.idCustomerTypeFK === 2 ? (
						<>
							<div>
								<p className="text-custom-150 font-normal">
									Nombre de Empresa:{" "}
								</p>
								<InputComponent
									handleInputChange={handleInputChange}
									className={"w-full"}
									name={"businessName"}
									required={true}
									placeholder={"Empresa SA"}
									value={formState.businessName}
								/>
							</div>

							<div>
								<p className="text-custom-150 font-normal">
									RTN:{" "}
								</p>
								<InputComponent
									handleInputChange={handleInputChange}
									className={"w-full"}
									name={"businessRtn"}
									required={true}
									maxLength={"14"}
									placeholder={
										"14 caracteres máximo, sin guiones"
									}
									value={formState.businessRtn}
								/>
							</div>

							<div>
								<p className="text-custom-150 font-normal">
									Posee Crédito:{" "}
								</p>
								<select
									className="w-full
										h-10
										p-2
										rounded
										placeholder:text-custom-100
										bg-inherit
										border-custom-100
										focus:outline-none
										ring-0
										focus:ring-0
										outline-none
										focus:border-custom-400
										"
									name="hasCredit"
									value={formState.hasCredit}
									onChange={handleInputChange}
									required={true}
								>
									<option
										className="
											text-custom-100
											bg-custom-300
											hover:bg-custom-250
											active:bg-custom-200
											"
										value={0}
									>
										No Posee Crédito
									</option>
									<option
										className=" text-custom-100
											bg-custom-300
											hover:bg-custom-250
											active:bg-custom-200
                            			"
										value={1}
									>
										Posee Crédito
									</option>
								</select>
							</div>

							<div>
								{formState.hasCredit === "1" ? (
									<div>
										<p className="text-custom-150 font-normal">
											Monto de Crédito:{" "}
										</p>
										<InputComponent
											handleInputChange={
												handleInputChange
											}
											className={"w-full"}
											name={"creditAmount"}
											required={true}
											placeholder={"10000"}
											value={formState.creditAmount}
										/>
									</div>
								) : null}
							</div>
						</>
					) : null}
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
							{selectedRow === null
								? "Agregar Cliente"
								: "Actualizar Cliente"}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
});
