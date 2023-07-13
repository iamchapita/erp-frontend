import { AddCard, Home, LocalShipping, Logout, Paid, Person, Person4, PersonAdd, PointOfSale, Receipt, Settings, Wallet } from "@mui/icons-material";

export const items = [
    {
        Icon: Home,
        Title: 'Dashboard'
    },
    {
        Icon: Person,
        Title: 'Clientes'
    },
    {
        Icon: Receipt,
        Title: 'Facturas'
    },
    {
        Icon: LocalShipping,
        Title: 'Proveedores'
    },
    {
        Icon: AddCard,
        Title: 'Compras'
    },
    {
        Icon: PointOfSale,
        Title: 'Ventas'
    },
    {
        Icon: Settings,
        Title: 'Configuración'
    },
    {
        Icon: Logout,
        Title: 'Cerrar Sesión',
        className: 'justify-self-end absolute bottom-16'
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