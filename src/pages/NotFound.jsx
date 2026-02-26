import { Link } from 'react-router';

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">

            <div className="flex flex-col items-center justify-center text-center mt-12">
                <p className="text-3xl md:text-4xl lg:text-5xl" style={{ color: 'var(--color-primary)' }}>Página no encontrada</p>
                <p className="md:text-lg lg:text-xl mt-8" style={{ color: 'var(--color-secondary)' }}>Lo sentimos mucho</p>
                <Link to="/" className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
                    style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>
                    Regresar
                </Link>
            </div>
        </div>
    );
};
