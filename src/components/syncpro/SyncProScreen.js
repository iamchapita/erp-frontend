import React from 'react'
import { Dashboard } from './Dashboard'
import { Customer } from './modules/Customer/Customer'
import { SideBar } from './SideBar'

export const SyncProScreen = () => {
  return (
    <div className='text-black overflow-hidden flex'>
      <SideBar/>
      <Dashboard />
      {/* <Customer /> */}
    </div>
  )
}
