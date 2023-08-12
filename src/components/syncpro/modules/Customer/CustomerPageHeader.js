import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect, useState } from "react";
import { Tab } from "../../../Tab";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../../../../actions/customer.action";
import { customerTableHead, customerTabs } from "../../../../data/util";

export const CustomerPageHeader = () => {
	const dispatch = useDispatch();
	const { customers, businessCustomers, naturalCustomers } = useSelector(
		(state) => state.customer
	);

	const [data, setData] = useState([]);
	const [tableHead, setTableHead] = useState(customerTableHead);

	const handleTabClick = (index, tab) => {
		if (tab === "Clientes") {
			// console.log(customers);
			setData(customers);
			setTableHead(customerTableHead);
		}
		if (tab === "Clientes Empresariales") {
			// console.log(businessCustomers);
			setData(businessCustomers);
		}
		if (tab === "Clientes Naturales") {
			// console.log(naturalCustomers);
			setData(naturalCustomers);
		}

		dispatch(changeTab({ index, tab }));
	};

	useEffect(() => {
		setData(customers);
		dispatch(changeTab({ index: 0, tab: customerTabs[0] }));
	}, [dispatch, customers]);

	const tabData = {
		dataTabs: customerTabs,
		handleTabClick,
		reducer: "customer",
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
						pageSizeOptions={[5, 10, 20]}
					/>
				)}
			</div>
		</>
	);
};
