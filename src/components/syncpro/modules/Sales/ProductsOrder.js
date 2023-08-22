import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../../Title";
import { SalesPageHeader } from "./SalesPageHeader";
import { SalesForm } from "./SalesForm";
import { useForm } from "../../../../hooks/useForm";
import { DataGrid } from "@mui/x-data-grid";

export const ProductsOrder = ({ products, purchaseOrderProducts }) => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const [selectedRow, setSelectedRow] = useState();

	return (
		<div className="grid grid-cols-1">
			<Title title={"Productos en Order de Compra"} />
			{/* {products 0 && (
				<DataGrid
					className="col-span-1"
					autoHeight
					density="compact"
					columns={salesTableHead}
					rows={products}
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
			)} */}
		</div>
	);
};
