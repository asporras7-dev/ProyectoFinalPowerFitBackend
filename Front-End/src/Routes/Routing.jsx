import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../Pages/Home';
import Contacto from '../Pages/Contacto';
import Login from '../Pages/Login';
import Registro from '../Pages/Registro';
import Chatbot from '../Pages/Chatbot';
import DashboardAdmin from '../Pages/DashboardAdmin';
import DashboardCliente from '../Pages/DashboardCliente';
import Testimonios from '../Pages/Testimonios';
import Ejercicios from '../Pages/Ejercicios';
import PerfilUsuario from '../Pages/PerfilUsuario';
import ProtectedRoute from '../components/ProtectedRoute';

const Routing = () => {

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ejercicios" element={<Ejercicios />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route 
                    path="/chatbot" 
                    element={
                        <ProtectedRoute>
                            <Chatbot />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <DashboardAdmin />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute allowedRoles={['client', 'cliente', 'user']}>
                            <DashboardCliente />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/comunidad" 
                    element={
                        <ProtectedRoute>
                            <Testimonios />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/perfil/:id" 
                    element={
                        <ProtectedRoute>
                            <PerfilUsuario />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    );
};

export default Routing;
