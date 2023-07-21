import React from 'react'

export const Title = ({ title }) => {
    return (
        <div className='text-xl font-medium text-custom-150 mb-5 line-clamp-3 border-b-2'>{title}</div>
    )
}
