import { IconButton, Modal, Tooltip } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Title } from '../Title';
import { AutocompleteComponent } from '../Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { userActiveAction } from '../../actions/user.actions';

export const CustomModal = ({ setState, setOpen, open, handleOpen, handleClose, currentUser }) => {

  const { roles } = useSelector(state => state.user)
  const dispatch = useDispatch();


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 340,
    height: 200,
    bgcolor: '#4fd1c5',
    boxShadow: 24,
    p: 4,
    /* color text */
    color: '#000',
  };



  const handleChangeRole = (role) => {
    setState(true)
    dispatch(userActiveAction(
      {
        ...currentUser,
        userRole: role,
      }
    ))

  }




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
          <div className='grid grid-cols-1'>
            <Title title='Roles' className='col-span-1' />
            <div className='flex justify-center [&>*]:cursor-pointer [&>*]:hover:transition-all [&>*]:hover:ease-in-out'>
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
                title={'Superadministrador'}
                placement="right"
                followCursor
              >
                <IconButton >
                  {currentUser.userRole !== "Superadministrador" ? <EngineeringIcon onClick={() => { handleChangeRole('Superadministrador') }} fontSize='large' className=' bg-white hover:scale-110 rounded text-custom-300 hover:bg-opacity-60 hover:text-black' /> : <EngineeringIcon onClick={() => { handleChangeRole('Superadministrador') }}
                    fontSize='large' className=' bg-gray-600 rounded  text-custom-300' />}
                </IconButton>
              </Tooltip>

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
                title={'Administrador'}
                placement="right"
                followCursor
              >

                <IconButton >
                  {currentUser.userRole !== "Administrador" ? <AdminPanelSettingsIcon onClick={() => { handleChangeRole('Administrador') }} fontSize='large' className=' bg-white hover:scale-110 rounded text-custom-300 hover:bg-opacity-60 hover:text-black' /> : <AdminPanelSettingsIcon onClick={() => { handleChangeRole('Administrador') }}
                    fontSize='large' className=' bg-gray-600 rounded  text-custom-300' />}
                </IconButton>
              </Tooltip>

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
                title={'Vendedor'}
                placement="right"
                followCursor
              >
                <IconButton >
                  {currentUser.userRole !== "Vendedor" ? <StorefrontIcon onClick={() => { handleChangeRole('Vendedor') }} fontSize='large' className=' bg-white hover:scale-110 rounded text-custom-300 hover:bg-opacity-60 hover:text-black' /> :
                    <StorefrontIcon onClick={() => { handleChangeRole('Vendedor') }}
                      fontSize='large' className=' bg-gray-600 rounded  text-custom-300' />}
                </IconButton>
              </Tooltip>


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
                title={'Cajero'}
                placement="right"
                followCursor
              >
                <IconButton >
                  {currentUser.userRole !== "Cajero" ? <PointOfSaleIcon onClick={() => { handleChangeRole('Cajero') }} fontSize='large' className=' bg-white hover:scale-110 rounded text-custom-300 hover:bg-opacity-60 hover:text-black' /> :
                    <PointOfSaleIcon onClick={() => { handleChangeRole('Cajero') }}
                      fontSize='large' className=' bg-gray-600 rounded  text-custom-300' />}
                </IconButton>
              </Tooltip>


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
                title={'Registrador'}
                placement="right"
                followCursor
              >
                <IconButton >
                  {currentUser.userRole !== "Registrador" ? <HowToRegIcon onClick={() => { handleChangeRole('Registrador') }} fontSize='large' className=' bg-white hover:scale-110 rounded text-custom-300 hover:bg-opacity-60 hover:text-black' /> :
                    <HowToRegIcon onClick={() => { handleChangeRole('Cliente') }}
                      fontSize='large' className=' bg-gray-600 rounded  text-custom-300' />}

                </IconButton>


              </Tooltip>


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
                title={'Contador'}
                placement="right"
                followCursor
              >
                <IconButton >

                {currentUser.userRole !== "Cotizador" ? <AttachMoneyIcon onClick={() => { handleChangeRole('Cotizador') }} fontSize='large' className=' bg-white hover:scale-110 rounded text-custom-300 hover:bg-opacity-60 hover:text-black' /> :
                  <AttachMoneyIcon onClick={() => { handleChangeRole('Contador') }}
                    fontSize='large' className=' bg-gray-600 rounded  text-custom-300' />}
                </IconButton>


              </Tooltip>
            </div>

            <button onClick={handleClose} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4'>Cerrar</button>
          </div>
        </Box>

      </Fade>
    </Modal>

  )
}
