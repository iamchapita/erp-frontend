import { useState } from "react";
import Swal from "sweetalert2";
import { productActive } from "../actions/product.actions";

/**
@author Marion Bustamante
useForm is a custom hook that provides a form state object and methods to update it.
@param {Object} [initialState={}] - An optional object to initialize the form state with.
@returns {Object} An object containing:
formState: An object that represents the current state of the form.
handleInputChange: A function to update the formState object when an input value changes.
handleRememberMeCheck: A function to update the formState object when the "Remember me" checkbox is checked or unchecked.
handleSubmit: A function to handle the form submission.
*/

export const useForm = (initialState = {}) => {
	const [formState, setFormState] = useState(initialState);
	/**
	 * @author Marion Bustamante
	 * Maneja los cambios en un campo de entrada.
	 * @param {Object} event - El evento del cambio.
	 * @param {number} [limit=0] - Límite opcional de longitud del valor.
	 */
	const handleInputChange = ({ target }, limit = 0) => {

		if (limit > 0) {
			if (target.value.length <= limit) {
				setFormState({ ...formState, [target.name]: target.value });
			}
		} else {
			setFormState({ ...formState, [target.name]: target.value });
		}
	};

	/**
	 * Maneja el cambio de un campo de tipo checkbox.
	 * @param {Object} event - El evento del cambio.
	 */
	const handleCheck = ({ target }) => {

		setFormState({ ...formState, [target.name]: target.checked });
	};

	 const handleInputCheck = ({ target }) => {
		console.log(target.checked);
		const value = target.checked ? 1 : 0; // Convertir true a 1 y false a 0
		return value;
	}

	const reset = (newFormState = initialState) => {
		setFormState(newFormState);
	};

	const handleSubmit = (e, msg, dispatch = null) => {
		console.log(msg);
		e.preventDefault();
		/* Sweet alerŧ*/
		const Toast = Swal.mixin({
			toast: true,
			position: "bottom-end",
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener("mouseenter", Swal.stopTimer);
				toast.addEventListener("mouseleave", Swal.resumeTimer);
			},
		});

		Toast.fire({
			icon: "success",
			title: { msg },
		});
		if (dispatch) {
			productActive({ ...formState });
		}
	};

	return [
		formState,
		handleInputChange,
		handleCheck,
		handleSubmit,
		setFormState,
		reset,
	];
};

/* *
 * Example usage:
 *
 *
 * * import { useForm } from './useForm'
 *
 * const MyForm = () => {
 *   const { formState, handleInputChange, handleRememberMeCheck, handleSubmit } = useForm({
 *     username: '',
 *     password: '',
 *     rememberMe: false
 *   })
 *
 *   const onSubmit = () => {
 *     console.log('Submitted form data:', formState)
 *     // TODO: Add custom logic to submit the form data to a server.
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <label>
 *         Username:
 *         <input type="text" name="username" value={formState.username} onChange={handleInputChange} />
 *       </label>
 *       <br />
 *       <label>
 *         Password:
 *         <input type="password" name="password" value={formState.password} onChange={handleInputChange} />
 *       </label>
 *       <br />
 *       <label>
 *         Remember me:
 *         <input type="checkbox" name="rememberMe" checked={formState.rememberMe} onChange={handleRememberMeCheck} />
 *       </label>
 *       <br />
 *       <button type="submit" onClick={onSubmit}>Submit</button>
 *     </form>
 *   )
 * }
 *
 */
