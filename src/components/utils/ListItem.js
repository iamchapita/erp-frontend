import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { logOut } from "../../helpers/logOut";
import { useDispatch, useSelector } from "react-redux";
import { uploadLogoutToBinacleAction } from "../../actions/binacle.actions";

export const ListItem = ({ Icon, Title, ClassName, path, closeSession }) => {
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state) => state.auth);

	return (
		<div className={`text-center transition ${ClassName}`}>
			{!closeSession && (
				<Link to={path}>
					<Tooltip
						componentsProps={{
							tooltip: {
								sx: {
									backgroundColor: "#fff",
									color: "#000000",
									fontSize: "0.8rem",
									border: "1px solid rgba(79, 209, 197, 0.15)",
								},
							},
							arrow: {
								sx: {
									color: "#fff",
									border: "1px solid rgba(79, 209, 197, 0.15)",
								},
							},
						}}
						arrow
						title={Title}
						placement="right"
						followCursor
					>
						<IconButton>
							<Icon fontSize="large" className="text-white" />
						</IconButton>
					</Tooltip>
				</Link>
			)}

			{closeSession && (
				<Tooltip
					onClick={() => {
						const result = logOut();
						dispatch(uploadLogoutToBinacleAction(accessToken));
					}}
					componentsProps={{
						tooltip: {
							sx: {
								backgroundColor: "#fff",
								color: "#000000",
								fontSize: "0.8rem",
								border: "1px solid rgba(79, 209, 197, 0.15)",
							},
						},
						arrow: {
							sx: {
								color: "#fff",
								border: "1px solid rgba(79, 209, 197, 0.15)",
							},
						},
					}}
					arrow
					title={Title}
					placement="right"
					followCursor
				>
					<IconButton>
						<Icon fontSize="large" className="text-white" />
					</IconButton>
				</Tooltip>
			)}
		</div>
	);
};
