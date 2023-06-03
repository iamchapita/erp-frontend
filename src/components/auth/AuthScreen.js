import React from 'react'
import { useDispatch } from 'react-redux'
import { googleLogin } from '../../actions/auth.actions';

export const AuthScreen = () => {


    const dispatch = useDispatch();


    const handleClickMe = () => {
        dispatch(googleLogin())
    }


    return (
        <button onClick={handleClickMe}>Click Me</button>
    )
}
