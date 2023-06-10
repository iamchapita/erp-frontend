import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SyncProScreen } from '../components/syncpro/SyncProScreen'
import AuthScreen from '../components/auth/AuthScreen'
import SignUpScreen from '../components/auth/SignUpScreen'

export const PublicRouter = ({ isLoggedIn, component: Component, ...rest }) => {

    return (
        isLoggedIn
            ? Navigate({ to: '/', replace: true })
            :
            <Routes>
                <Route
                    path='register'
                    element={<SignUpScreen />}
                />
                <Route
                    path='login'
                    element={<AuthScreen />}
                />
            </Routes>
    )
}

