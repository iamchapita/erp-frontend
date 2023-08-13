import React, { useEffect } from 'react'
import InputComponent from '../../../InputComponent'
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, uploadCategory, uploadProduct } from '../../../../actions/product.actions';
import { useForm } from '../../../../hooks/useForm';
import { Title } from '../../../Title';

export const CategoriesForm = () => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector(state => state.auth);
 
    useEffect(() => {
        accessToken && dispatch(loadProducts(accessToken))
    }, [accessToken, dispatch])

    const handlePost = async (e) => {
        e.preventDefault();
        console.log('Form', formState);
        await dispatch(uploadCategory(formState, accessToken))
    }






    const [formState, handleInputChange, handleCheck] =
        useForm({
            name: '',
            status: 0,
        })

    const {
        name,
        status
    } = formState;

    return (
        <form
            onSubmit={handlePost}
            className='my-2'>
            <Title title={'Agregar categoría'} />
            <div className='[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2'>
                <div className=''>
                    <p className='text-custom-150 font-normal'>Nombre de la categoría: </p>
                    <InputComponent handleInputChange={handleInputChange}
                        maxLength={45}
                        value={name}
                        type={'text'}
                        name={'name'}

                        className={'w-full'} required={true} placeholder={'Nombre del producto'} />
                </div>

                <div className='flex items-center space-x-2 justify-center'>
                    <p className='text-custom-150 font-normal'>Estado: </p>
                    <InputComponent
                        value={status}
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
                        handleInputChange={handleCheck}
                        placeholder={'Estado'}
                        checked={formState.status ? 1 : 0}
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
            '>
                        Agregar categoría
                    </button>
                </div>

            </div>
        </form>
    )
}
