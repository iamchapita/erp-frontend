import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FetchData } from '../../../utils/fetch';
import { Tab } from '../../../Tab';
import { productTableHead, productTabs } from '../../../../data/util';
import { Title } from '../../../Title';
import { DataGrid } from '@mui/x-data-grid';
import InputComponent from '../../../InputComponent';
import { AutocompleteComponent } from '../../../Autocomplete';
import { useForm } from '../../../../hooks/useForm';
import { chargeCategories, chargeUnities } from '../../../../actions/product.actions';
import CategoryIcon from '@mui/icons-material/Category';
import StraightenIcon from '@mui/icons-material/Straighten';
import { Option, Select } from '@mui/joy';
import { useOpen } from '../../../../hooks/useOpen';
import CustomizedSnackbars from '../../../SnackBar';


export const Product = React.memo(() => {

    const [info, setInfo] = useState()
    const { accessToken } = useSelector(state => state.auth);

    const categories = useSelector(state => state.productCategories);

    const unities = useSelector(state => state.productUnities);
    const { open, message, handleOpen, handleClose } = useOpen({
		open: true,
		message: "Haz doble click en una fila para editar",
	});
 
	


    useEffect(() => {
        FetchData('product/getProduct/', accessToken)
            .then(data => {
                setInfo(data);
                console.log(data);
            });
    }, [accessToken])


    const [formState, handleInputChange, , handleSubmit] =
        useForm({
            productCode: '',
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
            <CustomizedSnackbars open={open} handleClose={handleClose} message={message} />
            <Title title={'Productos'} />
            <Tab data={productTabs} />
            <div
                className='grid grid-cols-1'
            >
                {info && <DataGrid className='col-span-1'
                    autoHeight
                    density='compact'
                    columns={productTableHead}
                    rows={info}
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
                onSubmit={handleSubmit}
                className='my-2'>
                <Title title={'Agregar producto'} />
                <div className='[&>*]:my-2 [&>*]:md:m-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center px-5 rounded bg-white sm:grid-cols-2'>
                    <div className=''>
                        <p className='text-custom-150 font-normal'>Nombre del producto: </p>
                        <InputComponent handleInputChange={handleInputChange}
                            name={'name'}

                            className={'w-full'} required={true} placeholder={'Nombre del producto'} />
                    </div>
                    <div>
                        <p className='text-custom-150 font-normal'>Descripción: </p>

                        <textarea
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
                            value={formState.description}
                            onChange={(e) => { handleInputChange(e, 100) }}
                        />
                        <p className='text-sm text-custom-300 font-normal'>
                            Caracteres restantes: {100 - formState.description.length}
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
                    <div>
                        <p className='text-custom-150 font-normal'>Código de producto </p>
                        <InputComponent
                            limit={5}
                            className={'w-full'} name={'productCode'} handleInputChange={handleInputChange} required={true}
                            placeholder={'Código de producto'} />

                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Precio sujeto a impuestos: </p>
                        <InputComponent
                            className={'w-full'} name={'taxablePrice'} handleInputChange={handleInputChange} required={true}
                            placeholder={'Precio de venta'} />
                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Precio exento de impuestos: </p>
                        <InputComponent
                            className={'w-full'} name={'taxExemptPrice'} handleInputChange={handleInputChange} required={true}
                            placeholder={'Precio excento de impuestos'} />

                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Precio de venta: </p>
                        <InputComponent
                            className={'w-full'} name={'salePrice'} handleInputChange={handleInputChange} required={true}
                            placeholder={'Precio de venta'} />
                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Fecha de elaboración: </p>
                        <InputComponent
                            type={'date'}
                            className={'w-full'} name={'elaborationDate'} handleInputChange={handleInputChange} required={true}
                            placeholder={'Fecha de elaboración'} />

                    </div>

                    <div>
                        <p className='text-custom-150 font-normal'>Fecha de expiración: </p>
                        <InputComponent
                            type={'date'}
                            className={'w-full'} name={'expirationDate'} handleInputChange={handleInputChange} required={true}
                            placeholder={'Fecha de expiración'} />
                    </div>
                    <div>
                        <p className='text-custom-150 font-normal'>Imagenes: </p>
                        <InputComponent
                            className={'w-full'} name={'imageUrls'} handleInputChange={handleInputChange} required={true}
                            placeholder={'Imagenes'}
                            type={'file'}
                            multiple={true}
                            accept={'image/*'}

                        />


                    </div>

                    <div />

                    <div>
                        <p className='text-custom-150 font-normal'>Estado: </p>
                        <select
                            className='w-full
                        h-10
                        p-2
                        rounded
                        placeholder:text-custom-100
                        bg-inherit
                        border-custom-100
                        focus:outline-none
                        ring-0
                        focus:ring-0
                        outline-none
                        focus:border-custom-400

                        '
                            name='status'
                            value={formState.status}
                            onChange={handleInputChange}

                        >
                            <option
                                className='
                            text-custom-100
                            bg-custom-300
                            hover:bg-custom-250
                            active:bg-custom-200
                            
                            '
                                value='1'>Activo</option>
                            <option className=' text-custom-100
                            bg-custom-300
                            hover:bg-custom-250
                            active:bg-custom-200
                        
                            
                            ' value='0'>Inactivo</option>
                        </select>
                    </div>

                </div>
            </form>
        </div>
    )
}
)


