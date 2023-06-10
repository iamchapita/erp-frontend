import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SyncProScreen } from '../components/syncpro/SyncProScreen'

export const PrivateRouter = ({ isLoggedIn, component: Component, ...rest }) => {



    return (
        isLoggedIn 
        ? 
        <Routes>
            <Route
                index
                element={<SyncProScreen />}
            />
        </Routes>
        : 
        Navigate({to: '/auth/login'})

    )
}
