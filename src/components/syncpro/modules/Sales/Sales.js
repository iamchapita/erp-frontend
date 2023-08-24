import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../../Title";
import { SalesPageHeader } from "./SalesPageHeader";
import { SalesForm } from "./SalesForm";
import { useForm } from "../../../../hooks/useForm";
import { useOpen } from "../../../../hooks/useOpen";
import CustomizedSnackbars from "../../../SnackBar";

export const Sales = () => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);

	const { open, message, handleOpen, handleClose } = useOpen({
		open: true,
		message: "Haz doble click en una fila para editar",
	});
 
	
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
			<CustomizedSnackbars open={open} handleClose={handleClose} message={message} />
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
