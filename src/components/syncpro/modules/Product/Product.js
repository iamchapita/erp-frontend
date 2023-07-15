import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FetchData } from '../../../utils/fetch';
import DataTable from 'react-data-table-component'
import { CircularProgress } from '@mui/material';
export const Product = () => {
    const columns = [
        {
            name: 'Id',
            selector: row => row.id
        },
        {
            name: 'Nombre',
            selector: row => row.name
        }
    ]


    const [info, setInfo] = useState()

    const { accessToken } = useSelector(state => state.auth);
    const [pendiente, setPendiente] = useState(true)

    useEffect(() => {
        FetchData('http://localhost:8082/product/getProduct/', accessToken)
            .then(data => {
                setInfo(data);
            });

        info && setPendiente(false)

    }, [accessToken]);

    console.log(columns);




    return (
        <div className='relative w-screen'>
            <div className='flex-1 p-5 space-y-3'>
                <DataTable
                    columns={columns}
                    data={info}
                    pagination
                    progressPending={pendiente}
                    progressComponent={<CircularProgress />}
                />
            </div>
        </div>
    )
}
