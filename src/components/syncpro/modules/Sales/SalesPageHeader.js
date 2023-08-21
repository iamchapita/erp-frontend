import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { salesTableHead } from "../../../../data/util";
import { loadPurchaseOrder } from "../../../../actions/sales.action";

export const SalesPageHeader = ({ selectedRow, setSelectedRow }) => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const purchaseOrders = useSelector((state) => state.sales.purchaseOrders);
	const [data, setData] = useState([]);

	useEffect(() => {
		accessToken && dispatch(loadPurchaseOrder(accessToken));
	}, [accessToken, dispatch]);

	useEffect(() => {
		setData(purchaseOrders);
	}, [purchaseOrders, dispatch]);

	const handleRowClick = (params) => {
		setSelectedRow(params.row);
		// dispatch(loadCustomerById(params.row.id, accessToken));
	};

	const handleKeyDown = () => {
		setSelectedRow(null);
		// reset();
	};

	return (
		<div className="grid grid-cols-1">
			{data && (
				<DataGrid
					className="col-span-1"
					autoHeight
					density="compact"
					columns={salesTableHead}
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
	);
};
