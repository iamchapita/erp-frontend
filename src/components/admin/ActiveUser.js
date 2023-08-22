import React, { useState } from "react";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { CustomModal } from "./Modal";
const ActiveUser = ({ currentUser, setFormState, editActive, reset, setEditActive }) => {
    const [state, setstate] = useState(false)
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const changeStatus = () => {
        setstate(true)
        setFormState({
            ...currentUser,
            userStatus: currentUser.userStatus === 'Activo' ? 'Inactivo' : 'Activo'
        })

    }




    return (
        <div className="xl:w-5/12 w-11/12 mx-auto mb-4 my-6 md:w-2/3 shadow sm:px-10 px-4 py-6 bg-white dark:bg-gray-800 rounded-md">
            <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold mb-4">Usuario seleccionado</p>
            <div className="flex justify-between bg-custom-300 rounded-md relative">
                <div className="flex">
                    <div className="px-4 py-6 border-r border-custom-250">
                        <div className="h-10 w-10">
                            <img src="https://img.freepik.com/free-icon/user_318-563642.jpg?w=360" alt="user" className="h-full w-full rounded-full overflow-hidden shadow object-cover" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center pl-3 py-2 sm:py-0">
                        <p className="text-sm font-bold text-white pb-1">{currentUser.username}</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center">
                            <p className="text-xs text-white leading-5">{currentUser.email} &nbsp; - &nbsp;</p>
                            <p className="text-xs text-white leading-5">{currentUser.uid}</p>

                        </div>
                        <p className="text-xs text-white leading-5 font-bold">{currentUser.userRole}</p>
                    </div>
                </div>

                {editActive && <span className="self-center cursor-pointer m-3" >
                    <SupervisorAccountIcon onClick={handleOpen} className="text-white mx-3 hover:scale-110 transition-all  ease-in-out " />
                    {currentUser.userStatus === 'Activo' ? <LockOpenIcon onClick={changeStatus} className="text-white hover:scale-110 transition-all  ease-in-out " />
                        : <LockIcon onClick={changeStatus} className="text-red-600 hover:scale-110 transition-all  ease-in-out " />}
                </span>}

            </div>
            {/* BUtton to save and cancel */}
            {state && <div className="flex justify-end mt-4">
                <button className="bg-custom-300 text-white px-4 py-2 rounded-md mr-2 hover:bg-custom-400 transition-all ease-in-out">Guardar</button>
                <button onClick={()=>{
                    setstate(false) 
                    reset()
                    setEditActive(false)
                    }} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all ease-in-out">Cancelar</button>
            </div>}
            <CustomModal setOpen={setOpen} open={open} handleClose={handleClose} handleOpen={handleOpen}/>
        </div>
    );
};
export default ActiveUser;
