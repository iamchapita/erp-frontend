import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { FetchData } from '../../../utils/fetch';
import { Tab } from '../../../Tab';
import { productTableHead, productTabs } from '../../../../data/util';
import { Title } from '../../../Title';
import { DataGrid } from '@mui/x-data-grid';
import InputComponent from '../../../InputComponent';
import { Textarea } from '@mui/joy';
import { AutocompleteComponent } from '../../../Autocomplete';
import { useForm } from '../../../../hooks/useForm';

export const Product = React.memo(() => {

    const [info, setInfo] = useState()
    const { accessToken } = useSelector(state => state.auth);

    useEffect(() => {
        FetchData('product/getProduct/', accessToken)
            .then(data => {
                setInfo(data);
                console.log(data);
            });
    }, [accessToken])

    const [formState, handleInputChange, , handleSubmit] = useForm({
        productCode: '',
        name: '',
        description: '',
        idProductCategoryFK: '',
        idProductUnityFK: '',
        taxablePrice: '',
        taxExcemptPrice: '',
        salePrice: '',
        images: '',
        status: '',
        elaborationDate: '',
        expirationDate: ''
    })

    return (
        <div className='p-5 text-start w-full'>
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
            <div className='my-2'>
                <Title title={'Agregar producto'} />
                <div className='[&>*]:my-2 [&>*]:[&>*]:mb-2 grid grid-cols-1 md:grid-cols-2 [&>*]:items-center p-5 rounded bg-white sm:grid-cols-2'>
                    <div className=''>
                        <p className='text-custom-150 font-normal'>Nombre del producto: </p>
                        <InputComponent className={'w-full'} required={true} placeholder={'Nombre del producto'} />
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
                        />
                    </div>
                    <div>
                        <p className='text-custom-150 font-normal'>Categoría: </p>
                        <AutocompleteComponent handleInputChange={handleInputChange} />
                    </div>
                    <div>
                        <p className='text-custom-150 font-normal'>Código de producto </p>
                        <InputComponent className={'w-full'} name={'productCode'} handleInputChange={handleInputChange} required={true} placeholder={'Código de producto'} />
                        {/*  <p className='bg-red-200 rounded p-3 w-20' onClick={() => { console.log(formState) }}>Ver</p> */}
                    </div>

                </div>
            </div>
        </div>
    )
}
)


