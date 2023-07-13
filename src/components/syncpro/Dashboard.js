import React from 'react'
import NavBar from './NavBar'
import { SideBar } from './SideBar'
import { dashBoardItems } from '../../data/util'
import { ItemCard } from './ItemCard'
import { SearchSection } from '../SearchSection'
import { Bolt } from '@mui/icons-material'
import { BarChart1 } from './BarChart'
import { Pagination } from '../Pagination'

export const Dashboard = () => {

    const routes = {
        parentRoute: 'Pages', childRoute: 'Dashboard'
    }

    return (
        <div className='relative'>
            {/* <NavBar /> */}

            <div className='flex'>
                <SideBar />
                <div className='flex-1 p-5'>
                    <Pagination {...routes} />

                    <SearchSection />
                    {/* Items */}
                    <div className='sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 space-y-2 sm:space-y-0 gap-2 sm:mt-5 flex-1 justify-between [&>*]:sm:px-5 [&>*]:px-1 [&>*]:rounded-xl [&>*]:w-auto [&>*]:h-20 [&>*]:bg-white [&>*]:shadow-sm' >
                        {dashBoardItems.map((item, index) => (
                            <ItemCard key={index} {...item} />
                        ))}
                    </div>
                    <div className='w-full grid grid-cols-1 gap-2 sm:grid-cols-5 h-auto mt-2 sm:mt-5'>
                        <div className='bg-white shadow-sm grid col-span-1 sm:grid-cols-1 lg:grid-cols-5 p-5 sm:col-span-3 rounded-xl'>
                            <div className='relative col-span-1 md:col-span-3 text-start'>
                                <p className='text-sm font-bold text-custom-500 opacity-50'>Proyecto de industria</p>
                                <p className='font-bold'>Dashboard de este proyecto</p>
                                <p className='text-custom-500 mb-5'>
                                    Este debería ser un Lorem Ipsum pero
                                    no tengo una extensión para hacer eso con
                                    React en VSCode, entonces, mejor no.
                                    ¿Será que lo dejo de este tamaño?
                                </p>
                                <p className='font-bold mb-5 lg:mb-0 lg:absolute lg:bottom-0'>Leer más -{">"}</p>
                            </div>
                            <div className='bg-custom-300 h-64 flex items-center justify-center sm:col-span-2 rounded'>
                                <Bolt fontSize='large' className='text-custom-300 bg-white rounded-full me-2' />
                                <p className='text-3xl font-medium text-white'>SyncPro</p>
                            </div>
                        </div>
                        <div className='bg-white shadow-sm text-start p-5 sm:col-span-2 rounded-xl'>
                            <div className='bg-custom-300 p-5 rounded h-full flex justify-center items-center text-white'>
                                {/* <BarChart1 /> */}
                            </div>
                        </div>
                    </div>

                    <p className='p-5 bg-white shadow-sm rounded-xl mt-5 text-start'>
                        <p className='font-bold text-custom-500 opacity-50'>Algo por aquí</p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at nisi rhoncus, molestie justo id, mattis neque. Donec scelerisque enim eleifend elementum pretium. Phasellus lorem orci, lacinia sit amet mattis nec, convallis sed tortor. Ut mattis, leo vel lobortis hendrerit, mi enim elementum sem, sed elementum nisl massa vitae tellus. Curabitur a lacus nisi. Phasellus fringilla lectus id mi sodales accumsan. Fusce facilisis gravida lacus, non facilisis elit tristique eu. Fusce tempus lacinia neque vel bibendum. Nulla a dolor egestas, tincidunt odio luctus, rutrum magna. Nullam nunc justo, venenatis ac volutpat a, gravida vehicula mi. Aliquam pulvinar vitae ex vel sagittis. Suspendisse vel leo sit amet magna mollis vehicula. Praesent varius nunc eget iaculis suscipit.

                        Nunc lectus nibh, malesuada ac sollicitudin et, sagittis ut orci. Aliquam erat volutpat. Aliquam a massa eu velit volutpat maximus. Vivamus quis lorem bibendum felis efficitur aliquam. Praesent bibendum eros felis, ac ultrices urna efficitur et. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris auctor tellus volutpat dui fringilla finibus. Mauris vel quam dolor. Vivamus sagittis dui magna. Nullam aliquet tincidunt felis, a commodo ex auctor eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc diam mi, aliquam id sollicitudin nec, finibus malesuada ante.</p>
                </div>

            </div>
        </div >
    )
}
