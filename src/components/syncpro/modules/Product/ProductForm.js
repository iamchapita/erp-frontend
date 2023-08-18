import React, {useEffect, useState} from 'react'
import InputComponent from '../../../InputComponent'
import {useDispatch, useSelector} from 'react-redux';
import {
    chargeCategories, chargeUnities, loadProducts, updateProduct, uploadImage, uploadProduct
} from '../../../../actions/product.actions';
import {useForm} from '../../../../hooks/useForm';
import CategoryIcon from '@mui/icons-material/Category';
import StraightenIcon from '@mui/icons-material/Straighten';
import {AutocompleteComponent} from '../../../Autocomplete';
import {Title} from '../../../Title';
import moment from 'moment';

export const ProductForm = ({editActive, setEditActive}) => {
    const dispatch = useDispatch();
    const {accessToken} = useSelector(state => state.auth);
    const categories = useSelector(state => state.product.productCategories);
    const unities = useSelector(state => state.product.productUnities);
    const {product} = useSelector(state => state.product);

    useEffect(() => {
        accessToken && dispatch(loadProducts(accessToken))
    }, [accessToken, dispatch])


    /**
     * Maneja el envío de un formulario de creación de producto.
     * @param {Event} e - El evento del formulario.
     * @returns {Promise<void>} // Aunque realmente devuelve un objeto.
     */
    const handlePost = async (e) => {
        e.preventDefault();
        await dispatch(uploadProduct(formState, accessToken))
        handleClearImageInput();
    }

    /**
     * Maneja el envío de un formulario de edición de producto.
     * @param {Event} e - El evento del formulario.
     * @returns {Promise<void>} // También devuelve un objeto.
     */
    const handleEdit = async (e) => {
        e.preventDefault();
        console.log('Form', formState);
        await dispatch(updateProduct(formState, accessToken))
        setEditActive(false)
        reset();
    }


    const handleClearImageInput = () => {
        document.getElementById('imageInput').value = ''
    }

    const handleFileChange = (e) => {
        const files = e.target.files
        if (files) {
            dispatch(uploadImage(files, handleInputChange))
        }

    }


    const handleCancelEdit = () => {
        setEditActive(false)
        reset();
    }


    const [formState, handleInputChange, handleCheck, handleSubmit, setFormState, reset] = useForm({
        name: '',
        description: '',
        idProductCategoryFK: '',
        idProductUnityFK: '',
        taxablePrice: '',
        taxExemptPrice: '',
        salePrice: '',
        images: '',
        status: '',
        elaborationDate: '',
        expirationDate: ''
    })

    const {
        name,
        description,
        idProductCategoryFK,
        idProductUnityFK,
        taxablePrice,
        taxExemptPrice,
        salePrice,
        images,
        status,
        elaborationDate,
        expirationDate
    } = formState;

    useEffect(() => {
        setFormState(product)
    }, [product])



    const elaborationDateFormated = moment(elaborationDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
    const expirationDateFormated = moment(expirationDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
    
    /**
     * Objeto de Configuración para Autocompletado
     * @typedef {Object} AutoCompleteConfig
     * @property {string} name - El nombre para identificar el componente de autocompletado.
     * @property {function} handleInputChange - La función para manejar los cambios de entrada en el autocompletado.
     * @property {function} dispatchProp - La función utilizada para despachar una acción (chargeCategories o chargeUnities).
     * @property {Array} items - Un arreglo de elementos para poblar las opciones del autocompletado.
     * @property {string} optionName - La clave para extraer el nombre a mostrar de una opción de los elementos.
     * @property {JSX.Element} icon - El elemento de icono para mostrar junto al autocompletado.
     * @property {string} value - El valor seleccionado actualmente para el autocompletado.
     */

    /**
     * Configuración de Autocompletado para Categorías
     * @type {AutoCompleteConfig}
     */
    const autoCompleteCategories = {
        name: 'idProductCategoryFK',
        handleInputChange,
        dispatchProp: chargeCategories,
        items: categories,
        optionName: 'name',
        icon: <CategoryIcon className='text-custom-300'/>,
        value: idProductCategoryFK
    }

    /**
     * Configuración de Autocompletado para Unidades
     * @type {AutoCompleteConfig}
     */
    const autoCompleteUnities = {
        name: 'idProductUnityFK',
        handleInputChange,
        dispatchProp: chargeUnities,
        items: unities,
        optionName: 'name',
        icon: <StraightenIcon className='text-custom-300'/>,
        value: idProductUnityFK
    }


    return (<form
        onSubmit={editActive ? handleEdit : handlePost}
        className='my-2'>
        <Title title={editActive ? 'Actualizar Producto' : 'Agregar Producto'}/>
        <div
            className='[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2'>
            <div className=''>
                <p className='text-custom-150 font-normal'>Nombre del producto: </p>
                <InputComponent handleInputChange={handleInputChange}
                                maxLength={45}
                                value={name}
                                type={'text'}
                                name={'name'}

                                className={'w-full'} required={true} placeholder={'Nombre del producto'}/>
            </div>
            <div>
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

                    className={'w-full'} name={'imageUrls'}
                    handleInputChange={handleFileChange}
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
    </form>)
}
