import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { updateUser } from '../services/userService';
import SubirImagen from './SubirImagen';
import { Upload, Check, Edit2, X, User as UserIcon, Mail, Shield } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminSettings = () => {
    const { user, refreshUser } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        nombre: user?.nombre || '',
        email: user?.email || '',
    });

    const handleCloudinaryUpload = async (imageUrl) => {
        try {
            const updated = await updateUser(user.id, { ...user, avatar: imageUrl });
            refreshUser(updated);
            Swal.fire({
                icon: 'success',
                title: '¡Foto actualizada!',
                text: 'Tu foto de perfil de administrador se guardó correctamente.',
                background: '#0f0f0f',
                color: '#fff',
                confirmButtonColor: '#e11d48',
                timer: 2000,
                showConfirmButton: false
            });
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar la foto.',
                background: '#0f0f0f',
                color: '#fff',
                confirmButtonColor: '#e11d48'
            });
        }
    };

    const handleUpdateAdmin = async (e) => {
        e.preventDefault();
        try {
            const updated = await updateUser(user.id, { ...user, ...editForm });
            refreshUser(updated);
            setIsEditing(false);
            Swal.fire({
                icon: 'success',
                title: '¡Perfil Actualizado!',
                text: 'Tus datos de administrador han sido actualizados.',
                background: '#0f0f0f',
                color: '#fff',
                confirmButtonColor: '#e11d48'
            });
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron actualizar los datos.',
                background: '#0f0f0f',
                color: '#fff',
                confirmButtonColor: '#e11d48'
            });
        }
    };

    return (
        <div className="admin-settings-view animate-fade-in">
            <div className="dashboard-header">
                <h1>Ajustes de Perfil</h1>
                <p>Gestiona tu información de administrador y apariencia.</p>
            </div>

            <div className="settings-card shadow-premium" style={{ backgroundColor: '#171212', borderRadius: '15px', padding: '2rem', marginTop: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="settings-header-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div className="header-text">
                        <h2 style={{ margin: 0, color: 'white' }}>Mi Cuenta Admin</h2>
                    </div>
                    <button
                        className={`btn-toggle-edit ${isEditing ? 'editing' : ''}`}
                        onClick={() => setIsEditing(!isEditing)}
                        style={{ background: isEditing ? '#333' : '#e11d48', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        {isEditing ? <X size={20} /> : <Edit2 size={20} />}
                    </button>
                </div>

                <div className="avatar-edit-section" style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
                    <div className="avatar-preview-container" style={{ position: 'relative', width: '120px', height: '120px' }}>
                        <img
                            src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.id}`}
                            alt="Admin Avatar"
                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #e11d48' }}
                        />
                        <div className="avatar-overlay" style={{ position: 'absolute', bottom: '0', right: '0' }}>
                            <SubirImagen onImageUpload={handleCloudinaryUpload}>
                                <label style={{ 
                                    cursor: 'pointer', 
                                    backgroundColor: '#e11d48', 
                                    width: '36px', 
                                    height: '36px', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: 'white',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                                }}>
                                    <Upload size={18} />
                                </label>
                            </SubirImagen>
                        </div>
                    </div>
                    <div className="avatar-tips">
                        <h3 style={{ margin: '0 0 8px 0', color: 'white' }}>Foto de Perfil</h3>
                        <p style={{ margin: 0, color: '#a0a0a0', fontSize: '0.9rem' }}>Sube una imagen para identificarte en el panel administrativo.</p>
                    </div>
                </div>

                <form className="settings-dynamic-form" onSubmit={handleUpdateAdmin}>
                    <div className="form-settings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>Nombre Completo</label>
                            <div style={{ position: 'relative' }}>
                                <UserIcon size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                                <input
                                    type="text"
                                    readOnly={!isEditing}
                                    value={editForm.nombre}
                                    onChange={e => setEditForm({ ...editForm, nombre: e.target.value })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px 12px 12px 40px', 
                                        backgroundColor: isEditing ? '#222' : '#1a1a1a', 
                                        border: '1px solid #333', 
                                        borderRadius: '8px', 
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>Correo Electrónico</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                                <input
                                    type="email"
                                    readOnly={!isEditing}
                                    value={editForm.email}
                                    onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px 12px 12px 40px', 
                                        backgroundColor: isEditing ? '#222' : '#1a1a1a', 
                                        border: '1px solid #333', 
                                        borderRadius: '8px', 
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>Rol de Sistema</label>
                            <div style={{ position: 'relative' }}>
                                <Shield size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#e11d48' }} />
                                <input
                                    type="text"
                                    readOnly
                                    value="Administrador Maestro"
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px 12px 12px 40px', 
                                        backgroundColor: '#1a1a1a', 
                                        border: '1px solid #333', 
                                        borderRadius: '8px', 
                                        color: '#e11d48',
                                        fontWeight: 'bold',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {isEditing && (
                        <button type="submit" className="btn-save-premium" style={{ background: '#e11d48', border: 'none', color: 'white', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                            <Check size={18} /> Guardar Cambios
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AdminSettings;
