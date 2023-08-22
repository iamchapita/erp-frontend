import { Modal } from '@mui/material'
import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Title } from '../Title';
import { AutocompleteComponent } from '../Autocomplete';
import { useSelector } from 'react-redux';

export const CustomModal = ({setOpen, open, handleOpen, handleClose}) => {

    const {roles} = useSelector(state => state.user)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#4fd1c5',
        boxShadow: 24,
        p: 4,
        /* color text */
        color: '#000',
      };

    



    


  return (
   
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={handleClose}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}
  >
    <Fade in={open}>
    
          <Box sx={style}>
            <div className='grid grid-cols-2'>
                <AdminPanelSettingsIcon className='text-4xl bg-white rounded text-custom-300 col-span-1'/>
            </div>
            
          </Box>
        
    </Fade>
  </Modal>
 
  )
}
