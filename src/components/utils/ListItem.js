import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

export const ListItem = ({ Icon, Title, ClassName }) => {
    console.log(ClassName);
    return (
        <li className={`text-center transition ${ClassName}`}>
            <Tooltip
                componentsProps={
                    {
                        tooltip: {
                            sx: {
                                backgroundColor: '#fff',
                                color: '#000000',
                                fontSize: '0.8rem',
                                border: '1px solid rgba(79, 209, 197, 0.15)'
                            }
                        },
                        arrow: {
                            sx: {
                                color: '#fff',
                                border: '1px solid rgba(79, 209, 197, 0.15)'
                            }
                        }
                    }
                }
                arrow

                title={Title} placement='right' followCursor>
                <IconButton>
                    <Icon fontSize='large' className='text-white' />
                </IconButton>
            </Tooltip>
        </li>
    )
}
