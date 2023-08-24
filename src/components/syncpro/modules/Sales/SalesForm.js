import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../../Title";
import InputComponent from "../../../InputComponent";
import { AutocompleteComponent } from "../../../Autocomplete";
import { loadCustomersToSales } from "../../../../actions/customer.action";
import { loadSellers } from "../../../../actions/employee.action";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import { ProductsOrder } from "./ProductsOrder";
import { loadProductsToSaleView } from "../../../../actions/product.actions";
import { uploadpurchaseOrderAction } from "../../../../actions/sales.action";

export const SalesForm = ({
	formState,
	selectedRow,
	handleInputChange,
	handleCheck,
	reset,
	setFormState,
}) => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const customers = useSelector((state) => state.customer.customers);
	const sellers = useSelector((state) => state.employee.sellers);
	const [purchaseOrderProducts, setPurchaseOrderProducts] = useState([]);
	const [salesTax, setSalesTax] = useState("");
	const [taxExemptPrice, setTaxExemptPrice] = useState("");
	const [total, setTotal] = useState("");

	useEffect(() => {
		accessToken && dispatch(loadCustomersToSales(accessToken));
		accessToken && dispatch(loadSellers(accessToken));
		accessToken && dispatch(loadProductsToSaleView(accessToken));
	}, [accessToken, dispatch]);

	const handlePost = (e) => {
		e.preventDefault();
		dispatch(uploadpurchaseOrderAction(formState, accessToken));
		reset();
	};

	const { status } = formState;

	useEffect(() => {
		if (purchaseOrderProducts.length > 0) {
			setSalesTax("15%");

			let taxExemptPriceValue = purchaseOrderProducts.reduce(
				(total, product) => {
					return total + parseFloat(product.totalPerProduct);
				},
				0
			);

			setTaxExemptPrice(taxExemptPriceValue.toFixed(2));
			setTotal(
				(taxExemptPriceValue * 0.15 + taxExemptPriceValue).toFixed(2)
			);

			setFormState({
				...formState,
				status: status,
				total: total,
				taxExemptPrice: taxExemptPrice,
				salesTax: salesTax,
				products: purchaseOrderProducts,
			});
		}
	}, [purchaseOrderProducts]);

	const autoCompleteCustomers = {
		name: "idCustomerFK",
		handleInputChange,
		dispatchProp: loadCustomersToSales,
		items: customers,
		optionName: "fullName",
		icon: <PersonIcon className="text-custom-300" />,
		value: formState.idCustomerFK,
		required: true,
	};

	const autoCompleteSeller = {
		name: "idSellerFK",
		handleInputChange,
		dispatchProp: loadSellers,
		items: sellers,
		optionName: "username",
		icon: <BadgeIcon className="text-custom-300" />,
		value: formState.idSellerFK,
		required: true,
	};

	return (
		<form onSubmit={handlePost} className="my-2">
			<Title title={"Orden de Compra"} />
			<div className="flex flex-col [&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 sm:grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2">
				
				<div className="col-span-2">
					<ProductsOrder
						purchaseOrderProducts={purchaseOrderProducts}
						setPurchaseOrderProducts={setPurchaseOrderProducts}
					/>
				</div>
				<div className="">
					<p className="text-custom-150 font-normal">Cliente: </p>
					<AutocompleteComponent
						key={1}
						{...autoCompleteCustomers}
						handleInputChange={handleInputChange}
					/>
				</div>

				<div className="">
					<p className="text-custom-150 font-normal">Vendedor: </p>
					<AutocompleteComponent
						key={2}
						{...autoCompleteSeller}
						handleInputChange={handleInputChange}
					/>
				</div>

				<div>
					
					<p className="text-custom-150 font-normal">
						Impuesto(15%):{" "}
					</p>

					<InputComponent
						type={"text"}
						handleInputChange={handleInputChange}
						name={"salesTax"}
						className={"w-full"}
						required={true}
						value={salesTax}
						
					/>
				</div>

				

				<div>
					<p className="text-custom-150 font-normal">
						Precio antes de Impuesto:
					</p>

					<InputComponent
						type={"text"}
						handleInputChange={handleInputChange}
						name={"taxExemptPrice"}
						className={"w-full"}
						required={true}
						value={taxExemptPrice}
					/>
				</div>

				<div>
					<p className="text-custom-150 font-normal">Total: </p>
					<InputComponent
						type={"text"}
						handleInputChange={handleInputChange}
						name={"taxExemptPrice"}
						className={"w-full"}
						required={true}
						value={total}
					/>
				</div>

				<div>
					<p className="text-custom-150 font-normal">Estado: </p>
					<input
						checked={status}
						onChange={handleCheck}
						type={"checkbox"}
						className="
							w-5
							h-5
							p-2
							rounded
							text-custom-100
							cursor-pointer
							focus:outline-none
							ring-0
							focus:ring-0
							outline-none	
							font-semibold
						"
						name={"status"}
					/>
				</div>

				<div className="">
					<button
						disabled={total === ""}
						type="submit"
						className="
							w-full
							h-10
							p-2
							rounded
							text-custom-100
							bg-custom-300
							hover:bg-custom-250
							active:bg-custom-200
							focus:outline-none
							ring-0
							focus:ring-0
							outline-none
							focus:border-custom-400
							font-semibold
						"
					>
						Realizar Venta
					</button>
				</div>
			</div>
		</form>
	);
};
