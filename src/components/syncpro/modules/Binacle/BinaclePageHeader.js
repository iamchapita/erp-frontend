import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { binacleTableHead } from "../../../../data/util";
import { loadBinacle } from "../../../../actions/binacle.actions";

export const BinaclePageHeader = () => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const { binacles } = useSelector((state) => state.binacle);
	const [data, setData] = useState([]);

	useEffect(() => {
		accessToken && dispatch(loadBinacle(accessToken));
	}, [accessToken, dispatch]);

	useEffect(() => {
		setData(binacles);
	}, [binacles, dispatch]);

	return (
		<div className="grid grid-cols-1">
			{data && (
				<DataGrid
					className="col-span-1"
					autoHeight
					density="compact"
					columns={binacleTableHead}
					rows={data}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 20 },
						},
					}}
					pageSizeOptions={[10, 15, 20, 25, 30]}
				/>
			)}
		</div>
	);
};
