import React from 'react';
import { useForm } from "../../hooks/useForm";
import AuthButton from "../button/AuthButton";
import { Link } from "react-router-dom";
import './auth.css';
import SocialNetworkBottom from "../button/SocialNetworkBottom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, signInWithEmailPassword } from '../../actions/auth.actions';
import validator from "validator";
import { uiRemoveError, uiSetError } from '../../actions/ui.actions';
import InputComponent from '../InputComponent';


/**
 * @author MarionMBC
 * @version 1.0.0
 * LoginScreen component
 *  This component is used to login the user with email and password or with google  account
 * @return {JSX.Element}
 **/
const LoginScreen = () => {

    const dispatch = useDispatch()
    const { loading, msgError } = useSelector(state => state.ui)


    const [formState, handleInputChange, , ,] = useForm({
        email: '',
        password: ''
    })
    const { email, password } = formState;

    const emailInput = {
        type: 'text',
        name: 'email',
        value: email,
        placeholder: 'Correo Electrónico',
        required: true,
        handleInputChange
    }

    const passwordInput = {
        type: 'password',
        name: 'password',
        value: password,
        placeholder: 'Contraseña',
        required: true,
        handleInputChange
    }



    const isFormValid = () => {
        if (validator.isEmpty(email)) {
            dispatch(uiSetError("El campo de correo electrónico es obligatorio"))
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(uiSetError("El correo no es válido"))
            return false
        }
        else if (password.length < 8) {
            dispatch(uiSetError('La contraseña debe contener al menos 8 caracteres.'));
            return false
        }
        dispatch(uiRemoveError())
        return true
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(signInWithEmailPassword(email, password))
        }
    }



    const handleGoogleLogin = () => {
        dispatch(googleLogin())
    }





    return (
        <form onSubmit={handleSubmit} className={'flex bg-custom-100 items-center justify-center h-screen text-black'}>
            <div
                className='relative rounded space-y-4 opacity-90 flex flex-col bg-custom-400  font-normal p-4 w-80 '>
                <p className={'self-baseline text-2xl'}>Iniciar Sesión</p>
                {msgError && <span className={'left-15 absolute top-6 font-normal self-center text-red-500 text-[13px] '}>{msgError}</span>}
                <InputComponent {...emailInput} />
                <InputComponent {...passwordInput} />
                <p className={'underline self-end cursor-pointer transition-all hover:text-custom-500'}>¿Olvidaste tu contraseña?</p>
                <AuthButton content='Login' handleSubmit={handleSubmit} disabled={loading} />
                <p>Iniciar sesión con redes sociales</p>
                <SocialNetworkBottom action={'Iniciar sesión'} handleAction={handleGoogleLogin} />
                <Link to={'/auth/register'}
                    className={'underlinetransition-all cursor-pointer self-start hover:text-custom-500'}>¿No tienes una cuente? Regístrate</Link>
            </div>
        </form>
    );
}

export default LoginScreen;