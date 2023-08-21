import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../../Title";
import InputComponent from "../../../InputComponent";
import { AutocompleteComponent } from "../../../Autocomplete";
import { loadCustomers } from "../../../../actions/customer.action";
import StraightenIcon from "@mui/icons-material/Straighten";

export const SalesForm = ({
	formState,
	selectedRow,
	handleInputChange,
	reset,
}) => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const customers = useSelector((state) => state.customer.customers);

	useEffect(() => {
		accessToken && dispatch(loadCustomers(accessToken));
		console.log(customers);
	}, [accessToken, dispatch]);

	const handlePost = (e) => {
		e.preventDefault();
		reset();
	};

	const autoCompleteCustomers = {
		name: "idCustomerFK",
		handleInputChange,
		dispatchProp: loadCustomers,
		items: customers,
		optionName: "firstNames",
		icon: <StraightenIcon className="text-custom-300" />,
		value: formState.idCustomerFK,
	};

	return (
		<form onSubmit={handlePost} className="my-2">
			<Title title={"Agregar productos"} />
			<div className="[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2">
				<div>
					<p className="text-custom-150 font-normal">Clientes: </p>
					<AutocompleteComponent
						{...autoCompleteCustomers}
						handleInputChange={handleInputChange}
					/>
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
						Realizar Venta
					</button>
				</div>
			</div>
		</form>
	);
};
