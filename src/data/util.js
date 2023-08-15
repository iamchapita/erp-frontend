import {
	AddCard,
	FlashlightOffRounded,
	Home,
	Inventory,
	LocalShipping,
	Logout,
	Paid,
	Person,
	Person4,
	PersonAdd,
	PointOfSale,
	Receipt,
	Settings,
	Wallet,
	FormatListNumberedRtlOutlined,
} from "@mui/icons-material";

export const items = [
	{
		Icon: Home,
		Title: "Dashboard",
		path: "dashboard",
	},
	{
		Icon: Person,
		Title: "Clientes",
		path: "clientes",
	},
	{
		Icon: Inventory,
		Title: "Productos",
		path: "productos",
	},
	{
		Icon: Receipt,
		Title: "Facturas",
		path: "facturas",
	},
	{
		Icon: LocalShipping,
		Title: "Proveedores",
		path: "proveedores",
	},
	{
		Icon: AddCard,
		Title: "Compras",
		path: "compras",
	},
	{
		Icon: PointOfSale,
		Title: "Ventas",
		path: "ventas",
	},
	{
		Icon: FormatListNumberedRtlOutlined,
		Title: "Bitácora",
		path: "bitacora",
		role: "Administrador",
	},
	{
		Icon: Settings,
		Title: "Configuración",
		path: "configuracion",
	},
	{
		Icon: Logout,
		Title: "Cerrar Sesión",
		className: "justify-self-end absolute bottom-0",
	},
];

export const dashBoardItems = [
	{
		title: "Ventas de hoy",
		subTitle: "L. 34.54",
		icon: Wallet,
	},
	{
		title: "Usuarios de hoy",
		subTitle: "2,500",
		icon: Person4,
	},
	{
		title: "Nuevos usuarios",
		subTitle: "3,067",
		icon: PersonAdd,
	},
	{
		title: "Ventas totales",
		subTitle: "L. 342,456.36",
		icon: Paid,
	},
];

export const productTabs = ["Productos", "Categorías", "Unidades"];

export const productTableHead = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "name",
		headerName: "Nombre",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "description",
		headerName: "Descripción",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "salePrice",
		headerName: "Precio de venta (L.)",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "taxExemptPrice",
		headerName: "Precio sin impuestos (L.)",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "taxablePrice",
		headerName: "Precio sujeto a impuestos (L. )",
		flex: 2,
		minWidth: 200,
	},
	{
		field: "status",
		headerName: "Estado",
		flex: 2,
		minWidth: 150,
	},
];

export const productCategoriesTableHead = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "name",
		headerName: "Nombre",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "status",
		headerName: "Estado",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "createdAt",
		headerName: "Creado",
		flex: 2,
		minWidth: 150,
	},
];

export const productUnitiesTableHead = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "name",
		headerName: "Nombre",
		flex: 2,
		minWidth: 150,
	},

	{
		field: "symbol",
		headerName: "Símbolo",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "createdAt",
		headerName: "Creado",
		flex: 2,
		minWidth: 150,
	},
];

export const customerTabs = [
	"Clientes",
	"Clientes Empresariales",
	"Clientes Naturales",
];

export const customerTableHead = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "firstNames",
		headerName: "Nombres",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "lastNames",
		headerName: "Apellidos",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "country",
		headerName: "País",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "city",
		headerName: "Ciudad",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "customerType",
		headerName: "Tipo de Cliente",
		flex: 2,
		minWidth: 150,
	},
];

export const businessCustomerTableHead = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "firstNames",
		headerName: "Nombres",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "lastNames",
		headerName: "Apellidos",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "country",
		headerName: "País",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "city",
		headerName: "Ciudad",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "businessName",
		headerName: "Empresa",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "hasCredit",
		headerName: "Posee Crédito",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "creditAmount",
		headerName: "Cŕedito Disponible",
		flex: 2,
		minWidth: 150,
	},
];

export const naturalCustomerTableHead = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "firstNames",
		headerName: "Nombres",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "lastNames",
		headerName: "Apellidos",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "country",
		headerName: "País",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "city",
		headerName: "Ciudad",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "rtn",
		headerName: "RTN",
		flex: 2,
		minWidth: 150,
	},
];

export const invoiceTableHead = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "cai",
		headerName: "CAI",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "rtn",
		headerName: "RTN",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "saleDate",
		headerName: "Fecha de venta",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "dueDate",
		headerName: "Fecha de vencimiento",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "creditDays",
		headerName: "Días de crédito",
		flex: 2,
		minWidth: 150,
	},
];

export const binacleTableHead = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "actionPerformedBy",
		headerName: "Usuario",
		flex: 2,
		minWidth: 130,
	},
	{
		field: "userRole",
		headerName: "Rol",
		flex: 2,
		minWidth: 130,
	},
	{
		field: "actionOn",
		headerName: "Realizado sobre",
		flex: 2,
		minWidth: 130,
	},
	{
		field: "actionDate",
		headerName: "Fecha",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "actionType",
		headerName: "Tipo de Acción",
		flex: 2,
		minWidth: 120,
	},
	{
		field: "description",
		headerName: "Descripción",
		flex: 2,
		minWidth: 150,
		maxWidth: 300,
	},
];
