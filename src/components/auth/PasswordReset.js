import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { uiRemoveError, uiSetError } from '../../actions/ui.actions'
import { sendEmailPasswordReset, updatePasswordAction } from '../../actions/auth.actions'
import InputComponent from '../InputComponent'
import AuthButton from '../button/AuthButton'
import logo from '../../img/logoGrande.png'
import { Title } from '../Title'

export const PasswordReset = () => {

    const {user} = useSelector(state => state.auth)
    const {loading, msgError} = useSelector(state => state.ui)
    const dispatch = useDispatch()

    const [formState, handleInputChange, reset] = useForm({
        email: '',
       
    })

    const {email } = formState

    const emailInput = {
        type: 'text',
        name: 'email',
        value: email,
        placeholder: 'Correo Electrónico',
        required: true,
        handleInputChange
    }

  /*   const passwordInput = {
        type: 'password',
        name: 'password',
        value: password,
        placeholder: 'Contraseña',
        required: true,
        handleInputChange
    }

    const password2Input = {
        type: 'password',
        name: 'password2',
        value: password2,
        placeholder: 'Confirmar Contraseña',
        required: true,
        handleInputChange
    } */

    const isFormValid = () => {
        if (validator.isEmpty(email)) {
            dispatch(
                uiSetError('El campo de correo electrónico es obligatorio')
            )
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(uiSetError('El correo no es válido'))
            return false
        } 
        dispatch(uiRemoveError())
        return true
    }

    const handleSubmit = (e) => {
       
        e.preventDefault()
        if (isFormValid()) {
            sendEmailPasswordReset(email)
        }
    }


  return (
    <form
    autoComplete='off'
			onSubmit={handleSubmit}
			className={
				"flex bg-custom-100 items-center justify-center h-screen text-black"
			}
		>
			<div className="relative rounded space-y-4 opacity-90 flex flex-col bg-white  font-normal p-4 w-80 ">
            <Title title={"Recuperar Contraseña"} />
            <img src={logo} alt="logo" className=" w-40 h-40 m-4 self-center" />
				<p className={"self-baseline text-md font-medium"}>Correo electrónico:</p>
				{msgError && (
					<span
						className={
							"left-15 absolute top-6 font-normal self-center text-red-500 text-[13px] "
						}
					>
						{msgError}
					</span>
				)}
				<InputComponent {...emailInput} />
		
				<AuthButton

					content="Enviar correo"
					handleSubmit={handleSubmit}
					disabled={loading}
				/>
				
			</div>
		</form>
  )
}
