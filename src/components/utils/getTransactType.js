export const getTransactType = (transactInfo, updatedId = null) => {
	// Insert
	/* {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 3,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0
    } */

	// Update
	/* {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "Rows matched: 1  Changed: 1  Warnings: 0",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 1
    } */

	return updatedId === null
		? {
				description: `Id insertado: ${transactInfo.insertId}.`,
				actionType: "Inserción",
		  }
		: {
				description: `Id Actualizado: ${updatedId}, Filas Cambiadas: ${transactInfo.changedRows}.`,
				actionType: "Actualización",
		  };
};
