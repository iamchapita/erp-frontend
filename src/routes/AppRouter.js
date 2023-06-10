import React, { useEffect, useState } from 'react'
import { auth, onAuthStateChanged } from '../firebase/firebase.config'
import { SyncProScreen } from '../components/syncpro/SyncProScreen'
import { useDispatch } from 'react-redux'
import { AuthRouter } from './AuthRouter'
import { Spinner } from '../components/spinner/Spinner'
import { PublicRouter } from './PublicRouter'
import { Route, Routes } from 'react-router-dom'
import { login } from '../actions/auth.actions'
import { PrivateRouter } from './PrivateRouter'

export const AppRouter = () => {

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName, user.email, user.photoURL))
                setIsLoggedIn(true)

            } else {
                setIsLoggedIn(false)

            }
        })
        setChecking(false)

    }, [dispatch, setChecking, setIsLoggedIn])


    const privateRoute = {
        isLoggedIn,
        component: SyncProScreen
    }

    const publicRoute = {
        isLoggedIn,
        component: AuthRouter
    }

    return (
        checking
            ?
            <Spinner />
            :
            <Routes>
                <Route path='/*' element={<PrivateRouter {...privateRoute} />} />
                <Route path='/auth/*' element={<PublicRouter {...publicRoute} />} />
            </Routes>
    )
}