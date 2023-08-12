import React, { useEffect, useState } from 'react'
import { productTableHead, productTabs } from '../../../../data/util';
import { Title } from '../../../Title';
import { ProductPageHeader } from './ProductPageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { ProductForm } from './ProductForm';

export const Product = () => {
    return (
        <div className='p-5 text-start w-full'>
            <Title title={'Productos'} />
            <ProductPageHeader />
            <ProductForm />
        </div>

    )
}
