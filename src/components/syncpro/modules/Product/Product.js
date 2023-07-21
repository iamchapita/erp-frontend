import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FetchData } from '../../../utils/fetch';
import { Tab } from '../../../Tab';
import { productTableHead, productTabs } from '../../../../data/util';
import { Title } from '../../../Title';
import { DataGrid } from '@mui/x-data-grid';
import InputComponent from '../../../InputComponent';


export const Product = () => {

    const [info, setInfo] = useState()
    const { accessToken } = useSelector(state => state.auth);


    useEffect(() => {
        FetchData('http://localhost:8082/product/getProduct/', accessToken)
            .then(data => {
                setInfo(data);
            });
    }, [accessToken]);


    return (
        <div className='p-5 text-start'>
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
                <div className='grid grid-cols-1 p-5 rounded bg-red-400 sm:grid-cols-2'>
                    <p>Detalles básicos</p>
                    <InputComponent required={true} placeholder={'Nombre del producto'} />
                </div>

            </div>
        </div>
    )
}
