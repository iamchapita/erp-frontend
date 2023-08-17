import React, { useEffect, useState } from 'react'
import { productTableHead, productTabs } from '../../../../data/util';
import { Title } from '../../../Title';
import { ProductPageHeader } from './ProductPageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { ProductForm } from './ProductForm';
import { CategoriesForm } from './CategoriesForm';
import {changeTab} from "../../../../actions/product.actions";

export const Product = () => {

    const dispatch = useDispatch();
    const { currentTab } = useSelector(state => state.product)
    const [editActive, setEditActive] = useState(false);


    useEffect(() => {
        dispatch(changeTab({ index: 0, tab: 'Productos' }));

    }, [dispatch]);


    return (
        <div className='p-5 text-start w-full'>
            <Title title={'Productos'} />
            <ProductPageHeader editActive={editActive} setEditActive={setEditActive} />
            {currentTab.tab === 'Productos' && <ProductForm  editActive={editActive} setEditActive={setEditActive} />}
            {currentTab.tab === 'Categorías' && <CategoriesForm />}
        </div>

    )
}
