import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tab } from '../../../Tab';
import { productTableHead, productTabs } from '../../../../data/util';
import { Title } from '../../../Title';
import { DataGrid } from '@mui/x-data-grid';
import InputComponent from '../../../InputComponent';
import { AutocompleteComponent } from '../../../Autocomplete';
import { useForm } from '../../../../hooks/useForm';
import { chargeCategories, chargeUnities, loadProducts, productActive, uploadImage, uploadProduct } from '../../../../actions/product.actions';
import CategoryIcon from '@mui/icons-material/Category';
import StraightenIcon from '@mui/icons-material/Straighten';

export const Product = React.memo(() => {

    const dispatch = useDispatch();
    const { accessToken } = useSelector(state => state.auth);
    const products = useSelector(state => state.product.products);
    const categories = useSelector(state => state.product.productCategories);
    const unities = useSelector(state => state.product.productUnities);
    useEffect(() => {
        accessToken && dispatch(loadProducts(accessToken))
    }, [accessToken, dispatch])

    const handlePost = async (e) => {
        e.preventDefault();
        console.log('Form', formState);
        await dispatch(uploadProduct(formState, accessToken))
        reset();
        handleClearImageInput();
    }


    const handleClearImageInput = () => {
        document.getElementById('#imageInput').value = ''
    }

    const handleFileChange = (e) => {
        const files = e.target.files
        if (files) {
            dispatch(uploadImage(files, handleInputChange))
        }
    }


    const [formState, handleInputChange, handleCheck, handleSubmit, reset] =
        useForm({
            name: '',
            description: '',
            idProductCategoryFK: 0.00,
            idProductUnityFK: 0.00,
            taxablePrice: 0.00,
            taxExemptPrice: 0.00,
            salePrice: 0.00,
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



    const autoCompleteCategories = {
        name: 'idProductCategoryFK',
        handleInputChange,
        dispatchProp: chargeCategories,
        items: categories,
        optionName: 'name',
        icon: <CategoryIcon className='text-custom-300' />
    }

    const autoCompleteUnities = {
        name: 'idProductUnityFK',
        handleInputChange,
        dispatchProp: chargeUnities,
        items: unities,
        optionName: 'name',
        icon: <StraightenIcon className='text-custom-300' />
    }

    return (
        <div className='p-5 text-start w-full'>
            <Title title={'Productos'} />
            <Tab data={productTabs} />
            <div
                className='grid grid-cols-1'
            >
                {products && <DataGrid className='col-span-1'
                    autoHeight
                    density='compact'
                    columns={productTableHead}
                    rows={products}
                    initialState={
                        {
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }
                    }
                    pageSizeOptions={[5, 10, 20]}

                />}
            </div>
            <form
                onSubmit={handlePost}
                className='my-2'>
                <Title title={'Agregar producto'} />
                <div className='[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2'>
                    <div className=''>
                        <p className='text-custom-150 font-normal'>Nombre del producto: </p>
                        <InputComponent handleInputChange={handleInputChange}
                            maxLength={45}
                            value={name}
                            type={'text'}
                            name={'name'}

                            className={'w-full'} required={true} placeholder={'Nombre del producto'} />
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
                            onChange={(e) => { handleInputChange(e, 150) }}
                        />
                        <p className='text-sm text-custom-300 font-normal'>
                            Caracteres restantes: {150 - formState.description.length}
                        </p>
                    </div>
                    <div>
                        <p className='text-custom-150 font-normal'>Categoría: </p>
                        <AutocompleteComponent

                            {...autoCompleteCategories}
                            handleInputChange={handleInputChange} />
                    </div>
                    <div>
                        <p className='text-custom-150 font-normal'>Unidad de medida: </p>
                        <AutocompleteComponent
                            {...autoCompleteUnities}
                            handleInputChange={handleInputChange} />

                    </div>
                    {/* <div>
                        <p className='text-custom-150 font-normal'>Código de producto </p>
                        <InputComponent
                            required={true}
                            limit={5}
                            className={'w-full'} name={'productCode'} handleInputChange={handleInputChange}
                            placeholder={'Código de producto'} />

                    </div> */}

                    <div>
                        <p className='text-custom-150 font-normal'>Precio sujeto a impuestos: </p>
                        <InputComponent
                            value={taxablePrice}
                            step={'.01'}
                            type={'number'}
                            required={true}
                            className={'w-full'} name={'taxablePrice'} handleInputChange={handleInputChange}
                            placeholder={'Precio de venta'} />
                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Precio exento de impuestos: </p>
                        <InputComponent
                            value={taxExemptPrice}
                            step={'.01'}
                            type={'number'}
                            required={true}
                            className={'w-full'} name={'taxExemptPrice'} handleInputChange={handleInputChange}
                            placeholder={'Precio excento de impuestos'} />

                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Precio de venta: </p>
                        <InputComponent
                            value={salePrice}
                            step={'.01'}
                            type={'number'}
                            required={true}
                            className={'w-full'} name={'salePrice'} handleInputChange={handleInputChange}
                            placeholder={'Precio de venta'} />
                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Fecha de elaboración: </p>
                        <InputComponent
                            value={elaborationDate}
                            required={true}
                            type={'date'}
                            min={'2000-01-01'}
                            className={'w-full'} name={'elaborationDate'} handleInputChange={handleInputChange}
                            placeholder={'Fecha de elaboración'} />

                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Fecha de expiración: </p>
                        <InputComponent
                            value={expirationDate}
                            required={true}
                            type={'date'}
                            className={'w-full'} name={'expirationDate'} handleInputChange={handleInputChange}
                            placeholder={'Fecha de expiración'} />
                    </div>
                    <div>
                        <p className='text-custom-150 font-normal'>Imagenes: </p>
                        <InputComponent
                            id={'imageInput'}
                            required={true}
                            className={'w-full'} name={'imageUrls'}
                            handleInputChange={handleFileChange}
                            placeholder={'Imagenes'}
                            type={'file'}
                            multiple={true}
                            accept={'image/*'}

                        />


                    </div>

                    <div />

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
                            Agregar producto
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )
}
)


