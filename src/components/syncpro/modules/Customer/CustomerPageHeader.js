import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect, useState } from "react";
import { Tab } from "../../../Tab";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../../../../actions/customer.action";
import {
	customerTableHead,
	businessCustomerTableHead,
	naturalCustomerTableHead,
	customerTabs,
} from "../../../../data/util";
import {
	loadCustomerById,
	loadCustomers,
	loadBusinessCustomers,
	loadNaturalCustomers,
} from "../../../../actions/customer.action";

export const CustomerPageHeader = ({ selectedRow, setSelectedRow, reset }) => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const { customers, businessCustomers, naturalCustomers } = useSelector(
		(state) => state.customer
	);

	const [data, setData] = useState([]);
	const [tableHead, setTableHead] = useState(customerTableHead);

	useEffect(() => {
		setData(customers);
		dispatch(changeTab({ index: 0, tab: customerTabs[0] }));
	}, [dispatch, customers]);

	useEffect(() => {
		setData(customers);
	}, [customers, businessCustomers, naturalCustomers]);

	const handleTabClick = (index, tab) => {
		if (tab === "Clientes") {
			// console.log(customers);
			setData(customers);
			setTableHead(customerTableHead);
		}
		if (tab === "Clientes Empresariales") {
			// console.log(businessCustomers);
			setData(businessCustomers);
			setTableHead(businessCustomerTableHead);
		}
		if (tab === "Clientes Naturales") {
			// console.log(naturalCustomers);
			setData(naturalCustomers);
			setTableHead(naturalCustomerTableHead);
		}

		dispatch(changeTab({ index, tab }));
	};

	const tabData = {
		dataTabs: customerTabs,
		handleTabClick,
		reducer: "customer",
	};

	const handleRowClick = (params) => {
		setSelectedRow(params.row);
		dispatch(loadCustomerById(params.row.id, accessToken));
	};

	const handleKeyDown = () => {
		setSelectedRow(null);
		reset();
	};

	return (
		<>
			<Tab {...tabData} />
			<div className="grid grid-cols-1">
				{data && (
					<DataGrid
						className="col-span-1"
						autoHeight
						density="compact"
						columns={tableHead}
						rows={data}
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
		</>
	);
};
