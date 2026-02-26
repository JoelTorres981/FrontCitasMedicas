import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFetch } from '../hooks/useFetch';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Citas = () => {
    const [citas, setCitas] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const fetchDataBackend = useFetch();

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const loadCitas = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/citas/listar`;
        const response = await fetchDataBackend(url, null, 'GET');
        if (response) {
            setCitas(response);
        }
    };

    const loadOptions = async () => {
        const urlPacientes = `${import.meta.env.VITE_BACKEND_URL}/pacientes/listar`;
        const resPacientes = await fetchDataBackend(urlPacientes, null, 'GET');
        if (resPacientes) setPacientes(resPacientes);

        const urlEspecialidades = `${import.meta.env.VITE_BACKEND_URL}/especialidades/listar`;
        const resEspecialidades = await fetchDataBackend(urlEspecialidades, null, 'GET');
        if (resEspecialidades) setEspecialidades(resEspecialidades);
    };

    useEffect(() => {
        loadCitas();
        loadOptions();
    }, []);

    const onSubmit = async (dataForm) => {
        if (editId) {
            const url = `${import.meta.env.VITE_BACKEND_URL}/citas/actualizar/${editId}`;
            const response = await fetchDataBackend(url, dataForm, 'PUT');
            if (response) {
                setShowModal(false);
                loadCitas();
            }
        } else {
            const url = `${import.meta.env.VITE_BACKEND_URL}/citas/registro`;
            const response = await fetchDataBackend(url, dataForm, 'POST');
            if (response) {
                setShowModal(false);
                loadCitas();
            }
        }
    };

    const handleEdit = async (cita) => {
        setEditId(cita._id);

        setValue('codigoCita', cita.codigoCita);
        setValue('descripcionCita', cita.descripcionCita);
        setValue('paciente', cita.paciente?._id || cita.paciente);
        setValue('especialidad', cita.especialidad?._id || cita.especialidad);

        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar esta cita?")) {
            const url = `${import.meta.env.VITE_BACKEND_URL}/citas/eliminar/${id}`;
            const response = await fetchDataBackend(url, null, 'DELETE');
            if (response) {
                loadCitas();
            }
        }
    };

    const handleOpenModal = () => {
        setEditId(null);
        reset({
            codigoCita: '',
            descripcionCita: '',
            paciente: '',
            especialidad: ''
        });
        setShowModal(true);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Citas</h1>
                <button
                    onClick={handleOpenModal}
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition duration-300"
                >
                    <FaPlus /> Nueva Cita
                </button>
            </div>

            {/* Tabla de Citas */}
            <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Código
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Descripción
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Paciente
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Especialidad
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita) => (
                            <tr key={cita._id} className="hover:bg-gray-50">
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap font-semibold">{cita.codigoCita}</p>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{cita.descripcionCita}</p>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {cita.paciente?.nombrePaciente} {cita.paciente?.apellidoPaciente}
                                    </p>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {cita.especialidad?.nombreEspecialidad}
                                    </p>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                    <button
                                        onClick={() => handleEdit(cita)}
                                        className="text-blue-500 hover:text-blue-800 mx-2 transition duration-300"
                                        title="Editar"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cita._id)}
                                        className="text-red-500 hover:text-red-800 mx-2 transition duration-300"
                                        title="Eliminar"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {citas.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500">
                                    No hay citas registradas.
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
                        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {editId ? 'Editar Cita' : 'Nueva Cita'}
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
                            <div className="relative p-6 flex-auto max-h-[70vh] overflow-y-auto">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Código de Cita</label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("codigoCita", { required: "Campo obligatorio" })}
                                        />
                                        {errors.codigoCita && <p className="text-red-500 text-xs italic mt-1">{errors.codigoCita.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                                        <textarea
                                            rows="3"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("descripcionCita", { required: "Campo obligatorio" })}
                                        ></textarea>
                                        {errors.descripcionCita && <p className="text-red-500 text-xs italic mt-1">{errors.descripcionCita.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Paciente</label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("paciente", { required: "Campo obligatorio" })}
                                        >
                                            <option value="">Seleccione un paciente</option>
                                            {pacientes.map((p) => (
                                                <option key={p._id} value={p._id}>{p.nombrePaciente} {p.apellidoPaciente}</option>
                                            ))}
                                        </select>
                                        {errors.paciente && <p className="text-red-500 text-xs italic mt-1">{errors.paciente.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Especialidad</label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-purple-700 focus:border-purple-700"
                                            {...register("especialidad", { required: "Campo obligatorio" })}
                                        >
                                            <option value="">Seleccione una especialidad</option>
                                            {especialidades.map((e) => (
                                                <option key={e._id} value={e._id}>{e.nombreEspecialidad}</option>
                                            ))}
                                        </select>
                                        {errors.especialidad && <p className="text-red-500 text-xs italic mt-1">{errors.especialidad.message}</p>}
                                    </div>
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
                                            {editId ? 'Guardar Cambios' : 'Crear Cita'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="fixed inset-0 z-40 bg-black opacity-25"></div>}
        </div>
    );
};

export default Citas;
