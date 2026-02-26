import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"

import { useFetch } from "../hooks/useFetch"
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const fetchDataBackend = useFetch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const registerUser = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/registro`
        const response = await fetchDataBackend(url, dataForm, "POST")
        if (response) {
            navigate('/login')
        }
    }

    return (
        <div className="relative h-screen">

            {/* Fondo en toda la pantalla (detrás) */}
            <div className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0" aria-hidden="true" />
            {/* Overlay suave para mejorar contraste (solo fondo) */}
            <div className="absolute inset-0 bg-black/30 z-0" aria-hidden="true" />

            {/* Contenedor centrado del formulario (ventana flotante opaca) */}
            <div className="flex items-center justify-center h-full">
                <div className="md:w-4/5 sm:w-full max-w-md rounded-xl shadow-lg p-8 relative z-10" style={{ backgroundColor: 'var(--color-base)' }}>

                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase">Bienvenido</h1>
                    <small className="block my-4 text-sm" style={{ color: 'var(--color-secondary)' }}>Por favor ingresa tus datos</small>

                    <form onSubmit={handleSubmit(registerUser)}>

                        {/* Campo para nombre */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Nombre</label>
                            <input type="text" placeholder="Ingresa tu nombre" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                {...register("nombreUsuario", { required: "Campo obligatorio" })}
                            />
                            {errors.nombreUsuario && <p className="text-red-800 text-xs">{errors.nombreUsuario.message}</p>}
                        </div>

                        {/* Campo para apellido */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Apellido</label>
                            <input type="text" placeholder="Ingresa tu apellido" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                {...register("apellidoUsuario", { required: "Campo obligatorio" })}
                            />
                            {errors.apellidoUsuario && <p className="text-red-800 text-xs">{errors.apellidoUsuario.message}</p>}
                        </div>

                        {/* Campo para correo electrónico */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                            <input type="email" placeholder="Ingresa tu correo electrónico" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                {...register("emailUsuario", { required: "Campo obligatorio" })}
                            />
                            {errors.emailUsuario && <p className="text-red-800 text-xs">{errors.emailUsuario.message}</p>}
                        </div>

                        {/* Campo para contraseña */}
                        <div className="mb-3 relative">
                            <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ingresa tu contraseña"
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500 pr-10"
                                    {...register("passwordUsuario", { required: "Campo obligatorio" })}
                                />
                                {errors.passwordUsuario && <p className="text-red-800 text-xs">{errors.passwordUsuario.message}</p>}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
                                >
                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                        </div>

                        {/* Botón para enviar el formulario */}
                        <div className="mb-3">
                            <button className="border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>Registrarse</button>
                        </div>

                    </form>

                    {/* Enlace para iniciar sesión si ya tiene una cuenta */}
                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p style={{ color: 'var(--color-secondary)' }}>¿Ya tienes una cuenta?</p>
                        <Link to="/login" className="py-2 px-5 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900" style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>Iniciar sesión</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};