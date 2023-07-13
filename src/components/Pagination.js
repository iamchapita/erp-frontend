import React from 'react'

export const Pagination = ({ parentRoute, childRoute }) => {

    return (
        <div className=''>
            <div className='text-start mx-5 sm:mx-0 sm:mt-0 font-medium'>
                <p>{parentRoute} / <span className='text-custom-500'>{childRoute}</span></p>
            </div>
            <div className='text-start mt-2 font-bold mx-5 sm:mx-0'>
                <p className=''>{childRoute}</p>
            </div>
        </div>
    )
}
