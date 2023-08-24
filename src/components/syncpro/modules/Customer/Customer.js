import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../../Title";
import { CustomerPageHeader } from "./CustomerPageHeader";
import { CustomerForm } from "./CustomerForm";
import { useForm } from "../../../../hooks/useForm";
import {
	loadCustomers,
	loadBusinessCustomers,
	loadNaturalCustomers,
} from "../../../../actions/customer.action";
import { cleanFormsFields } from "../../../../data/cleanFormsFields";
import { useOpen } from "../../../../hooks/useOpen";
import CustomizedSnackbars from "../../../SnackBar";

export const Customer = () => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const customerActive = useSelector(
		(state) => state.customer.customerActive
	);
	const [selectedRow, setSelectedRow] = useState(null);
	const { open, message, handleOpen, handleClose } = useOpen({
		open: true,
		message: "Haz doble click en una fila para editar",
	});

	const { open: open2, message: message2, handleOpen: handleOpen2, handleClose: handleClose2 } = useOpen({
		open: true,
		message: "Para ordernar las celdas, haz click sobre el id y elige el filtro de tu preferencia.",
	});

 
	
		
	

	useEffect(() => {
		accessToken && dispatch(loadCustomers(accessToken));
		accessToken && dispatch(loadBusinessCustomers(accessToken));
		accessToken && dispatch(loadNaturalCustomers(accessToken));
	}, [accessToken, dispatch]);

	const [
		formState,
		handleInputChange,
		handleCheck,
		handleSubmit,
		setFormState,
		reset,
	] = useForm({
		// Customer
		id: "",
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

	useEffect(() => {
		if (selectedRow !== null) {
			// Estableciendo a vacio los campos que son null
			const ca = cleanFormsFields(customerActive[0], null);

			setFormState({
				id: ca.id,
				idCustomerTypeFK: `${ca.idCustomerTypeFK}`,
				firstNames: ca.firstNames,
				lastNames: ca.lastNames,
				country: ca.country,
				city: ca.city,
				direction: ca.direction,
				phoneNumber: ca.phoneNumber,
				email: ca.email,
				businessName: ca.businessName,
				businessRtn: ca.businessRtn,
				hasCredit: `${ca.hasCredit}`,
				creditAmount: ca.creditAmount,
				naturalRtn: ca.naturalRtn,
			});
		}
	}, [customerActive]);

	return (
		<div className="p-5 text-start w-full">
			<Title title={"Clientes"} />
			<CustomerPageHeader
				selectedRow={selectedRow}
				setSelectedRow={setSelectedRow}
				reset={reset}
			/>
			<CustomerForm
				formState={formState}
				handleInputChange={handleInputChange}
				reset={reset}
				selectedRow={selectedRow}
				setSelectedRow={setSelectedRow}
			/>
			<CustomizedSnackbars message={message} open={open} handleClose={handleClose} />
			
{
				!open && <CustomizedSnackbars message={message2} open={open2} handleClose={handleClose2} />
}				
		</div>
	);
};
