import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


async function notifiUser(title, options) {
    if (!("Notification" in window)) {
        alert("Este navegador no soporta notificaciones de escritorio");
    } else if (Notification.permission === "granted") {
        const notification = new Notification(title, options);
    } else if (Notification.permission !== "denied") {
        await Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                const notification = new Notification(title, options);
            }
        });
    }
}


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
    const [open, setOpen] = React.useState(false);
    const [userResponded, setUserResponded] = React.useState(false);


    async function enableNotifications() {
        await notifiUser("Notificaciones activadas", { body: "Ahora recibirás alertas de nuevos mensajes" }).then(() => {
            setUserResponded(true)
        })
    }

    function disableNotifications() {
        setUserResponded(true)

    }





    const handleClick = () => {
        setOpen(true);
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        handleClick()
    }, [])

    return (!(userResponded) && !(Notification.permission === "granted")) ? (


        <div className='
        bg-white

        w-[300px]
        fixed
        left-1/2
        top-1/2
        space-y-2

        flex
        flex-col
        justify-center
        items-center
        '>
            <p className='
            
            font-bold
            text-center
            mb-4
            '>Activa las notificaciones para recibir alertas de nuevos mensajes</p>
            <Button variant="contained" onClick={enableNotifications}>Activar notificaciones</Button>
            <Button variant="contained" onClick={disableNotifications}>Desactivar notificaciones</Button>
            
        </div>
    ) : (Notification.permission === "granted") ? (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Notificaciones activadas! Recibirás alertas de nuevos mensajes
                </Alert>
            </Snackbar>
        </Stack>
    ) : (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Notificaciones desactivadas! No recibirás alertas de nuevos mensajes
                </Alert>
            </Snackbar>
        </Stack>
    )
}
