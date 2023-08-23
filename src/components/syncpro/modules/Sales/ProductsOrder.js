import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../../Title";
import { SalesPageHeader } from "./SalesPageHeader";
import { SalesForm } from "./SalesForm";
import { useForm } from "../../../../hooks/useForm";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { loadProductsToSaleView } from "../../../../actions/product.actions";
import { loadInventory } from "../../../../actions/product.actions";
import { salesProductsTableHead } from "../../../../data/util";

export const ProductsOrder = ({
	purchaseOrderProducts,
	setPurchaseOrderProducts,
}) => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);
	const products = useSelector((state) => state.product.products);
	const inventory = useSelector((state) => state.product.inventory);
	const [productsToOrderTable, SetProductsToOrderTable] = useState([]);
	const apiRef = useGridApiRef();

	useEffect(() => {
		accessToken && dispatch(loadInventory(accessToken));
		accessToken && dispatch(loadProductsToSaleView(accessToken));
	}, [accessToken, dispatch]);

	useEffect(() => {
		SetProductsToOrderTable(
			products.map((product) => {
				const inventoryItem = inventory.find(
					(item) => item.idProductFK === product.id
				);

				if (inventoryItem) {
					return {
						...product,
						quantityInStock: inventoryItem.quantityInStock,
						productQuantity: 0,
						totalPerProduct: 0,
					};
				} else {
					return product;
				}
			})
		);
	}, [dispatch, products, inventory]);

	useEffect(() => {
		console.log(purchaseOrderProducts);
	}, [purchaseOrderProducts]);

	const handleEditCellChange = (params, event) => {
		const productQuantity = parseInt(event.target.value);
		const salePrice = parseFloat(params.row.salePrice);

		if (isNaN(productQuantity) === false) {
			const updatedRow = {
				...params.row,
				[params.field]: productQuantity,
				totalPerProduct: parseFloat(productQuantity * salePrice),
				taxablePrice: parseFloat(productQuantity * salePrice * 0.15),
			};

			if (productQuantity === 0) {
				// Eliminar el objeto de purchaseOrderProducts si productQuantity === 0
				const updatedPurchaseOrderProducts =
					purchaseOrderProducts.filter(
						(product) => product.id !== updatedRow.id
					);
				setPurchaseOrderProducts(updatedPurchaseOrderProducts);
			} else {
				// Agregar o actualizar el objeto en purchaseOrderProducts si productQuantity > 0
				const existingProductIndex = purchaseOrderProducts.findIndex(
					(product) => product.id === updatedRow.id
				);

				if (existingProductIndex === -1) {
					// Agregar si no existe
					setPurchaseOrderProducts([
						...purchaseOrderProducts,
						...[updatedRow],
					]);
				} else {
					// Actualizar si ya existe
					const updatedPurchaseOrderProducts = [
						...purchaseOrderProducts,
					];
					updatedPurchaseOrderProducts[existingProductIndex] =
						updatedRow;
					setPurchaseOrderProducts(updatedPurchaseOrderProducts);
				}
			}
		}
	};

	const getRowClassName = (params) => {
		const product = params.row;

		if (product.productQuantity > 0) {
			return "bg-custom-250 font-semibold";
		}

		return "";
	};

	return (
		<div className="grid grid-cols-1">
			<Title title={"Productos en Order de Compra"} />
			{productsToOrderTable && (
				<DataGrid
					apiRef={apiRef}
					className="col-span-1"
					autoHeight
					density="compact"
					columns={salesProductsTableHead}
					rows={productsToOrderTable}
					pageSizeOptions={[5, 10, 20]}
					disableRowSelectionOnClick
					onCellEditStop={handleEditCellChange}
					getRowClassName={getRowClassName}
					// sortModel={[
					// 	{
					// 		field: "totalPerProduct", // Reemplaza esto con el campo de tu columna
					// 		sort: "desc", // 'asc' para ascendente, 'desc' para descendente
					// 	},
					// ]}
					initialState={{
						pagination: {
							paginationModel: {
								page: 0,
								pageSize: 5,
							},
						},
					}}
				/>
			)}
		</div>
	);
};
