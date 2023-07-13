import React from 'react'
import { Dashboard } from './Dashboard'
import { Customer } from './modules/Customer'

export const SyncProScreen = () => {
  return (
    <div className='text-black overflow-hidden'>
      <Dashboard />
      {/* <Customer /> */}
    </div>
  )
}
