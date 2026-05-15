import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useContext(UserContext);
    const location = useLocation();

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                backgroundColor: '#171212', 
                color: 'white',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <Loader2 className="animate-spin" size={48} color="#8b0000" />
                <p>Verificando sesión...</p>
            </div>
        );
    }

    if (!user) {
        // Redirigir al login si no está autenticado, y recordar la ruta
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si tiene roles permitidos y su rol actual no está incluido
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
        // En lugar de renderizar, ejecutamos un efecto para mostrar el toast sin romper el ciclo
        setTimeout(() => toast.error('No tienes permisos para acceder a esta página'), 0);
        
        // Redirigir a una página segura según su rol principal
        if (user.rol === 'admin') {
            return <Navigate to="/admin" replace />;
        } else {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
