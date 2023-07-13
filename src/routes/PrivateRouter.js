import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Customer } from '../components/syncpro/modules/Customer/Customer'

import { SideBar } from '../components/syncpro/SideBar'
import { Dashboard } from '../components/syncpro/Dashboard'

export const PrivateRouter = ({ isLoggedIn }) => {

    return (
        isLoggedIn
            ?
            <div className='flex'>
                <SideBar />
                <Routes>
                    <Route
                        path='clientes'
                        element={<Customer />}
                    />
                    <Route
                        path='dashboard'
                        element={<Dashboard />}
                    />
                    <Route path='*' element={<Navigate to={'dashboard'} />} />
                </Routes>
            </div>
            :
            <Navigate to={'/auth/login'} />
    )
}
