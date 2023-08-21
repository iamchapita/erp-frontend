import React from "react";
import logo from '../../../img/logoGrande.png'
function Footer() {
    return (
        <>
            <div className=" bg-linear-pink-invert pb-12">
                <div className="mx-auto container flex flex-col items-center justify-center">
                    <div>
<img src={logo} alt="logo" className="w-40" />
                    </div>
                    <div className="text-black flex flex-col md:items-center f-f-l pt-3">
                        <h1 className="text-2xl font-black">Almacena. Gestiona. Crece</h1>
                        <div className="md:flex items-center mt-5 md:mt-10 text-base text-color f-f-l">
                            <h2 className=" md:mr-6 pb-4 md:py-0 cursor-pointer">Instalar Ahora</h2>

                        </div>
                        <div className="my-6 text-base text-color f-f-l">
                            <ul className="md:flex items-center">
                                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">Acerca de Nosotros</li>
                                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">Novedades</li>
                                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">Precios</li>
                                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">Empleos</li>
                                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">Ayuda</li>
                                <li className="cursor-pointer pt-4 lg:py-0">Politicas de privacidad</li>
                            </ul>
                        </div>
                        <div className="text-sm text-color mb-10 f-f-l">
                            <p> © 2023 Syncpro. Todos los derechos reservados</p>
                        </div>
                    </div>
                    <div className="w-9/12  h-0.5 bg-gray-100 rounded-full" />
                </div>
            </div>
        </>
    );
}

export default Footer;
