export const getTransactType = (transactInfo, insertedId = null) => {
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

	return insertedId === null
		? `Id insertado: ${transactInfo.insertId}.`
		: `Id Actualizado: ${insertedId}, Filas Cambiadas: ${transactInfo.changedRows}.`;
};
