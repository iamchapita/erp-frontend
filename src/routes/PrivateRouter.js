import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SyncProScreen } from '../components/syncpro/SyncProScreen'
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
                        path='customer'
                        element={<Customer />}
                    />
                    <Route
                        path='home'
                        element={<Dashboard />}
                    />
                    <Route path='*' element={<Dashboard />} />
                </Routes>
            </div>
            :
            <Navigate to={'/auth/login'} />
    )
}
