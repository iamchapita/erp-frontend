
import { DataGrid } from '@mui/x-data-grid'
import React, { Fragment, useEffect, useState } from 'react'
import { Tab } from '../../../Tab'
import { useDispatch, useSelector } from 'react-redux'
import { changeTab } from '../../../../actions/product.actions'
import { productTableHead, productTabs } from '../../../../data/util'

export const ProductPageHeader = () => {
    const dispatch = useDispatch();
    const { products, productCategories, productUnities } = useSelector(state => state.product)
    const [data, setData] = useState({});
    const [tableHead, setTableHead] = useState(productTableHead);


    const handleTabClick = (index, tab) => {
        if (tab === 'Productos') {
            console.log(products);
            setData(products)
            setTableHead(productTableHead)
        }
        if (tab === 'Categorías') {
            console.log(productCategories);
            setData(productCategories)
        }
        if (tab === 'Unidades') {
            console.log(productUnities);
            setData(productUnities)
        }

        dispatch(changeTab({ index, tab }));
    };


    useEffect(() => {
        setData(products)
        dispatch(changeTab({ index: 0, tab: productTabs[0] }));
    }, [dispatch, products]);

    const tabData = {
        dataTabs: productTabs,
        handleTabClick,
        reducer: 'product'
    }


    return (
        <>
            <Tab {...tabData} />
            <div className='grid grid-cols-1'>
                {data && <DataGrid
                    className='col-span-1' autoHeight density='compact' columns={tableHead}
                    rows={data}
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
        </>
    )
}
