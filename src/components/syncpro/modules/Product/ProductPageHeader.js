
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Tab } from '../../../Tab'
import { useDispatch, useSelector } from 'react-redux'
import {changeTab, productActive} from '../../../../actions/product.actions'
import { productCategoriesTableHead, productTableHead, productTabs, productUnitiesTableHead } from '../../../../data/util'
import { Box } from '@mui/joy'

export const ProductPageHeader = () => {
    const dispatch = useDispatch();
    const { products, productCategories, productUnities } = useSelector(state => state.product)
    const [data, setData] = useState([]);
    const [tableHead, setTableHead] = useState(productTableHead);
    const { tab } = useSelector(state => state.product.currentTab)
    const [selectedRow, setSelectedRow] = useState(null);
    const handleTabClick = (index, tab) => {
        if (tab === 'Productos') {
            console.log(products);
            setData(products)
            setTableHead(productTableHead)
        }
        if (tab === 'Categorías') {
            console.log(productCategories);
            setData(productCategories)
            setTableHead(productCategoriesTableHead)
        }
        if (tab === 'Unidades') {
            console.log(productUnities);
            setData(productUnities)
            setTableHead(productUnitiesTableHead)
        }

        dispatch(changeTab({ index, tab }));
    };

    const handleSelectRow = (params) => {
        console.log(params.row)
        dispatch(productActive(params.row))

    }


    useEffect(() => {
        if (tab === 'Productos') {
            console.log(products);
            setData(products)
            setTableHead(productTableHead)
        }
        if (tab === 'Categorías') {
            console.log(productCategories);
            setData(productCategories)
            setTableHead(productCategoriesTableHead)
        }
        if (tab === 'Unidades') {
            console.log(productUnities);
            setData(productUnities)
            setTableHead(productUnitiesTableHead)
        }
    }, [ products, productCategories, productUnities]);


    const tabData = {
        dataTabs: productTabs,
        handleTabClick,
        reducer: 'product'
    }


    return (
        <>
            <Tab {...tabData} />
            <div className='grid grid-cols-1'>
                {data && <Box
                    sx={{
                        height: 300,
                        width: '100%',
                        '& .activo': {
                            backgroundColor: '#a5d6a7',
                            color: '#1a3e72',
                        },
                        '& .inactivo': {
                            backgroundColor: '#ef9a9a',
                            color: '#1a3e72',
                        },
                    }}
                > <DataGrid
                        className='col-span-1' autoHeight density='compact' columns={tableHead}
                        rows={data.map(row => {

                            return { ...row, status: (row.status === undefined) || (row.status === 1) ? 'Activo' : 'Inactivo' };
                        })}
                        getCellClassName={(params) => {

                            return params.row.status === 'Activo' ? 'activo' : 'inactivo';
                        }}
                        getRowClassName={(params) => {

                        }}
                        initialState={
                            {
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }
                        }
                        pageSizeOptions={[5, 10, 20]}
                        onRowDoubleClick={handleSelectRow}
                    />
                </Box>}
            </div>
        </>
    )
}
