import React from 'react'
import { Navigate, Routes } from 'react-router-dom'

export const PublicRouter = ({ isLoggedIn, children }) => {

    return (
        isLoggedIn
            ? <Navigate to={`/syncpro/dashboard`} />
            :
            <Routes>
                {children}
            </Routes>
    )
}

