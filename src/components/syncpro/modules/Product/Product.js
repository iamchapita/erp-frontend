import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {FetchData} from '../../../utils/fetch';
import {Tab} from '../../../Tab';
import {productTableHead, productTabs} from '../../../../data/util';
import {Title} from '../../../Title';
import {DataGrid} from '@mui/x-data-grid';
import InputComponent from '../../../InputComponent';
import {Textarea} from '@mui/joy';

export const Product = () => {

    const [info, setInfo] = useState()
    const {accessToken} = useSelector(state => state.auth);


    useEffect(() => {
        FetchData('product/getProduct/', accessToken)
            .then(data => {
                setInfo(data);
            });
    }, [accessToken]);


    return (
        <div className='p-5 text-start w-full'>
            <Title title={'Productos'}/>
            <Tab data={productTabs}/>
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
                                               paginationModel: {page: 0, pageSize: 5},
                                           },
                                       }
                                   }
                                   pageSizeOptions={[5, 10, 20]}

                />}
            </div>
            <div className='my-2'>
                <Title title={'Agregar producto'}/>
                <div className='[&>*]:flex [&>*]:items-center p-5 rounded bg-custom-300 sm:grid-cols-2'>
                    <div>
                        <p>Detalles básicos: </p>
                        <InputComponent required={true} placeholder={'Nombre del producto'}/>
                    </div>
                    <div>
                        <p>Descripción: </p>
                        <Textarea
                            color="primary"
                            disabled={false}
                            minRows={2}
                            placeholder="fggd"
                            size="lg"
                            variant="solid"
                        />
                    </div>
                </div>


            </div>
        </div>
    )
}
