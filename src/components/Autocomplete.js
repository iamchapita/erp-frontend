import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { chargeCategories } from '../actions/product.actions';
import { Autocomplete } from '@mui/joy';
import CategoryIcon from '@mui/icons-material/Category';


export const AutocompleteComponent = ({ handleInputChange }) => {

    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.accessToken);
    const categories = useSelector(state => state.productCategories);


    useEffect(() => {
        if (accessToken) {
            dispatch(chargeCategories(accessToken))

        }
    }, [accessToken, dispatch])

    const handleCategorySelect = (event, selectedOption) => {
        if (selectedOption) {
            handleInputChange(
                {
                    target:
                    {
                        name: 'idProductCategoryFK',
                        value: selectedOption.id
                    }
                });
        } else {
            handleInputChange(
                {
                    target:
                    {
                        name: 'idProductCategoryFK',
                        value: ''
                    }
                });
        }
    };


    return (
        <Autocomplete
            options={categories}
            getOptionLabel={(option) => option.name}
            name='idProductCategoryFK'
            onChange={handleCategorySelect}
            className='bg-inherit'
            startDecorator={<CategoryIcon className='text-custom-300' />}
            sx={{
                /* bg */
                '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
                    backgroundColor: 'inherit',
                }
            }
            }
        />

    )
}
