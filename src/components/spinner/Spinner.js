import React from 'react'
import './spinner.css'

export const Spinner = () => {
    return (
        <div className='h-screen bg-black w-screen text-center flex justify-center items-center'>
            <div id="load">
                <div>G</div>
                <div>N</div>
                <div>I</div>
                <div>D</div>
                <div>A</div>
                <div>O</div>
                <div>L</div>
            </div>
        </div>
    )
}
