import React, { useEffect, useState } from 'react'
import { auth, onAuthStateChanged } from '../firebase/firebase.config'
import { SyncProScreen } from '../components/syncpro/SyncProScreen'
import { useDispatch } from 'react-redux'
import { AuthRouter } from './AuthRouter'
import { Spinner } from '../components/spinner/Spinner'

export const AppRouter = () => {

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                console.log(user);
            }
        })

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
        <Spinner></Spinner>
    )
}