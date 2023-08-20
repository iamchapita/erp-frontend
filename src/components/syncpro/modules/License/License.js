import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../../Title";
// import { CustomerForm } from "./CustomerForm"; Cambian a UserForm
import { useForm } from "../../../../hooks/useForm";
import { cleanFormsFields } from "../../../../data/cleanFormsFields";
import { DataGrid } from "@mui/x-data-grid";
import { licenseTableHead } from "../../../../data/util";
import {
	loadSystemInfo,
	systemActive,
} from "../../../../actions/system.action";
import { LicenseForm } from "./LicenseForm";
import { FourMp } from "@mui/icons-material";

export const License = () => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const systemInfoActive = useSelector((state) => state.system);
	const systemInfoLoaded = useSelector((state) => state.system);

	useEffect(() => {
		accessToken && dispatch(loadSystemInfo(accessToken));
	}, [accessToken, dispatch]);

	const [selectedRow, setSelectedRow] = useState(null);

	const [
		formState,
		handleInputChange,
		handleCheck,
		handleSubmit,
		setFormState,
		reset,
	] = useForm({
		licenseStartDate: "",
		licenseDueDate: "",
	});

	const handleRowClick = (params) => {
		setSelectedRow(params.row);
		dispatch(systemActive(params.row));
	};

	useEffect(() => {
		if (selectedRow !== null) {
			setFormState({
				licenseStartDate: systemInfoActive.licenseStartDate,
				licenseDueDate: systemInfoActive.licenseDueDate,
			});
		}
	}, [systemInfoActive]);

	return (
		<div className="p-5 text-start w-full">
			<Title title={"Usuarios"} />
			<div className="grid grid-cols-1">
				{systemInfoLoaded && (
					<DataGrid
						className="col-span-1"
						autoHeight
						density="compact"
						columns={licenseTableHead}
						rows={[systemInfoLoaded]}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 5 },
							},
						}}
						onRowDoubleClick={handleRowClick}
						selectedRow={selectedRow}
						pageSizeOptions={[5, 10, 20]}
					/>
				)}
			</div>
			<LicenseForm
				formState={formState}
				handleInputChange={handleInputChange}
				reset={reset}
				selectedRow={selectedRow}
			/>
		</div>
	);

	// return (
	// 	<div className="p-5 text-start w-full">
	// 		<CustomerPageHeader
	// 			selectedRow={selectedRow}
	// 			setSelectedRow={setSelectedRow}
	// 			reset={reset}
	// 		/>
	// 		<CustomerForm
	// 			formState={formState}
	// 			handleInputChange={handleInputChange}
	// 			reset={reset}
	// 			selectedRow={selectedRow}
	// 		/>
	// 	</div>
	// );
};
