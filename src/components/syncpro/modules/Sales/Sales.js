import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../../Title";
import { SalesPageHeader } from "./SalesPageHeader";
import { SalesForm } from "./SalesForm";
import { useForm } from "../../../../hooks/useForm";

export const Sales = () => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const [selectedRow, setSelectedRow] = useState();

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
		taxablePrice: "",
		taxExemptPrice: "",
		salesTax: "",
		subTotal: "",
		total: "",
		status: "",
		idPurchaseOrderFK: "",
		idProductFK: "",
		pricePerUnit: "",
		productQuantity: "",
		totalPerProduct: "",
	});

	return (
		<div className="p-5 text-start w-full">
			<Title title={"Ventas"} />
			<SalesPageHeader
				selectedRow={selectedRow}
				setSelectedRow={setSelectedRow}
			/>

			<SalesForm
				formState={formState}
				selectedRow={selectedRow}
				handleInputChange={handleInputChange}
				reset={reset}
			/>
		</div>
	);
};
