import React from 'react'




export const useOpen = (initialState={}) => {
    const [open, setOpen] = React.useState(initialState?.open);
    const [message, setMessage] = React.useState(initialState?.message);

    const handleOpen = (message) => {
        setOpen(true);
        setMessage(message);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return {
        open,
        message,
        handleOpen,
        handleClose
    }
}
