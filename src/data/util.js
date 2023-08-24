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
	Bolt,
	ManageAccounts,
} from "@mui/icons-material";

export const items = [
	// Para usuarios

	{
		Icon: Home,
		Title: "Dashboard",
		path: "dashboard",
		role: [
			"Superadministrador",
			"Administrador",
			"Vendedor",
			"Cajero",
			"Registrador",
			"Cotizador",
		],
	},
	{
		Icon: Person,
		Title: "Clientes",
		path: "clientes",
		role: [
			"Administrador",
			"Vendedor",
			"Cajero",
			"Registrador",
			"Cotizador",
		],
	},
	{
		Icon: Inventory,
		Title: "Inventario",
		path: "productos",
		role: [
			"Administrador",
			"Vendedor",
			"Cajero",
			"Registrador",
			"Cotizador",
		],
	},

	
	{
		Icon: PointOfSale,
		Title: "Ventas",
		path: "ventas",
		role: [
			"Administrador",
			"Vendedor",
			"Cajero",
			"Registrador",
			"Cotizador",
		],
	},

	// Para Superadministradores
	{
		Icon: Person,
		Title: "Usuarios",
		path: "usuarios",
		role: ["Superadministrador"],
	},
	{
		Icon: Bolt,
		Title: "Licencia",
		path: "licencia",
		role: ["Superadministrador"],
	},

	// Para Administradores y Superadministradores
	{
		Icon: FormatListNumberedRtlOutlined,
		Title: "Bitácora",
		path: "bitacora",
		role: ["Administrador", "Superadministrador"],
	},


	// Iconos a renderizarse de último
	// {
	// 	Icon: Settings,
	// 	Title: "Configuración",
	// 	path: "configuracion",
	// 	role: [
	// 		"Administrador",
	// 		"Vendedor",
	// 		"Cajero",
	// 		"Registrador",
	// 		"Cotizador",
	// 	],
	// },
	{
		Icon: ManageAccounts,
		Title: "Gestión de Usuarios",
		path: "gestionUsuarios",
		role: ["Superadministrador", "Administrador"],
	},
	{
		Icon: Receipt,
		Title: "Facturas",
		path: "facturas",
		role: [
			"Administrador",
			"Vendedor",
			"Cajero",
			"Registrador",
			"Cotizador",
		],
	},
	{
		Icon: AddCard,
		Title: "Compras",
		path: "compras",
		role: [
			"Administrador",
			"Vendedor",
			"Cajero",
			"Registrador",
			"Cotizador",
		],
	},
	{
		Icon: LocalShipping,
		Title: "Proveedores",
		path: "proveedores",
		role: [
			"Administrador",
			"Vendedor",
			"Cajero",
			"Registrador",
			"Cotizador",
		],
	},
	
	{
		Icon: Logout,
		Title: "Cerrar Sesión",
		className: "justify-self-end absolute bottom-0",
		role: [
			"Superadministrador",
			"Administrador",
			"Vendedor",
			"Cajero",
			"Registrador",
			"Cotizador",
		],
		closeSession: true,
	},
];

export const dashBoardItems = [
	{
		title: "Ventas de hoy",
		subTitle: "L. 34.54",
		icon: Wallet,
	},
	{
		title: "Usuarios registrados",

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
		flex: 3,
		minWidth: 250,
		maxWidth: 300,
	},
];

export const licenseTableHead = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "licenseStartDate",
		headerName: "Inicio Licencia",
		flex: 2,
		minWidth: 130,
	},
	{
		field: "licenseDueDate",
		headerName: "Vencimiento Licencia",
		flex: 2,
		minWidth: 130,
	},
	{
		field: "remainingDays",
		headerName: "Días restantes de Licencia",
		flex: 2,
		minWidth: 130,
	},
	{
		field: "licenseStatus",
		headerName: "Estado de Licencia",
		flex: 2,
		minWidth: 130,
	},
];

export const salesTableHead = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "fullName",
		headerName: "Cliente",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "username",
		headerName: "Vendedor",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "purchaseOrderDate",
		headerName: "Fecha de Orden de Compra",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "total",
		headerName: "Total",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "status",
		headerName: "Estado",
		flex: 2,
		minWidth: 150,
	},
];

export const userManagementDataTabs = [
	"Usuarios",
	"Superadministradores",
	"Administradores",
	"Vendedores",
	"Cajeros",
	"Registradores",
	"Cotizadores",
];

export const userTableHead = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		minWidth: 80,
	},
	{
		field: "username",
		headerName: "Nombre de Usuario",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "email",
		headerName: "Correo Electrónico",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "userRole",
		headerName: "Rol",
		flex: 2,
		minWidth: 150,
	},
	{
		field: "userStatus",
		headerName: "Estado",
		flex: 2,
		minWidth: 150,
	},
];

// id: product.id,
// productCode: product.productCode,
// name: product.name,
// description: product.description,
// salePrice: parseInt(product.salePrice),

// idProductFK: productSelected.id,
// productCode: productSelected.productCode,
// name: productSelected.name,
// pricePerUnit: productSelected.salePrice,
// productQuantity: orderQuantity,
// totalPerProduct: totalPerProduct,

export const salesProductsTableHead = [
	{
		field: "id",
		headerName: "ID",
		flex: 1,
		minWidth: 80,
		editable: false,
	},
	{
		field: "productCode",
		headerName: "Código de Producto",
		flex: 2,
		minWidth: 150,
		editable: false,
	},
	{
		field: "name",
		headerName: "Producto",
		flex: 2,
		minWidth: 150,
		editable: false,
	},
	{
		field: "description",
		headerName: "Descripción",
		flex: 2,
		minWidth: 150,
		editable: false,
	},
	{
		field: "quantityInStock",
		headerName: "Cantidad Disponible",
		flex: 2,
		minWidth: 150,
		editable: false,
	},
	{
		field: "salePrice",
		headerName: "Precio de Venta",
		flex: 2,
		minWidth: 150,
		editable: false,
	},
	{
		field: "productQuantity",
		headerName: "Cantidad de Productos",
		flex: 2,
		minWidth: 150,
		editable: true,
	},
	{
		field: "totalPerProduct",
		headerName: "Total",
		flex: 2,
		minWidth: 150,
		editable: false,
		valueGetter: (params) =>
			`${
				parseInt(params.row.productQuantity) <=
				parseInt(params.row.quantityInStock)
					? parseInt(params.row.productQuantity) *
					  parseFloat(params.row.salePrice)
					: isNaN(parseInt(params.row.productQuantity))
					? "No Válido"
					: "Inventario Insuficiente"
			}`,
	},
];
