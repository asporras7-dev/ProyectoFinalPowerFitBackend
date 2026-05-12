import React, { useState, useEffect } from 'react';
import { getAllRoutines, updateRoutineStatus, deleteRoutine } from '../services/routineService';
import { Check, X, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminRoutines = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    try {
      setLoading(true);
      const data = await getAllRoutines();
      setRoutines(data);
    } catch (error) {
      console.error("Error loading routines", error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar las rutinas.',
        icon: 'error',
        background: '#171212',
        color: '#fff',
        confirmButtonColor: '#8b0000'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (routineId, newStatus) => {
    try {
      setProcessing(true);
      const updated = await updateRoutineStatus(routineId, newStatus);
      setRoutines(routines.map(r => r.id === routineId ? updated : r));
      
      Swal.fire({
        title: 'Estado Actualizado',
        text: `La rutina ha sido ${newStatus === 'approved' ? 'aprobada' : 'rechazada'}.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#171212',
        color: '#fff'
      });
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el estado de la rutina.',
        icon: 'error',
        background: '#171212',
        color: '#fff',
        confirmButtonColor: '#8b0000'
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (routineId) => {
    Swal.fire({
      title: '¿Eliminar Rutina?',
      text: "Esta acción borrará la rutina de forma permanente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b0000',
      cancelButtonColor: '#333',
      confirmButtonText: 'Sí, Eliminar',
      cancelButtonText: 'Cancelar',
      background: '#171212',
      color: '#fff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setProcessing(true);
          await deleteRoutine(routineId);
          setRoutines(routines.filter(r => r.id !== routineId));
          
          Swal.fire({
            title: 'Eliminado',
            text: 'La rutina ha sido removida.',
            icon: 'success',
            background: '#171212',
            color: '#fff',
            confirmButtonColor: '#8b0000'
          });
        } catch {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar la rutina.',
            icon: 'error',
            background: '#171212',
            color: '#fff',
            confirmButtonColor: '#8b0000'
          });
        } finally {
          setProcessing(false);
        }
      }
    });
  };

  const filteredRoutines = routines.filter(r => filter === 'all' ? true : r.status === filter);

  return (
    <div className="admin-panel animate-fade-in">
      <div className="dashboard-header">
        <h1>Moderación de Rutinas</h1>
        <p>Revisa y modera las rutinas creadas por los usuarios</p>
      </div>

      <div className="panel-header" style={{display: 'flex', gap: '1rem', justifyContent: 'flex-start'}}>
        <button 
          className={`filter-btn ${filter === 'all' ? 'active all' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active pending' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pendientes
        </button>
        <button 
          className={`filter-btn ${filter === 'approved' ? 'active approved' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Aprobadas
        </button>
        <button 
          className={`filter-btn ${filter === 'rejected' ? 'active rejected' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rechazadas
        </button>
      </div>

      {loading ? (
        <p>Cargando rutinas...</p>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Título / Detalle</th>
                <th>Usuario (ID)</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutines.map(routine => (
                <tr key={routine.id}>
                  <td>
                    <strong>{routine.title || `Rutina #${routine.id}`}</strong>
                    <br/>
                    <span style={{fontSize: '0.8rem', color: '#a3aed1'}}>{routine.description || 'Sin descripción'}</span>
                  </td>
                  <td>{routine.userId || 'Desconocido'}</td>
                  <td>{routine.date || 'Sin fecha'}</td>
                  <td>
                    <span className={`badge ${routine.status || 'pending'}`}>
                      {routine.status === 'approved' ? 'Aprobada' : routine.status === 'rejected' ? 'Rechazada' : 'Pendiente'}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      {routine.status !== 'approved' && (
                        <button 
                          className="btn-action approve"
                          onClick={() => handleStatusChange(routine.id, 'approved')}
                          title="Aprobar"
                          disabled={processing}
                        >
                          <Check size={18} />
                        </button>
                      )}
                      {routine.status !== 'rejected' && (
                        <button 
                          className="btn-action reject"
                          onClick={() => handleStatusChange(routine.id, 'rejected')}
                          title="Rechazar"
                          disabled={processing}
                        >
                          <X size={18} />
                        </button>
                      )}
                      <button 
                        className="btn-action delete"
                        onClick={() => handleDelete(routine.id)}
                        title="Eliminar"
                        disabled={processing}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRoutines.length === 0 && (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>
                    No se encontraron rutinas en esta categoría.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRoutines;
