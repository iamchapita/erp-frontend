import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../../../InputComponent";
import { AutocompleteComponent } from "../../../Autocomplete";
import { loadProductsToSaleView } from "../../../../actions/product.actions";
import BadgeIcon from "@mui/icons-material/Badge";
import { loadInventory } from "../../../../actions/product.actions";

export const ProductDetail = ({
	purchaseOrderProducts,
	setPurchaseOrderProducts,
}) => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const products = useSelector((state) => state.product.products);
	const inventory = useSelector((state) => state.product.inventory);
	const [productSelected, setProductSelected] = useState();
	const [orderQuantity, setOrderQuantity] = useState(1);
	const [totalPerProduct, seTotalPerProduct] = useState(0);

	useEffect(() => {
		accessToken && dispatch(loadProductsToSaleView(accessToken));
		accessToken && dispatch(loadInventory(accessToken));
	}, [accessToken, dispatch]);

	const handleAutcompleteChanges = ({ target }) => {
		let [preProduct] = products.filter(
			(product) => product.id === target.value
		);

		let [preInventory] = inventory.filter(
			(inventory) => inventory.idProductFK === target.value
		);

		setProductSelected({ ...preProduct, ...preInventory });
		seTotalPerProduct(orderQuantity * preProduct.salePrice);
	};

	const handleQuantityChanges = (e, limit) => {
		try {
			if (e.target.value > 0 && e.target.value <= productSelected.quantityInStock) {
				setOrderQuantity(parseInt(e.target.value));
				seTotalPerProduct(
					parseInt(e.target.value) * productSelected.salePrice
				);
			}
		} catch {}
	};

	const handleAddProductToOrder = () => {
		let preProductToOrder = {
			idProductFK: productSelected.id,
			productCode: productSelected.productCode,
			name: productSelected.name,
			pricePerUnit: productSelected.salePrice,
			productQuantity: orderQuantity,
			totalPerProduct: totalPerProduct,
		};

		setPurchaseOrderProducts([
			...purchaseOrderProducts,
			...[preProductToOrder],
		]);

		setProductSelected(undefined);
		setOrderQuantity(1);
		seTotalPerProduct(0);
	};

	const autoCompleteProduct = {
		name: "id",
		handleAutcompleteChanges,
		dispatchProp: loadProductsToSaleView,
		items: products,
		optionName: "name",
		icon: <BadgeIcon className="text-custom-300" />,
	};

	return (
		<div className="[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center rounded bg-white sm:grid-cols-2">
			<div>
				<p className="text-custom-150 font-normal">Producto: </p>
				<AutocompleteComponent
					key={3}
					{...autoCompleteProduct}
					handleInputChange={handleAutcompleteChanges}
				/>
			</div>

			<div>
				<p className="text-custom-150 font-normal">
					Detalle Producto:{" "}
				</p>

				{productSelected !== undefined ? (
					<div className="flex flex-wrap w-full overflow-auto">
						<div className="w-full">
							<table className="table-auto w-full border-collapse border-slate-500 ">
								<thead>
									<tr>
										<th className="border border-slate-600 bg-custom-300">
											ID
										</th>
										<th className="border border-slate-600 bg-custom-300">
											Producto
										</th>
										<th className="border border-slate-600 bg-custom-300">
											Precio
										</th>
										<th className="border border-slate-600 bg-custom-300">
											Cantidad Disponible
										</th>
										<th className="border border-slate-600 bg-custom-300">
											Unidades a Comprar
										</th>
										<th className="border border-slate-600 bg-custom-300">
											Precio según Unidad
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="font-medium text-center">
										<td className="border border-slate-700">
											{productSelected.id}
										</td>
										<td className="border border-slate-700">
											{" "}
											{productSelected.name}
										</td>
										<td className="border border-slate-700">
											{" "}
											{productSelected.salePrice}
										</td>
										<td className="border border-slate-700">
											{" "}
											{productSelected.quantityInStock}
										</td>
										<td className="border border-slate-700">
											<InputComponent
												handleInputChange={
													handleQuantityChanges
												}
												type={"number"}
												name={""}
												min={1}
												max={
													productSelected.quantityInStock
												}
												accept={"number"}
												step={1}
												value={orderQuantity}
												className={"w-70"}
												placeholder={"1,2,3,..."}
											/>
										</td>
										<td className="border border-slate-700">
											{orderQuantity *
												productSelected.salePrice}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div>
							<button
								type="button"
								className="
										w-40
										h-10
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
								onClick={handleAddProductToOrder}
							>
								Agregar
							</button>
						</div>
					</div>
				) : null}
				<div className="">
					<p></p>
				</div>
			</div>
		</div>
	);
};
