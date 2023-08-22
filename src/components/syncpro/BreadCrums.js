import { useLocation, Link } from "react-router-dom";

export const Breadcrumbs = () => {
	const location = useLocation();
	const currentLocation = location.pathname.split("/").slice(2);

	return (
		<div className={"text-2xl text-start"}>
			{currentLocation.map((locat, index) => (
				<Link
					className={"text-2xl text-start font-medium"}
					key={index}
					to={`/syncpro/${locat}`}
				>
					{locat.toUpperCase()}
				</Link>
			))}
		</div>
	);
};
