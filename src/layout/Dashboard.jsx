import { Link, Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaUsers, FaStethoscope, FaRegCalendarAlt } from "react-icons/fa";
import storeAuth from '../context/storeAuth'

const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const { clearToken, nombre, apellido } = storeAuth()
    const [expanded, setExpanded] = useState(false)
    return (
        <div className='md:flex md:min-h-screen'>

            <div className={`bg-primary/80 px-5 py-4 transition-all duration-300 md:h-screen md:sticky md:top-0 md:overflow-y-auto ${expanded ? 'md:w-64' : 'md:w-20'} w-full`}>

                <div className="flex flex-col items-center justify-center mt-6 mb-2">
                    <h2
                        onClick={() => setExpanded(!expanded)}
                        title="Click to toggle menu"
                        className={`cursor-pointer font-jaldi font-bold text-center text-base transition-all duration-300 select-none hover:text-gray-200 ${expanded ? 'text-4xl' : 'text-2xl'}`}
                    >
                        {expanded ? 'Citas Médicas' : 'CM'}
                    </h2>
                </div>

                <div className={`transition-all duration-300 overflow-hidden ${expanded ? 'opacity-100 max-h-20' : 'md:opacity-0 md:max-h-0'}`}>
                    <p className='text-slate-800 text-center my-4 text-sm whitespace-nowrap'> <span className='bg-green-600 w-3 h-3 inline-block rounded-full'></span> Bienvenido </p>
                </div>

                <hr className="mt-5 border-base" />

                {/* Paneles de navegación */}
                <ul className="mt-5 space-y-2">

                    <li className="text-center">
                        <Link to='/dashboard/pacientes' className={`${urlActual === '/dashboard/pacientes' ? 'text-slate-900 bg-secondary' : 'text-slate-600'} text-lg mt-2 hover:text-slate-600 flex items-center gap-3 px-2 py-2 rounded-md ${!expanded && 'md:justify-center'}`}>
                            <FaUsers className="text-2xl" />
                            <span className={`whitespace-nowrap duration-200 ${!expanded && 'md:hidden'}`}>Pacientes</span>
                        </Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/especialidades' className={`${urlActual === '/dashboard/especialidades' ? 'text-slate-900 bg-secondary' : 'text-slate-600'} text-lg mt-2 hover:text-slate-600 flex items-center gap-3 px-2 py-2 rounded-md ${!expanded && 'md:justify-center'}`}>
                            <FaStethoscope className="text-2xl" />
                            <span className={`whitespace-nowrap duration-200 ${!expanded && 'md:hidden'}`}>Especialidades</span>
                        </Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/citas' className={`${urlActual === '/dashboard/citas' ? 'text-slate-900 bg-secondary' : 'text-slate-600'} text-lg mt-2 hover:text-slate-600 flex items-center gap-3 px-2 py-2 rounded-md ${!expanded && 'md:justify-center'}`}>
                            <FaRegCalendarAlt className="text-2xl" />
                            <span className={`whitespace-nowrap duration-200 ${!expanded && 'md:hidden'}`}>Citas</span>
                        </Link>
                    </li>

                </ul>

            </div>

            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
                <div className='bg-primary/80 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div className='text-md font-semibold text-slate-100'>
                        Usuario - {nombre} {apellido}
                    </div>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="border-2 border-base rounded-full" width={50} height={50} />
                    </div>
                    <div>
                        <Link to='/' className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                        bg-red-800 px-4 py-1 rounded-lg" onClick={() => clearToken()}>Salir</Link>
                    </div>
                </div>
                <div className='overflow-y-scroll p-8'>
                    <Outlet />
                </div>
                <div className='bg-primary/80 h-12'>
                    <p className='text-center  text-slate-100 leading-[2.9rem]'>© 2026 <snap className='font-bold'> All rights reserved.</snap> </p>
                </div>

            </div>



        </div >
    )
}

export default Dashboard