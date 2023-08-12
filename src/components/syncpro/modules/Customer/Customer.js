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

export const Customer = React.memo(() => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const customerActive = useSelector(
		(state) => state.customer.customerActive
	);
	const [selectedRow, setSelectedRow] = useState(null);

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
				hasCredit: ca.hasCredit,
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
				selectedRow={selectedRow}
			/>
		</div>
	);
});
