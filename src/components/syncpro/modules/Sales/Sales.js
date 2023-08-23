import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../../Title";
import { SalesPageHeader } from "./SalesPageHeader";
import { SalesForm } from "./SalesForm";
import { useForm } from "../../../../hooks/useForm";

export const Sales = () => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);

	const [
		formState,
		handleInputChange,
		handleCheck,
		handleSubmit,
		setFormState,
		reset,
	] = useForm({
		idCustomerFK: "",
		idSellerFK: "",
		status: "",
		total: "",
		taxExemptPrice: "",
		salesTax: "",
		products: "",
	});

	return (
		<div className="p-5 text-start w-full">
			<Title title={"Ventas"} />
			<SalesPageHeader />
			<SalesForm
				formState={formState}
				handleInputChange={handleInputChange}
				handleCheck={handleCheck}
				reset={reset}
				setFormState={setFormState}
			/>
		</div>
	);
};
