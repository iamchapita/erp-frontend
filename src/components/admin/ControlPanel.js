import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Tab } from '../Tab'
import { userManagementDataTabs } from '../../data/util'
import { useDispatch, useSelector } from 'react-redux'
import { changeTab } from '../../actions/customer.action'
import { useForm } from '../../hooks/useForm'
import { AdminPageHeader } from './AdminPageHeader'
import { getAllUsers, getRolesAction } from '../../actions/user.actions'
import { Title } from '../Title'
import { UserForm } from './UserForm'

export const ControlPanel = () => {

    const dispatch = useDispatch();
    const { currentTab } = useSelector(state => state.product)
    const [editActive, setEditActive] = useState(false);
    const { accessToken } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(changeTab({ index: 0, tab: 'Usuarios' }));

    }, [dispatch]);
    
    const [formState, handleInputChange, handleCheck, handleSubmit, setFormState, reset, handleImageChange] = useForm({
        uid: '',
        id: '',
        username: '',
        email: '',
        userRole: '',
        userStatus: true,

    })   

    let functions = {
        formState, handleInputChange, handleCheck, handleSubmit, setFormState, reset, handleImageChange
    }

    useEffect(() => {
        accessToken && dispatch(getAllUsers(accessToken))
        accessToken && dispatch(getRolesAction(accessToken))
    }, [accessToken, dispatch])




  return (

    <div className='p-5 text-start w-full'>
            <Title title={'Gestor de usuarios'} />
            <AdminPageHeader reset={reset} setFormState={setFormState} editActive={editActive} setEditActive={setEditActive} />
           <UserForm  {...functions} editActive={editActive} setEditActive={setEditActive} />
    

        </div>
  )
}
