import React, { useEffect } from 'react';
import InputComponent from "../InputComponent";
import AuthButton from "../button/AuthButton";
import SocialNetworkBottom from "../button/SocialNetworkBottom";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from 'validator'
import { useDispatch, useSelector } from "react-redux";
import { uiRemoveError, uiSetError } from "../../actions/ui.actions";
import { signUpWithEmailPasswordName } from '../../actions/auth.actions';

const SignUpScreen = () => {

    const dispatch = useDispatch();
    const { loading, msgError } = useSelector(error => error.ui)

    useEffect(() => {
        console.log(loading, msgError)
    }, [loading, msgError]);


    const [formState, handleInputChange, , ,] = useForm({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const { name, email, password, passwordConfirm } = formState;

    const userName = {
        type: 'text',
        name: 'name',
        value: name,
        placeholder: 'Name',
        required: false,
        handleInputChange
    }


    const emailInput = {
        type: 'text',
        name: 'email',
        value: email,
        placeholder: 'Email',
        required: false,
        handleInputChange
    }

    const passwordInput = {
        type: 'password',
        name: 'password',
        value: password,
        placeholder: 'Password',
        required: false,
        handleInputChange
    }

    const passwordConfirmInput = {
        type: 'password',
        name: 'passwordConfirm',
        value: passwordConfirm,
        placeholder: 'Confirm Password',
        required: false,
        handleInputChange
    }


    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(uiSetError("Name is required"))
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(uiSetError("Email is not valid"))
            return false
        } else if (password !== passwordConfirm) {
            dispatch(uiSetError('Password must be same as confirmation'));
            return false
        } else if (password.length < 8) {
            dispatch(uiSetError('Password must be at least 8 characters.'));
            return false
        }
        dispatch(uiRemoveError())
        return true
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(signUpWithEmailPasswordName(name, email, password))
        }
    }


    return (
        <form onSubmit={handleRegister} className={'flex items-center justify-center h-screen text-black'}>
            <div
                className='relative rounded space-y-4 opacity-90 flex flex-col bg-white text-gray-500 font-normal p-4 w-80'>
                <p className={'self-baseline text-2xl'}>Sign Up</p>

                {msgError && <span className={'left-15 absolute top-9 font-normal self-center text-red-500 text-[13px] '}>{msgError}</span>}


                <InputComponent {...userName} />
                <InputComponent {...emailInput} />
                <InputComponent {...passwordInput} />
                <InputComponent {...passwordConfirmInput} />
                <AuthButton content='Sign Up' disabled={loading} id='signUpButton' />
                <p>Sign up with social networks</p>
                <SocialNetworkBottom action={'Sign up'} handleAction={() => {
                    console.log('Hi')
                }} />
                <Link to={'/auth/login'}
                    className={'underline hover:text-yellow-600 transition-all cursor-pointer self-start text-amber-400'}>Already
                    have an account? Sign in</Link>
            </div>
        </form>
    );
}

export default SignUpScreen;