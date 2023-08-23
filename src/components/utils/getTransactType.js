import addNotification from "react-push-notification";
import UpdateIcon from '@mui/icons-material/Update';
import DoneAllIcon from '@mui/icons-material/DoneAll';






export const getTransactType = (transactInfo, updatedId = null) => {
	console.log("TransactInfo", transactInfo);
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

	const update = {
		title: "Actualización",
		message: transactInfo.msg,
		icon: 'https://cdn-icons-png.flaticon.com/128/1688/1688988.png',
		native: true,
		theme: 'dark',
	}

	const insert = {
		title: "Inserción",
		message: transactInfo.msg,
		icon: 'https://cdn-icons-png.flaticon.com/128/5709/5709755.png',
		native: true,
		theme: 'dark',
	}

	

	updatedId ? notification(update) : notification(insert);

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


const notification = (data) => {
	addNotification(
		{
			...data
		}
	)
}

/* const customNotification = (data) => {
	Notification.permission === "granted" &&
		new Notification(data.title, {
			body: data.message,
			icon: data.icon,

		});
}; */
