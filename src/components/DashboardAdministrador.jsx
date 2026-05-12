import React, { useEffect, useState, useContext } from 'react';
import {
  Dumbbell, Users, Mail, BarChart2, ChevronRight, Plus, Dumbbell as DumbbellIcon
} from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { getAllUsers } from '../services/userService';
import { getAllRoutines } from '../services/routineService';
import { obtenerTodosEjercicios } from '../services/exerciseService';

const DashboardAdministrador = ({ changeTab, openAddModal }) => {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRoutines: 0,
    pendingRoutines: 0,
    approvedRoutines: 0,
    totalExercises: 0,
    totalMessages: 0,
    totalReports: 0,
  });

  const adminName = user?.nombre || user?.email?.split('@')[0] || 'admin';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, routines, exercises] = await Promise.all([
          getAllUsers(),
          getAllRoutines(),
          obtenerTodosEjercicios(),
        ]);
        const pending = routines.filter(r => r.status === 'pending').length;
        const approved = routines.filter(r => r.status === 'approved').length;
        setStats({
          totalUsers: users.length,
          totalRoutines: routines.length,
          pendingRoutines: pending,
          approvedRoutines: approved,
          totalExercises: exercises.length,
          totalMessages: 0,
          totalReports: 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    const handleRefresh = () => fetchStats();
    window.addEventListener('refreshExercises', handleRefresh);
    return () => window.removeEventListener('refreshExercises', handleRefresh);
  }, []);

  const statCards = [
    {
      label: 'Total Ejercicios',
      value: stats.totalExercises,
      sub: 'En la biblioteca',
      icon: Dumbbell,
      tab: 'exercises',
      color: 'red',
    },
    {
      label: 'Usuarios Activos',
      value: stats.totalUsers,
      sub: 'Registrados',
      icon: Users,
      tab: 'users',
      color: 'blue',
    },
    {
      label: 'Mensajes Nuevos',
      value: stats.totalMessages,
      sub: 'Sin leer',
      icon: Mail,
      tab: 'messages',
      color: 'teal',
    },
    {
      label: 'Reportes',
      value: stats.totalReports,
      sub: 'Generados',
      icon: BarChart2,
      tab: 'reports',
      color: 'purple',
    },
  ];

  return (
    <div className="dao-root animate-fade-in">
      {/* Welcome Banner */}
      <div className="dao-welcome">
        <div className="dao-welcome__text">
          <h1>¡Bienvenido de vuelta, {adminName}! 👋</h1>
          <p>Aquí tienes un resumen general de tu plataforma.</p>
        </div>
        <div className="dao-welcome__dumbbell" aria-hidden="true">
          <Dumbbell size={96} strokeWidth={1.2} />
        </div>
      </div>

      {/* Stat cards */}
      <div className="dao-stats">
        {statCards.map(({ label, value, sub, icon: Icon, tab, color }) => (
          <button
            key={tab}
            className={`dao-stat-card dao-stat-card--${color}`}
            onClick={() => changeTab(tab)}
          >
            <div className={`dao-stat-card__icon dao-stat-card__icon--${color}`}>
              <Icon size={22} />
            </div>
            <div className="dao-stat-card__body">
              <span className="dao-stat-card__label">{label}</span>
              <span className="dao-stat-card__value">{value}</span>
              <span className="dao-stat-card__sub">{sub}</span>
            </div>
            <ChevronRight className="dao-stat-card__arrow" size={18} />
          </button>
        ))}
      </div>

      {/* Exercises section */}
      <div className="dao-section">
        <div className="dao-section__header">
          <div className="dao-section__title-wrap">
            <div className="dao-section__title-icon">
              <Dumbbell size={20} />
            </div>
            <div>
              <h2>Gestión de Ejercicios</h2>
              <p>Administra la biblioteca de movimientos y rutinas.</p>
            </div>
          </div>
          <button className="dao-btn-add" onClick={openAddModal}>
            <Plus size={16} />
            Agregar Ejercicio
          </button>
        </div>

        {/* Mini search bar + filter row */}
        <div className="dao-section__filters">
          <div className="dao-search-box">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" placeholder="Buscar por nombre o categoría..." readOnly onClick={() => changeTab('exercises')} />
          </div>
          <button className="dao-filter-select" onClick={() => changeTab('exercises')}>
            Todas las categorías
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <button className="dao-filter-btn" onClick={() => changeTab('exercises')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="4" x2="20" y1="6" y2="6"/><line x1="8" x2="16" y1="12" y2="12"/><line x1="11" x2="13" y1="18" y2="18"/></svg>
            Filtros
          </button>
        </div>

        {/* Table header */}
        <div className="dao-table-header">
          {['Miniatura', 'Nombre', 'Categoría', 'Músculo principal', 'Nivel', 'Acciones'].map(h => (
            <span key={h}>{h}</span>
          ))}
        </div>

        {/* Empty state */}
        <div className="dao-empty-state">
          <Dumbbell size={48} strokeWidth={1} />
          <p>No se encontraron ejercicios</p>
          <span>Aún no hay ejercicios en la biblioteca.</span>
          <button className="dao-btn-add dao-btn-add--outline" onClick={openAddModal}>
            <Plus size={16} />
            Agregar el primer ejercicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdministrador;
