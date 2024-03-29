import React from 'react';

const ProveedoresCard = ({ proveedores }) => {
    const proveedoresRecientes = proveedores.slice(0, 5); // Obtener los cinco proveedores más recientes

    return (
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {proveedoresRecientes.map(proveedor => (
                <div
                    key={proveedor.id}
                    className="bg-white p-4 rounded-md shadow"
                >
                    <h2 className="text-xl font-semibold">{proveedor.name}</h2>
                    <p className="text-gray-600">{proveedor.email}</p>
                    <p className="text-gray-600">{proveedor.phoneNumber}</p>
                </div>
            ))}
        </div>
    );
};

export default ProveedoresCard;
