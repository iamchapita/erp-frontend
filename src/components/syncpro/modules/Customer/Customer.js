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
import { CustomerPageHeader } from "./CustomerPageHeader";
import InputComponent from "../../../InputComponent";
import { useForm } from "../../../../hooks/useForm";
import {
	uploadCustomer,
	updateCustomer,
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
			id: "",
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

	return (
		<div className="p-5 text-start w-full">
			<CustomerPageHeader />
		</div>
	);
});
