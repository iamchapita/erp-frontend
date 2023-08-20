import React from 'react'

export const ItemCard = ({title, subTitle, icon:Icon}) => {


    return (
        <div className='flex items-center justify-between [&>*]:mx-5 sm:[&>*]:mx-3 transition-all ease-in-out cursor-pointer hover:bg-custom-350 hover:scale-95'>
            <div className='flex flex-col text-start'>
                <p className='font-bold opacity-50 text-custom-500'>{title}</p>
                <p className='font-bold text-custom-150 text-sm'>{subTitle}</p>
            </div>
            <Icon fontSize='large' className='text-white bg-custom-300 p-1 rounded' />
        </div>
    )
}
