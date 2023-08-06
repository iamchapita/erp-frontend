import { Mail, Search } from '@mui/icons-material'
import { Button, Input } from '@mui/material'
import React from 'react'

export const    SearchSection = () => {
    return (
        <div className="relative ms-5 sm:ms-0 w-2/3 mt-2 rounded-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search />
            </div>
            <input
                type="text"
                name="price"
                id="price"
                className="block 
                rounded-xl border-0 
                py-1.5 pl-10 pr-20 text-gray-900 
                ring-1 ring-inset 
                ring-custom-500
                ring-opacity-30 
                placeholder:text-custom-500 
                focus:ring-2 focus:ring-inset
                 focus:ring-custom-300 sm:text-sm sm:leading-6 focus:outline-none"
                placeholder="Buscar"
            />
        </div>
    )
}
