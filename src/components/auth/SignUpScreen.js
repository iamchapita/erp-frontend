import React, { useEffect } from 'react';
import InputComponent from "../InputComponent";
import AuthButton from "../button/AuthButton";
import SocialNetworkBottom from "../button/SocialNetworkBottom";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, signUpWithEmailPasswordName } from '../../actions/auth.actions';

import validator from 'validator'
import { uiRemoveError, uiSetError } from '../../actions/ui.actions';



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
        placeholder: 'Nombre',
        required: false,
        handleInputChange
    }


    const emailInput = {
        type: 'text',
        name: 'email',
        value: email,
        placeholder: 'Correo electrónico',
        required: false,
        handleInputChange
    }

    const passwordInput = {
        type: 'password',
        name: 'password',
        value: password,
        placeholder: 'Contraseña',
        required: false,
        handleInputChange
    }

    const passwordConfirmInput = {
        type: 'password',
        name: 'passwordConfirm',
        value: passwordConfirm,
        placeholder: 'Confirmar contraseña',
        required: false,
        handleInputChange
    }




    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(uiSetError("Nombre es un campo obligatorio"))
            return false
        } else if (validator.isEmpty(email)) {
            dispatch(uiSetError("El campo de correo electrónico es obligatorio"))
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(uiSetError("El correo no es válido"))
            return false
        } else if (password !== passwordConfirm) {
            dispatch(uiSetError('La contraseña no es la misma'));
            return false
        } else if (password.length < 8) {
            dispatch(uiSetError('La contraseña debe contener al menos 8 caracteres.'));
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

    const handleGoogleSignUp = () => {
        dispatch(googleLogin())
    }


    return (
        <form onSubmit={handleRegister} className={'flex items-center justify-center h-screen bg-custom-100 text-black'}>
            <div
                className='relative rounded space-y-4 opacity-90 flex flex-col bg-custom-400  font-normal p-4 w-80'>
                <p className={'self-baseline text-2xl '}>Registrarse</p>

                {msgError && <span className={'left-15 absolute top-9 font-normal self-center text-red-500 text-[13px] '}>{msgError}</span>}


                <InputComponent {...userName} />
                <InputComponent {...emailInput} />
                <InputComponent {...passwordInput} />
                <InputComponent {...passwordConfirmInput} />
                <AuthButton content='Registrarse' disabled={loading} id='signUpButton' />
                <p>Registrarse a través de otras redes</p>
                <SocialNetworkBottom action={'Registrarse'} handleAction={handleGoogleSignUp} />
                <Link to={'/login'}
                    className={'underline hover:text-custom-500 transition-all cursor-pointer self-start'}>¿Ya tienes una cuenta? Iniciar sesión</Link>
            </div>
        </form>
    );
}

export default SignUpScreen;