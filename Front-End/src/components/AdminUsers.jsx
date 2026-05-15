import React, { useState, useEffect } from 'react';
import { getPaginatedUsers, deleteUser, updateUser } from '../Services/userService';
import { Trash2, UserPlus, AlertTriangle, X, Edit2, Save, Eye, Activity, ClipboardList, Target, Calendar, User as UserIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: '',
    email: '',
    rol: '',
    edad: ''
  });
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailUser, setDetailUser] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  const loadUsers = async (page) => {
    try {
      setLoading(true);
      const res = await getPaginatedUsers(page, 5); // 5 users per page
      setUsers(res.data);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Error loading users", error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los usuarios. Verifica la conexión con el servidor.',
        icon: 'error',
        background: '#171212',
        color: '#fff',
        confirmButtonColor: '#8b0000'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: '¿Eliminar Usuario?',
      text: "Esta acción es irreversible y el usuario perderá el acceso permanentemente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b0000',
      cancelButtonColor: '#333',
      confirmButtonText: 'Sí, Eliminar',
      cancelButtonText: 'Cancelar',
      background: '#171212',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmDeleteUser(userId);
      }
    });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      nombre: user.nombre || '',
      email: user.email || '',
      rol: user.rol || 'cliente',
      edad: user.edad || ''
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Client-side validation
    if (editForm.nombre.trim().length < 3) {
      return Swal.fire({ title: 'Error de validación', text: 'El nombre debe tener al menos 3 caracteres.', icon: 'warning', background: '#171212', color: '#fff' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      return Swal.fire({ title: 'Error de validación', text: 'El formato del email es incorrecto.', icon: 'warning', background: '#171212', color: '#fff' });
    }
    if (editForm.edad < 14 || editForm.edad > 100) {
      return Swal.fire({ title: 'Error de validación', text: 'La edad debe estar entre 14 y 100 años.', icon: 'warning', background: '#171212', color: '#fff' });
    }

    try {
      setProcessing(true);
      const updated = await updateUser(selectedUser.id, editForm);
      // Optimistic Update
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...editForm } : u));
      setIsEditModalOpen(false);
      setSelectedUser(null);
      
      Swal.fire({
        title: '¡Actualizado!',
        text: 'Los datos del usuario han sido guardados.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#171212',
        color: '#fff'
      });
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el usuario.',
        icon: 'error',
        background: '#171212',
        color: '#fff',
        confirmButtonColor: '#8b0000'
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleOpenDetail = (user) => {
    setDetailUser(user);
    setIsDetailModalOpen(true);
  };

  const calculateWeightLost = (user) => {
    if (!user.peso || !user.pesoActual) return 0;
    const inicio = parseFloat(user.peso);
    const actual = parseFloat(user.pesoActual);
    return (inicio - actual).toFixed(1);
  };

  const confirmDeleteUser = async (userId) => {
    try {
      setProcessing(true);
      await deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
      
      Swal.fire({
        title: 'Eliminado',
        text: 'El usuario ha sido removido del sistema.',
        icon: 'success',
        background: '#171212',
        color: '#fff',
        confirmButtonColor: '#8b0000'
      });
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el usuario.',
        icon: 'error',
        background: '#171212',
        color: '#fff',
        confirmButtonColor: '#8b0000'
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="admin-panel animate-fade-in">
      <div className="dashboard-header">
        <h1>Gestión de Usuarios</h1>
        <p>Administra los usuarios registrados en la plataforma</p>
      </div>

      <div className="panel-header">
        <h2>Lista de Usuarios</h2>
        <button className="btn-primary" onClick={() => window.location.href = '/registro'}>
          <UserPlus size={18} />
          Agregar Usuario
        </button>
      </div>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Edad</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>{user.edad}</td>
                  <td>
                    <span className={`badge ${user.rol}`}>
                      {user.rol === 'admin' ? 'Administrador' : 'Cliente'}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button
                        className="btn-action edit"
                        onClick={() => handleEdit(user)}
                        title="Editar usuario"
                      >
                        <Edit2 size={18} />
                      </button>
                      {user.rol !== 'admin' && (
                        <button
                          className="btn-view-progress"
                          onClick={() => handleOpenDetail(user)}
                        >
                          Ver progreso del usuario
                        </button>
                      )}
                      <button
                        className="btn-action delete"
                        onClick={() => handleDelete(user.id)}
                        title="Eliminar usuario"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
            <button 
              className="btn-secondary" 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={18} /> Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button 
              className="btn-secondary" 
              disabled={currentPage === totalPages || totalPages === 0} 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Siguiente <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Modal de edición de usuario */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in" style={{ maxWidth: '650px', width: '90%', textAlign: 'left' }}>
            <div className="modal-header">
              <h2>Editar Usuario</h2>
              <button className="btn-close" onClick={() => setIsEditModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdateUser} className="story-form">
              <div className="form-group">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  value={editForm.nombre}
                  onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Edad</label>
                  <input
                    type="number"
                    value={editForm.edad}
                    onChange={(e) => setEditForm({ ...editForm, edad: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Rol</label>
                  <select
                    value={editForm.rol}
                    onChange={(e) => setEditForm({ ...editForm, rol: e.target.value })}
                    required
                  >
                    <option value="cliente">Cliente</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
                <button type="button" className="btn-cancel" onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-submit" disabled={processing}>
                  {processing ? (
                    'Guardando...'
                  ) : (
                    <>
                      <Save size={18} />
                      Guardar Cambios
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de detalles de progreso y perfil */}
      {isDetailModalOpen && detailUser && (
        <div className="modal-overlay">
          <div className="modal-content admin-detail-modal animate-fade-in" style={{ maxWidth: '800px', width: '95%', textAlign: 'left' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div className="detail-avatar">
                  <img src={detailUser.avatar || `https://i.pravatar.cc/150?u=${detailUser.id}`} alt={detailUser.nombre} />
                </div>
                <div>
                  <h2 style={{ margin: 0 }}>{detailUser.nombre}</h2>
                  <p style={{ margin: 0, color: '#a0a0a0', fontSize: '0.9rem' }}>{detailUser.email}</p>
                </div>
              </div>
              <button className="btn-close" onClick={() => setIsDetailModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="admin-detail-body">
              <div className="admin-detail-grid">
                {/* Columna 1: Información Física */}
                <div className="detail-section">
                  <h3><UserIcon size={20} color="#ff4d4d" /> Información Física</h3>
                  <div className="detail-info-list">
                    <div className="detail-item">
                      <span>Edad:</span> <strong>{detailUser.edad} años</strong>
                    </div>
                    <div className="detail-item">
                      <span>Estatura:</span> <strong>{detailUser.altura} cm</strong>
                    </div>
                    <div className="detail-item">
                      <span>Sexo:</span> <strong>{detailUser.sexo === 'm' ? 'Masculino' : 'Femenino'}</strong>
                    </div>
                    <div className="detail-item">
                      <span>Alergias:</span> <strong style={{ color: (detailUser.alergias?.toLowerCase() === 'no' || detailUser.alergias?.toLowerCase() === 'ninguna' ? '#4ade80' : '#ff4d4d') }}>{detailUser.alergias || 'Ninguna'}</strong>
                    </div>
                  </div>
                </div>

                {/* Columna 2: Plan y Meta */}
                <div className="detail-section">
                  <h3><Target size={20} color="#ff4d4d" /> Plan y Objetivos</h3>
                  <div className="detail-info-list">
                    <div className="detail-item">
                      <span>Peso Inicial:</span> <strong>{detailUser.peso} kg</strong>
                    </div>
                    <div className="detail-item">
                      <span>Peso Meta:</span> <strong>{detailUser.pesoMeta} kg</strong>
                    </div>
                    <div className="detail-item">
                      <span>Plazo Semanas:</span> <strong>{detailUser.plazoSemanas} semanas</strong>
                    </div>
                  </div>
                </div>

                {/* Columna 3: Progreso Actual */}
                <div className="detail-section full-width">
                  <h3><Activity size={20} color="#ff4d4d" /> Avance del Programa</h3>
                  <div className="progress-highlights">
                    <div className="highlight-card maroon">
                      <span className="label">Peso Actual</span>
                      <span className="value">{detailUser.pesoActual || detailUser.peso} kg</span>
                    </div>
                    <div className="highlight-card dark">
                      <span className="label">Peso Perdido</span>
                      <span className="value">{calculateWeightLost(detailUser)} kg</span>
                    </div>
                    <div className="highlight-card dark">
                      <span className="label">Semana de Progreso</span>
                      <span className="value">{detailUser.semanasEnProgreso || 0} / {detailUser.plazoSemanas}</span>
                    </div>
                  </div>
                </div>

                {/* Columna 4: Feedback Reciente */}
                <div className="detail-section full-width feedback-section">
                  <h3><ClipboardList size={20} color="#ff4d4d" /> Último Feedback del Cliente</h3>
                  <div className="feedback-grid-admin">
                    <div className="feedback-box">
                      <label>Sobre la Dieta:</label>
                      <p>{detailUser.ultimoFeedbackDieta || "Sin feedback registrado aún."}</p>
                    </div>
                    <div className="feedback-box">
                      <label>Sobre el Ejercicio:</label>
                      <p>{detailUser.ultimoFeedbackEjercicio || "Sin feedback registrado aún."}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions" style={{ marginTop: '1.5rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
              <button type="button" className="btn-cancel" onClick={() => setIsDetailModalOpen(false)}>Cerrar Detalles</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
