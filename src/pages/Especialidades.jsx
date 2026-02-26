import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFetch } from '../hooks/useFetch';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Especialidades = () => {
    const [especialidades, setEspecialidades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const fetchDataBackend = useFetch();

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const loadEspecialidades = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/especialidades/listar`;
        const response = await fetchDataBackend(url, null, 'GET');
        if (response) {
            setEspecialidades(response);
        }
    };

    useEffect(() => {
        loadEspecialidades();
    }, []);

    const onSubmit = async (dataForm) => {
        if (editId) {
            const url = `${import.meta.env.VITE_BACKEND_URL}/especialidades/actualizar/${editId}`;
            const response = await fetchDataBackend(url, dataForm, 'PUT');
            if (response) {
                setShowModal(false);
                loadEspecialidades();
            }
        } else {
            const url = `${import.meta.env.VITE_BACKEND_URL}/especialidades/registro`;
            const response = await fetchDataBackend(url, dataForm, 'POST');
            if (response) {
                setShowModal(false);
                loadEspecialidades();
            }
        }
    };

    const handleEdit = async (especialidad) => {
        setEditId(especialidad._id);

        setValue('codigoEspecialidad', especialidad.codigoEspecialidad);
        setValue('nombreEspecialidad', especialidad.nombreEspecialidad);
        setValue('descripcionEspecialidad', especialidad.descripcionEspecialidad);

        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar esta especialidad?")) {
            const url = `${import.meta.env.VITE_BACKEND_URL}/especialidades/eliminar/${id}`;
            const response = await fetchDataBackend(url, null, 'DELETE');
            if (response) {
                loadEspecialidades();
            }
        }
    };

    const handleOpenModal = () => {
        setEditId(null);
        reset({
            codigoEspecialidad: '',
            nombreEspecialidad: '',
            descripcionEspecialidad: ''
        });
        setShowModal(true);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Especialidades</h1>
                <button
                    onClick={handleOpenModal}
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition duration-300"
                >
                    <FaPlus /> Nueva Especialidad
                </button>
            </div>

            {/* Tabla de Especialidades */}
            <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Código
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Descripción
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {especialidades.map((especialidad) => (
                            <tr key={especialidad._id} className="hover:bg-gray-50">
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap font-semibold">{especialidad.codigoEspecialidad}</p>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{especialidad.nombreEspecialidad}</p>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{especialidad.descripcionEspecialidad}</p>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                    <button
                                        onClick={() => handleEdit(especialidad)}
                                        className="text-blue-500 hover:text-blue-800 mx-2 transition duration-300"
                                        title="Editar"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(especialidad._id)}
                                        className="text-red-500 hover:text-red-800 mx-2 transition duration-300"
                                        title="Eliminar"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {especialidades.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500">
                                    No hay especialidades registradas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal para Crear/Editar */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black/50">
                    <div className="relative w-full max-w-lg mx-auto my-6">
                        {/* Contenido del Modal */}
                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Cabecera */}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {editId ? 'Editar Especialidad' : 'Nueva Especialidad'}
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-gray-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-gray-800 transition duration-300"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/* Cuerpo */}
                            <div className="relative p-6 flex-auto max-h-[70vh] overflow-y-auto">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Código de Especialidad</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("codigoEspecialidad", { required: "Campo obligatorio" })}
                                        />
                                        {errors.codigoEspecialidad && <p className="text-red-500 text-xs italic mt-1">{errors.codigoEspecialidad.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre de Especialidad</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("nombreEspecialidad", { required: "Campo obligatorio" })}
                                        />
                                        {errors.nombreEspecialidad && <p className="text-red-500 text-xs italic mt-1">{errors.nombreEspecialidad.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                                        <textarea
                                            rows="3"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("descripcionEspecialidad", { required: "Campo obligatorio" })}
                                        ></textarea>
                                        {errors.descripcionEspecialidad && <p className="text-red-500 text-xs italic mt-1">{errors.descripcionEspecialidad.message}</p>}
                                    </div>
                                    {/* Footer */}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b mt-4">
                                        <button
                                            className="text-red-500 hover:bg-red-50 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cerrar
                                        </button>
                                        <button
                                            className="bg-purple-700 hover:bg-purple-800 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            {editId ? 'Guardar Cambios' : 'Crear Especialidad'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Fondo opaco cuando el modal está activo */}
            {showModal && <div className="fixed inset-0 z-40 bg-black opacity-25"></div>}
        </div>
    );
};

export default Especialidades;
