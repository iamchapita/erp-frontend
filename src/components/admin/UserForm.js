import React, {useEffect, useState} from 'react'
import InputComponent from '../InputComponent';
import {useDispatch, useSelector} from 'react-redux';

import { useForm } from '../../hooks/useForm';

import { updateUserRole } from '../../actions/user.actions';
import { Title } from '../Title';
import ActiveUser from './ActiveUser';


export const UserForm = ({editActive, setEditActive, formState, handleInputChange, handleCheck, setFormState, reset}) => {
    const dispatch = useDispatch();
    const {accessToken} = useSelector(state => state.auth);

    const {userActive} = useSelector(state => state.user);


    /**
     * Maneja el envío de un formulario de creación de producto.
     * @param {Event} e - El evento del formulario.
     * @returns {Promise<void>} // Aunque realmente devuelve un objeto.
     */
/*     const handlePost = async (e) => {
        e.preventDefault();
        await dispatch(uploadProduct(formState, accessToken))
        reset();
    } */

    /**
     * Maneja el envío de un formulario de edición de producto.
     * @param {Event} e - El evento del formulario.
     * @returns {Promise<void>} // También devuelve un objeto.
     */
    const handleEdit = async (e) => {
        e.preventDefault();
        await dispatch(updateUserRole(accessToken, formState.uid, formState.role))
        setEditActive(false)
        reset();
    }



    const handleCancelEdit = () => {
        setEditActive(false)
        reset();
    }

    const {
        uid,
        id,
        username,
        email,
        userRole,
        userStatus,
    } = formState;


    useEffect(() => {
        setFormState(userActive)
    }, [userActive])



    return (
        <ActiveUser currentUser={formState} setFormState ={setFormState} editActive={editActive} reset={reset} setEditActive={setEditActive}/>
   /*  <form
        onSubmit={handleEdit}
        className='my-2'>
        <Title title={editActive ? 'Actualizar rol de usuario' : 'Agregar rol'}/>
        <div
            className='[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2'>

          <div className=''>

                <p className='text-custom-150 font-normal'>Nombre de usuario:</p>
                <InputComponent handleInputChange={handleInputChange}
                                maxLength={45}
                                disabled={true}
                                value={username}
                                type={'text'}
                                name={'name'}

                                className={'w-full'} required={true} placeholder={'Nombre de usuario'}/>
            </div>
          {/*   <div>
                <p className='text-custom-150 font-normal'>Descripción: </p>

                <textarea

                    maxLength={150}
                    required={true}
                    value={description}
                    className='w-full
                h-20
                p-2
                rounded
            placeholder:text-custom-100
                bg-inherit
            border-custom-100
            focus:outline-none
            ring-0
            focus:ring-0
            outline-none
            focus:border-custom-400'
                    placeholder='Descripción del producto'
                    name='description'
                    onChange={(e) => {
                        handleInputChange(e, 150)
                    }}
                />
                <p className='text-sm text-custom-300 font-normal'>
                    Caracteres restantes: {150 - formState.description.length}
                </p>
            </div>
            <div>
                <p className='text-custom-150 font-normal'>Categoría: </p>
                <AutocompleteComponent

                    {...autoCompleteCategories}
                    handleInputChange={handleInputChange}/>
            </div>
            <div>
                <p className='text-custom-150 font-normal'>Unidad de medida: </p>
                <AutocompleteComponent
                    {...autoCompleteUnities}
                    handleInputChange={handleInputChange}/>

            </div>
            <div>
                <p className='text-custom-150 font-normal'>Precio sujeto a impuestos: </p>
                <InputComponent
                    value={taxablePrice}
                    step={'.01'}
                    type={'number'}
                    required={true}
                    className={'w-full'} name={'taxablePrice'} handleInputChange={handleInputChange}
                    placeholder={'Precio de venta'}/>
            </div>

            <div>
                <p className='text-custom-150 font-normal'>Precio exento de impuestos: </p>
                <InputComponent
                    value={taxExemptPrice}
                    step={'.01'}
                    type={'number'}
                    required={true}
                    className={'w-full'} name={'taxExemptPrice'} handleInputChange={handleInputChange}
                    placeholder={'Precio excento de impuestos'}/>

            </div>

            <div>
                <p className='text-custom-150 font-normal'>Precio de venta: </p>
                <InputComponent
                    value={salePrice}
                    step={'.01'}
                    type={'number'}
                    required={true}
                    className={'w-full'} name={'salePrice'} handleInputChange={handleInputChange}
                    placeholder={'Precio de venta'}/>
            </div>

            <div>
                <p className='text-custom-150 font-normal'>Fecha de elaboración: </p>
                <InputComponent
                    value={elaborationDateFormated}
                    required={true}
                    type={'date'}
                    min={'2000-01-01'}
                    className={'w-full'} name={'elaborationDate'} handleInputChange={handleInputChange}
                    placeholder={'Fecha de elaboración'}/>

            </div>

            <div>
                <p className='text-custom-150 font-normal'>Fecha de expiración: </p>
                <InputComponent
                    value={expirationDateFormated}
                    required={true}
                    type={'date'}
                    className={'w-full'} name={'expirationDate'} handleInputChange={handleInputChange}
                    placeholder={'Fecha de expiración'}/>
            </div>
            {!editActive && <div>
                <p className='text-custom-150 font-normal'>Imagenes: </p>
                <InputComponent
                    id={'imageInput'}
                    className={'w-full'} name={'images'}
                    handleInputChange={handleImageChange}
                    placeholder={'Imagenes'}
                    type={'file'}
                    multiple={true}
                    accept={'image/*'}

                />


            </div>
            }
            <div/>

            <div className='flex items-center space-x-2 justify-center'>
                <p className='text-custom-150 font-normal'>Estado: </p>
                <input
                    checked={status}
                    onChange={handleCheck}
                    type={'checkbox'}
                    className='
                w-5
                h-5
                p-2
                rounded
                text-custom-100
                cursor-pointer
                focus:outline-none
                ring-0
                focus:ring-0
                outline-none
                
                font-semibold

                '
                    name={'status'}
                    placeholder={'Estado'}

                />

            </div>

            <div>
                <button
                    type='submit'
                    className='
            w-full
            h-10
            p-2
            rounded
            text-custom-100
            bg-custom-300
            hover:bg-custom-250
            active:bg-custom-200
            focus:outline-none
            ring-0
            focus:ring-0
            outline-none
            focus:border-custom-400
            font-semibold
                        transition-all
            ease-in-out
            '>
                    {editActive ? 'Actualizar producto' : 'Agregar producto'}
                </button>
            </div>
            {editActive && <div>
                <button
                    className='
            w-full
            h-10
            p-2
            rounded
            text-white
            bg-red-600
            hover:bg-red-800
            active:bg-red-500
            focus:outline-none
            ring-0
            focus:ring-0
            outline-none
            focus:border-custom-400
            font-semibold
            space-x-2
            transition-all
            ease-in-out
            '
                onClick={handleCancelEdit}
                >
                    Cancelar
                </button>
            </div>} 

         </div>
            </form>)  }*/
    )
}

