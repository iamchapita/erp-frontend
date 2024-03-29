import React, { useEffect } from 'react'
import InputComponent from '../../../InputComponent'
import { useDispatch, useSelector } from 'react-redux';
import {
    changeTab,
    loadProducts, updateCat,
    updateProduct, updateUnity,
    uploadCategory,
    uploadProduct, uploadUnity
} from '../../../../actions/product.actions';
import { useForm } from '../../../../hooks/useForm';
import { Title } from '../../../Title';
import {productTabs} from "../../../../data/util";

export const UnitiesForm = ({formState, handleInputChange, handleCheck, handleSubmit, setFormState, reset, handleInputCheck, editActive, setEditActive}) => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector(state => state.auth);
    const {unityActive} = useSelector(state => state.product);

    const handlePost = async (e) => {
        e.preventDefault();
        console.log('Form', formState);
        await dispatch(uploadUnity(formState, accessToken))
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        await dispatch(updateUnity(formState, accessToken))
        setEditActive(false)
        reset();
    }


    useEffect(()=>{
        setFormState(unityActive)
    },[unityActive])

    const {
        name,
        symbol,
    } = formState;

    useEffect(() => {
        console.log('Edit', editActive)
    }, [editActive]);

    return (
        <form
            onSubmit={editActive ? handleUpdate : handlePost}
            className='my-2'>
            <Title title={editActive ?  'Editar unidad de medida' : 'Agregar unidad de medida'} />
            <div className='[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2'>
                <div className=''>
                    <p className='text-custom-150 font-normal'>Nombre de la unidad: </p>
                    <InputComponent handleInputChange={handleInputChange}
                                    maxLength={45}
                                    value={name}
                                    type={'text'}
                                    name={'name'}

                                    className={'w-full'} required={true} placeholder={'Nombre del producto'} />
                </div>

                <div className='flex items-center space-x-2 justify-center'>
                    <div className=''>
                        <p className='text-custom-150 font-normal'>Símbolo de la unidad: </p>
                        <InputComponent handleInputChange={handleInputChange}
                                        maxLength={45}
                                        value={symbol}
                                        type={'text'}
                                        name={'symbol'}

                                        className={'w-full'} required={true} placeholder={'Símbolo de la unidad'} />
                    </div>


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
            '>
                        {editActive ? 'Actualizar' : 'Agregar'}
                    </button>
                </div>

            </div>
        </form>
    )
}
