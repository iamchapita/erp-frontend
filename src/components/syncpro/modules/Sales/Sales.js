import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../../Title";

import { SalesPageHeader } from "./SalesPageHeader";

export const Sales = () => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const [selectedRow, setSelectedRow] = useState();

	return (
		<div className="p-5 text-start w-full">
			<Title title={"Ventas"} />
			<SalesPageHeader
				selectedRow={selectedRow}
				setSelectedRow={setSelectedRow}
			/>
			{/* <CustomerForm
				formState={formState}
				handleInputChange={handleInputChange}
				reset={reset}
				selectedRow={selectedRow}
			/> */}
		</div>
	);
};
