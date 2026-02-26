import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFetch } from '../hooks/useFetch';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const fetchDataBackend = useFetch();

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const loadPacientes = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/listar`;
        const response = await fetchDataBackend(url, null, 'GET');
        if (response) {
            setPacientes(response);
        }
    };
    
    useEffect(() => {
        loadPacientes();
    }, []);


    const onSubmit = async (dataForm) => {
        if (editId) {
            const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/actualizar/${editId}`;
            const response = await fetchDataBackend(url, dataForm, 'PUT');
            if (response) {
                setShowModal(false);
                loadPacientes();
            }
        } else {
            const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/registro`;
            const response = await fetchDataBackend(url, dataForm, 'POST');
            if (response) {
                setShowModal(false);
                loadPacientes();
            }
        }
    };

    const handleEdit = async (paciente) => {
        setEditId(paciente._id);

        let fecha = "";
        if (paciente.fechaNacimiento) {
            fecha = paciente.fechaNacimiento.split('T')[0];
        }

        setValue('nombrePaciente', paciente.nombrePaciente);
        setValue('apellidoPaciente', paciente.apellidoPaciente);
        setValue('cedulaPaciente', paciente.cedulaPaciente);
        setValue('fechaNacimiento', fecha);
        setValue('generoPaciente', paciente.generoPaciente);
        setValue('ciudadPaciente', paciente.ciudadPaciente);
        setValue('direccionPaciente', paciente.direccionPaciente);
        setValue('telefonoPaciente', paciente.telefonoPaciente);
        setValue('emailPaciente', paciente.emailPaciente);

        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este paciente?")) {
            const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/eliminar/${id}`;
            const response = await fetchDataBackend(url, null, 'DELETE');
            if (response) {
                loadPacientes();
            }
        }
    };

    const handleOpenModal = () => {
        setEditId(null);
        reset({
            nombrePaciente: '',
            apellidoPaciente: '',
            cedulaPaciente: '',
            fechaNacimiento: '',
            generoPaciente: '',
            ciudadPaciente: '',
            direccionPaciente: '',
            telefonoPaciente: '',
            emailPaciente: ''
        });
        setShowModal(true);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Pacientes</h1>
                <button
                    onClick={handleOpenModal}
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition duration-300"
                >
                    <FaPlus /> Nuevo Paciente
                </button>
            </div>

            {/* Tabla de Pacientes */}
            <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Cédula
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Teléfono
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map((paciente) => (
                            <tr key={paciente._id} className="hover:bg-gray-50">
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap font-semibold">
                                                {paciente.nombrePaciente} {paciente.apellidoPaciente}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{paciente.cedulaPaciente}</p>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{paciente.emailPaciente}</p>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{paciente.telefonoPaciente}</p>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                    <button
                                        onClick={() => handleEdit(paciente)}
                                        className="text-blue-500 hover:text-blue-800 mx-2 transition duration-300"
                                        title="Editar"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(paciente._id)}
                                        className="text-red-500 hover:text-red-800 mx-2 transition duration-300"
                                        title="Eliminar"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {pacientes.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500">
                                    No hay pacientes registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal para Crear/Editar */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black/50">
                    <div className="relative w-full max-w-2xl mx-auto my-6">
                        {/* Contenido del Modal */}
                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Cabecera */}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {editId ? 'Editar Paciente' : 'Nuevo Paciente'}
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
                                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("nombrePaciente", { required: "Campo obligatorio" })}
                                        />
                                        {errors.nombrePaciente && <p className="text-red-500 text-xs italic mt-1">{errors.nombrePaciente.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("apellidoPaciente", { required: "Campo obligatorio" })}
                                        />
                                        {errors.apellidoPaciente && <p className="text-red-500 text-xs italic mt-1">{errors.apellidoPaciente.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Cédula</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("cedulaPaciente", { required: "Campo obligatorio" })}
                                        />
                                        {errors.cedulaPaciente && <p className="text-red-500 text-xs italic mt-1">{errors.cedulaPaciente.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                        <input
                                            type="email"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("emailPaciente", { required: "Campo obligatorio" })}
                                        />
                                        {errors.emailPaciente && <p className="text-red-500 text-xs italic mt-1">{errors.emailPaciente.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("telefonoPaciente", { required: "Campo obligatorio" })}
                                        />
                                        {errors.telefonoPaciente && <p className="text-red-500 text-xs italic mt-1">{errors.telefonoPaciente.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento</label>
                                        <input
                                            type="date"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("fechaNacimiento", { required: "Campo obligatorio" })}
                                        />
                                        {errors.fechaNacimiento && <p className="text-red-500 text-xs italic mt-1">{errors.fechaNacimiento.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Género</label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("generoPaciente", { required: "Campo obligatorio" })}
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                        {errors.generoPaciente && <p className="text-red-500 text-xs italic mt-1">{errors.generoPaciente.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Ciudad</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("ciudadPaciente", { required: "Campo obligatorio" })}
                                        />
                                        {errors.ciudadPaciente && <p className="text-red-500 text-xs italic mt-1">{errors.ciudadPaciente.message}</p>}
                                    </div>
                                    <div className="mb-2 md:col-span-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("direccionPaciente", { required: "Campo obligatorio" })}
                                        />
                                        {errors.direccionPaciente && <p className="text-red-500 text-xs italic mt-1">{errors.direccionPaciente.message}</p>}
                                    </div>
                                    {/* Footer */}
                                    <div className="flex items-center justify-end p-6 md:col-span-2 border-t border-solid border-gray-300 rounded-b mt-4">
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
                                            {editId ? 'Guardar Cambios' : 'Crear Paciente'}
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

export default Pacientes;
