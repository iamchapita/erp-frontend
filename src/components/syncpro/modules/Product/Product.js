import React, { useEffect, useState } from 'react'
import { productTableHead, productTabs } from '../../../../data/util';
import { Title } from '../../../Title';
import { ProductPageHeader } from './ProductPageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { ProductForm } from './ProductForm';
import { CategoriesForm } from './CategoriesForm';
import {changeTab} from "../../../../actions/product.actions";
import {useForm} from "../../../../hooks/useForm";
import {UnitiesForm} from "./UnitiesForm";

export const Product = () => {

    const dispatch = useDispatch();
    const { currentTab } = useSelector(state => state.product)
    const [editActive, setEditActive] = useState(false);


    useEffect(() => {
        dispatch(changeTab({ index: 0, tab: 'Productos' }));

    }, [dispatch]);

    const [formState, handleInputChange, handleCheck, handleSubmit, setFormState, reset, handleInputCheck] = useForm({
        name: '',
        description: '',
        idProductCategoryFK: '',
        idProductUnityFK: '',
        taxablePrice: '',
        taxExemptPrice: '',
        salePrice: '',
        images: '',
        status: true,
        elaborationDate: '',
        expirationDate: ''
    })

    let functions = {
        formState, handleInputChange, handleCheck, handleSubmit, setFormState, reset, handleInputCheck
    }

    return (
        <div className='p-5 text-start w-full'>
            <Title title={'Productos'} />
            <ProductPageHeader reset={reset} setFormState={setFormState} editActive={editActive} setEditActive={setEditActive} />
            {currentTab.tab === 'Productos' && <ProductForm  {...functions} editActive={editActive} setEditActive={setEditActive} />}
            {currentTab.tab === 'Categorías' && <CategoriesForm {...functions} editActive={editActive} setEditActive={setEditActive} />}
            {currentTab.tab === 'Unidades' && <UnitiesForm {...functions} editActive={editActive} setEditActive={setEditActive} />}

        </div>

    )
}
