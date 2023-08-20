import React from "react";
import { items } from "../../data/util";
import { ListItem } from "../utils/ListItem";
import { useSelector } from "react-redux";

export const SideBar = () => {
	const { role } = useSelector((state) => state.auth);

	return (
		<div className="hidden sm:flex bg-custom-300 border-r-2 w-16 h-auto">
			<ol className="text-center flex flex-col flex-1 items-center  [&>*]:py-2 font-normal hover:cursor-pointer [&>*]:mx-1 space-y-1">
				{items.map(
					(item, index) =>
						item.role.includes(role) &&
						(role !== "Superadministrador" ||
							role !== "Administrador") && (
							<ListItem
								ClassName={item?.className}
								key={index}
								Icon={item.Icon}
								Title={item.Title}
								path={item.path}
								closeSession={item.closeSession}
							/>

						)
				)}
			</ol>
		</div>
	);
};
