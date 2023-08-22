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
import { ProductDetail } from "./ProductDetail";

export const SalesForm = ({
	formState,
	selectedRow,
	handleInputChange,
	reset,
}) => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const customers = useSelector((state) => state.customer.customers);
	const sellers = useSelector((state) => state.employee.sellers);
	const products = useSelector((state) => state.product.products);
	const [purchaseOrderProducts, setPurchaseOrderProducts] = useState([]);

	useEffect(() => {
		accessToken && dispatch(loadCustomersToSales(accessToken));
		accessToken && dispatch(loadSellers(accessToken));
	}, [accessToken, dispatch]);

	const handlePost = (e) => {
		e.preventDefault();
		reset();
	};

	useEffect(() => {
		console.log(purchaseOrderProducts);
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
			<div className="[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2">
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

				<div className="col-span-2">
					<Title title={"Producto"} />
				</div>

				<div className="col-span-2">
					<ProductDetail
						purchaseOrderProducts={purchaseOrderProducts}
						setPurchaseOrderProducts={setPurchaseOrderProducts}
					/>
				</div>

				<div className="col-span-2">
					<ProductsOrder
						products={products}
						purchaseOrderProducts={purchaseOrderProducts}
					/>
				</div>

				<div className="">
					<button
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
