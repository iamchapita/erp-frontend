import { AddCard, Home, Inventory, LocalShipping, Logout, Paid, Person, Person4, PersonAdd, PointOfSale, Receipt, Settings, Wallet } from "@mui/icons-material";

export const items = [
    {
        Icon: Home,
        Title: 'Dashboard',
        path: 'dashboard'
    },
    {
        Icon: Person,
        Title: 'Clientes',
        path: 'clientes'
    },
    {
        Icon: Inventory,
        Title: 'Productos',
        path: 'productos'
    },
    {
        Icon: Receipt,
        Title: 'Facturas',
        path: 'facturas'
    },
    {
        Icon: LocalShipping,
        Title: 'Proveedores',
        path: 'proveedores'
    },
    {
        Icon: AddCard,
        Title: 'Compras',
        path: 'compras'
    },
    {
        Icon: PointOfSale,
        Title: 'Ventas',
        path: 'ventas'
    },
    {
        Icon: Settings,
        Title: 'Configuración',
        path: 'configuracion'
    },
    {
        Icon: Logout,
        Title: 'Cerrar Sesión',
        className: 'justify-self-end absolute bottom-0'
    }
]


export const dashBoardItems = [
    {
        title: 'Ventas de hoy',
        subTitle: 'L. 34.54',
        icon: Wallet
    },
    {
        title: 'Usuarios de hoy',
        subTitle: '2,500',
        icon: Person4
    },
    {
        title: 'Nuevos usuarios',
        subTitle: '3,067',
        icon: PersonAdd
    },
    {
        title: 'Ventas totales',
        subTitle: 'L. 342,456.36',
        icon: Paid
    }
]


export const productTabs = [
    'Productos',
    'Categorías',
    'Marcas',
    'Proveedores'
]


export const productTableHead = [
    {
        field: 'id',
        headerName: 'ID',
        width: 100,
        editable: true
    },
    {
        field: 'name',
        headerName: 'Nombre',
        width: 200,
        editable: true
    },
    {
        field: 'description',
        headerName: 'Descripción',
        width: 200,
        editable: true
    },
    {
        field: 'salePrice',
        headerName: 'Precio de venta (L.)',
        width: 200,
        editable: true
    },
    {
        field: 'taxExemptPrice',
        headerName: 'Precio sin impuestos (L.)',
        width: 200,
        editable: true
    },
    {
        field: 'taxablePrice',
        headerName: 'Precio sujeto a impuestos (L. )',
        width: 200,
        editable: true
    },

]

export const invoiceTableHead = [
    {
        field: 'id',
        headerName: 'ID',
        width: 100,
        editable: true
    },
    {
        field: 'cai',
        headerName: 'CAI',
        width: 100,
        editable: true
    },
    {
        field: 'rtn',
        headerName: 'RTN',
        width: 100,
        editable: true
    },
    {
        field: 'saleDate',
        headerName: 'Fecha de venta',
        width: 200,
        editable: true
    },
    {
        field: 'dueDate',
        headerName: 'Fecha de vencimiento',
        width: 200,
        editable: true
    },
    {
        field: 'creditDays',
        headerName: 'Días de crédito',
        width: 200,
        editable: true
    },

]