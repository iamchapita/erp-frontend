import React, { useState } from "react";
import logo from '../../../img/favicon.ico'
import {Link} from "react-router-dom";
import {login} from "../../../actions/auth.actions";
function HeroSec() {
    const [show, setShow] = useState(false);
    return (
        <div className="bg-gray-100 pb-12 overflow-y-hidden" style={{ minHeight: 700 }}>
            {/* Code block starts */}

                <nav className="w-full border-b">
                    <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
                        <div aria-label="Home. logo" role="img">
                            <img className="h-36 md:w-auto" src={logo} alt="logo" />
                        </div>
                        <div>
                            <button onClick={() => setShow(!show)} className={`${show ? 'hidden' : ''} sm:block md:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500`}>
                                <svg aria-haspopup="true" aria-label="open Main Menu" xmlns="http://www.w3.org/2000/svg" className="md:hidden icon icon-tabler icon-tabler-menu" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={4} y1={8} x2={20} y2={8} />
                                    <line x1={4} y1={16} x2={20} y2={16} />
                                </svg>
                            </button>
                            <div id="menu" className={` ${show ? '' : 'hidden'} md:block lg:block `}>
                                <button onClick={() => setShow(!show)} className={`block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 top-0 mt-6`}>
                                    <svg aria-label="close main menu" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={18} y1={6} x2={6} y2={18} />
                                        <line x1={6} y1={6} x2={18} y2={18} />
                                    </svg>
                                </button>

                            </div>
                        </div>
                        <Link to={'/login'} className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-custom-300 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-custom-300 text-custom-300 px-4 sm:px-8 py-1 sm:py-3 text-sm">Iniciar Sesión</Link>
                    </div>
                </nav>
                <div className="bg-gray-100">
                    <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
                        <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
                                La Libertad Para Gestionar Tu
                                <span className="text-custom-300"> Empresa </span>
                                De La Mejor Manera
                            </h1>
                            <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
                                Syncpro es un sistema de gestión empresarial que te permite administrar tu negocio de manera eficiente y segura.
                            </p>
                        </div>
                        <div className="flex justify-center items-center">
                            <Link to={"/login"} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-300 bg-custom-300 transition duration-150 ease-in-out hover:bg-custom-250 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-custom-300 py-2 sm:py-4 text-sm">Comenzar</Link>
                            <Link to={"/register"} className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-300 bg-transparent transition duration-150 ease-in-out hover:border-custom-250 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-custom-300 text-custom-300 px-4 sm:px-10 py-2 sm:py-4 text-sm">Registrarse</Link>
                        </div>
                    </div>
                </div>


            {/* Code block ends */}
        </div>

    );
}

export default HeroSec;
