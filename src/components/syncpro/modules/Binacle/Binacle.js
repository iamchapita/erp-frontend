import React, { useEffect, useState } from "react";
import { Title } from "../../../Title";
import { BinaclePageHeader } from "./BinaclePageHeader";

export const Binacle = React.memo(() => {
	return (
		<div className="p-5 text-start w-full">
			<Title title={"Bitácora"} />
			<BinaclePageHeader/>
		</div>
	);
});
