import { useState } from "react";
import Swal from "sweetalert2";
import { invoiceActive } from "../actions/invoice.actions";


/**
useForm is a custom hook that provides a form state object and methods to update it.
@param {Object} [initialState={}] - An optional object to initialize the form state with.
@returns {Object} An object containing:
formState: An object that represents the current state of the form.
handleInputChange: A function to update the formState object when an input value changes.
handleRememberMeCheck: A function to update the formState object when the "Remember me" checkbox is checked or unchecked.
handleSubmit: A function to handle the form submission.
*/

export const useFormInvoices = (initialState = {
}) => {
  const [formState, setFormState] = useState(initialState)

  const handleInputChange = ({ target }, limit = 0) => {

    if (limit > 0) {
      if (target.value.length <= limit) {
        setFormState({ ...formState, [target.name]: target.value })
      }
    }
    else {
      setFormState({ ...formState, [target.name]: target.value })
    }

  }
  const handleRememberMeCheck = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.checked })
  }

  const reset = (newFormState = initialState) => {
    setFormState(newFormState);
  }

  const handleSubmit = (e, msg, dispatch = null) => {
    console.log(msg);
    e.preventDefault()
    /* Sweet alerŧ*/
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: { msg }
    })
    if (dispatch) {
      invoiceActive({ ...formState });
    }
  }

  return [formState, handleInputChange, handleRememberMeCheck, handleSubmit, reset]
}
