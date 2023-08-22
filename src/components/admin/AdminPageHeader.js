import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userManagementDataTabs, userTableHead } from '../../data/util';
import { changeTab } from '../../actions/customer.action';
import { Tab } from '../Tab';
import { getAllUsers, userActiveAction } from '../../actions/user.actions';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/joy';

export const AdminPageHeader = ({ editActive, setEditActive, reset, setFormState }) => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector(state => state.auth)
    const { users, userActive, roles } = useSelector(state => state.user)
    const [data, setData] = useState([]);
    const [tableHead, setTableHead] = useState(userTableHead);
    const { tab } = useSelector(state => state.product.currentTab)
    const [selectedRow, setSelectedRow] = useState();



    const selectedTab = (tab) => {
        if (tab === 'Usuarios') {
            setData(users)

        }
        if (tab === "Administradores") {
            const admins = users.filter(user => user.userRole === "Administrador")
            setData(admins)

        }
        if (tab === 'Vendedores') {
            const sellers = users.filter(user => user.userRole === "Vendedor")
            setData(sellers)

        }
        if (tab === "Cajeros") {
            const cashiers = users.filter(user => user.userRole === "Cajero")
            setData(cashiers)

        }
        if (tab === "Registradores") {
            const registrators = users.filter(user => user.userRole === "Registrador")
            setData(registrators)

        }
        if (tab === "Cotizadores") {
            const quoters = users.filter(user => user.userRole === "Cotizador")
            setData(quoters)
        }
        if (tab === "Superadministradores") {
            const superadmins = users.filter(user => user.userRole === "Superadministrador")
            setData(superadmins)
        }
        if (tab === "Sin asignar") {
            const unassigned = users.filter(user => user.userRole === "No Asignado")
            setData(unassigned)
        }
    }


    const handleTabClick = (index, tab) => {
        selectedTab(tab);

        dispatch(changeTab({ index, tab }));
    };


    const handleEditClick = (params) => {
        console.log();
        setEditActive(true);
        setFormState(params.row);
        dispatch(userActiveAction(params.row));
    }

    useEffect(() => {
        selectedTab(tab);
    }, [tab, users, userActive, roles])

    const tabData = {
        dataTabs: userManagementDataTabs,
        handleTabClick,
        reducer: 'product'
    }


    return (
        <>
            <Tab {...tabData} />
            <div className='grid grid-cols-1'>

            {data && <Box
                    sx={{
                        height: 300,
                        width: '100%',
                        '& .activo': {
                            backgroundColor: '#a5d6a7',
                            color: '#1a3e72',
                        },
                        '& .inactivo': {
                            backgroundColor: '#ef9a9a',
                            color: '#1a3e72',
                        },
                    }}
                >
                <DataGrid
                    className='col-span-1' autoHeight density='compact' columns={tableHead}
                    rows={data.map(row => {

                        return { ...row, userStatus: (row.userStatus === undefined) || (row.userStatus === 1) ? 'Activo' : 'Inactivo' };
                    })}
                    getCellClassName={(params) => {

                        return params.row.userStatus === 'Activo' ? 'activo' : 'inactivo';
                    }}
                    getRowClassName={(params) => {

                    }}
                    initialState={
                        {
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }
                    }
                    pageSizeOptions={[5, 10, 20]}

                    onRowClick={handleEditClick}
                    onCellKeyDown={() => {
                        setEditActive(false)
                        reset()
                    }}
                />
                </Box>}
            </div>
        </>

    )
}
