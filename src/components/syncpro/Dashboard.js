import React, { useEffect } from "react";

import { ItemCard } from "./ItemCard";
import { SearchSection } from "../SearchSection";
import {Bolt, Paid, Person4, PersonAdd, Wallet} from "@mui/icons-material";

import {useDispatch, useSelector} from "react-redux";
import { Breadcrumbs } from "./BreadCrums";
import {providers} from "../../actions/product.actions";
import ProveedoresCard from "./Dashboard/suppliers";
import {getUserCount} from "../../actions/dashboard.actions";
import {loadCustomers} from "../../actions/customer.action";

export const Dashboard = () => {
	const { accessToken } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const {productProviders} = useSelector((state) => state.product);
	const { userCount } = useSelector((state) => state.dashboard);
	const { customers } = useSelector((state) => state.customer);
	const [customerCount, setCustomerCount] = React.useState(0);
	const [dashBoardItems, setDashBoardItems] = React.useState([])

	useEffect(() => {
		dispatch(providers(accessToken));
		dispatch(getUserCount(accessToken));
		dispatch(loadCustomers(accessToken));

		setDashBoardItems([
			{
				title: "Ventas de hoy",
				subTitle: "L. 0.00",
				icon: Wallet,
			},
			{
				title: "Usuarios registrados",
				subTitle: userCount,
				icon: Person4,
			},
			{
				title: "Clientes registrados",
				subTitle: customerCount,
				icon: PersonAdd,
			},
			{
				title: "Ventas totales",
				subTitle: "L. 0.00",
				icon: Paid,
			},
		])
	}, [dispatch, accessToken, userCount, customerCount]);

	useEffect(() => {
		setCustomerCount(customers.length);
	}, [dispatch, accessToken, customers]);









	return (
		<div className="relative">

			<div className="flex-1 p-5 space-y-3">
				{/* <Pagination {...routes} /> */}
				<Breadcrumbs />
				<SearchSection />
				{/* Items */}
				<div className="sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 space-y-2 sm:space-y-0 gap-2 sm:mt-5 flex-1 justify-between [&>*]:sm:px-5 [&>*]:px-1 [&>*]:rounded-xl [&>*]:w-auto [&>*]:h-20 [&>*]:bg-white [&>*]:shadow-sm">
					{dashBoardItems.map((item, index) => (
						<ItemCard key={index} {...item} />
					))}
				</div>
				<div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-5 h-auto mt-2 sm:mt-5">
					<div className="bg-white shadow-sm grid col-span-1 sm:grid-cols-1 lg:grid-cols-5 p-5 sm:col-span-3 rounded-xl">
						<div className="relative col-span-1 md:col-span-3 text-start">
							<p className="text-sm font-bold text-custom-500 opacity-50">
								Proyecto de industria
							</p>
							<p className="font-bold">
								Dashboard de este proyecto
							</p>
							<p className="text-custom-500 mb-5">
								Este debería ser un Lorem Ipsum pero no tengo
								una extensión para hacer eso con React en
								VSCode, entonces, mejor no. ¿Será que lo dejo de
								este tamaño?
							</p>
							<p className="font-bold mb-5 lg:mb-0 lg:absolute lg:bottom-0">
								Leer más -{">"}
							</p>
						</div>
						<div className="bg-custom-300 h-64 flex items-center justify-center sm:col-span-2 rounded">
							<Bolt
								fontSize="large"
								className="text-custom-300 bg-white rounded-full me-2"
							/>
							<p className="text-3xl font-medium text-white">
								SyncPro
							</p>
						</div>
					</div>
					<div className="bg-white shadow-sm text-start p-5 sm:col-span-2 rounded-xl">
						<div className="bg-custom-300 p-5 rounded h-full flex justify-center items-center text-white">
							{/* <BarChart1 /> */}
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2">
					<div className="p-5 bg-white rounded text-start  col-span-2">
						<div className="font-bold">
							Proveedores
						</div>
						<div>
							<ProveedoresCard proveedores={productProviders} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
