import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, FormControl } from "@mui/joy";

export const AutocompleteComponent = ({
	dispatchProp,
	handleInputChange,
	name,
	items,
	optionName,
	icon,
	required,
	value,
}) => {
	const dispatch = useDispatch();
	const accessToken = useSelector((state) => state.auth.accessToken);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (accessToken) {
			setLoading(false);
			dispatch(dispatchProp(accessToken));
		}
	}, [accessToken, dispatch, dispatchProp]);

	const handleSelect = (event, selectedOption) => {
		if (selectedOption) {
			handleInputChange({
				target: {
					name,
					value: selectedOption.id,
				},
			});
		} else {
			handleInputChange({
				target: {
					name,
					value: "",
				},
			});
		}
	};

	return (
		Array.isArray(items) &&
		items.length > 0 && (
			<Autocomplete
				value={
					items.find(
						(option) => option.id === value && option.id !== 0 && option.id !== false
					) || null
				}
				loading={loading}
				loadingText="Cargando..."
				options={items
					.filter(option => option.status !== 0 && option.status !== false && option.status !== 'Inactivo')
					.slice()
					.sort((a, b) => a[optionName].localeCompare(b[optionName]))}
				groupBy={(option) => option[optionName][0]}
				getOptionLabel={(option) => option[optionName]}
				name={name}
				clearText="Limpiar"
				onChange={handleSelect}
				startDecorator={icon}
				required={required}
			/>

		)
	);
};
