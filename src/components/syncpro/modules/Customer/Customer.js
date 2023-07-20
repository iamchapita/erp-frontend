import React, { useEffect, useState } from "react";
import { Person, Business, Wc, GroupAdd } from "@mui/icons-material";
import { ItemCard } from "../../ItemCard";
import { SearchSection } from "../../../../components/SearchSection";
import { Pagination } from "../../../../components/Pagination";
import { FetchData } from "../../../utils/fetch";
import { useSelector } from "react-redux";

export const Customer = () => {
	const routes = {
		parentRoute: "Pages",
		childRoute: "Clientes",
	};

	const [customerItems, setCustomerItems] = useState([]);

	let customerStatistics;

	const { accessToken } = useSelector((state) => state.auth);
	useEffect(() => {
		const setData = async () => {
			[customerStatistics] = await FetchData(
				"customer/getCustomerStatistics/",
				accessToken
			);

			setCustomerItems([
				{
					title: "Clientes Registrados",
					subTitle: customerStatistics.registeredCustomrs,
					icon: Person,
				},
				{
					title: "Total de Clientes Empresariales",
					subTitle: customerStatistics.enterpriseCustomers,
					icon: Business,
				},
				{
					title: "Total de Clientes Naturales",
					subTitle: customerStatistics.naturalCustomers,
					icon: Wc,
				},
				{
					title: "Clientes Nuevos Registrados en Mes Actual",
					subTitle:
						customerStatistics.customerRegisteredInCurrentMonth,
					icon: GroupAdd,
				},
			]);
		};

		setData();
	}, [accessToken]);

	return (
		<div className="relative">
			<div className="flex">
				<div className="flex-1 p-5 text-start mx-5 sm:mx-0 sm:mt-0 font-medium">
					<Pagination {...routes} />
					<SearchSection />
					<div className="sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 space-y-2 sm:space-y-0 gap-2 sm:mt-5 flex-1 justify-between [&>*]:sm:px-5 [&>*]:px-1 [&>*]:rounded-xl [&>*]:w-auto [&>*]:h-20 [&>*]:bg-white [&>*]:shadow-sm">
						{customerItems.map((item, index) => (
							<ItemCard key={index} {...item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
