import { API_BASE_URL } from './apiConfig';

const BASE = API_BASE_URL;

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const mapUsuario = (u) => ({
  id: u.id ?? u.id_usuario,
  email: u.correo ?? u.email,
  correo: u.correo ?? u.email,
  nombre: u.nombre,
  edad: u.edad,
  id_rol: u.id_rol,
  rol: u.rol ?? u.Rol?.nombre ?? 'client',
  avatar: u.avatar ?? u.Perfil?.foto_perfil ?? '',
  cover: u.cover ?? u.Perfil?.foto_portada ?? '',
  pesoActual: u.pesoActual ?? u.DatosUsuario?.peso ?? null,
  pesoMeta: u.pesoMeta ?? u.DatosUsuario?.peso_meta ?? null,
  altura: u.altura ?? u.DatosUsuario?.altura ?? null,
  plazoSemanas: u.plazoSemanas ?? u.DatosUsuario?.plazo_semanas ?? null,
  deficitEstimado: u.deficitEstimado ?? u.DatosUsuario?.deficit_estimado ?? null,
  semanasEnProgreso: u.semanasEnProgreso ?? u.DatosUsuario?.semanas_progreso ?? 1,
  ultimoFeedbackDieta: u.ultimoFeedbackDieta ?? u.DatosUsuario?.feedback_dieta ?? null,
  ultimoFeedbackEjercicio: u.ultimoFeedbackEjercicio ?? u.DatosUsuario?.feedback_ejercicio ?? null,
  sexo: u.sexo ?? u.DatosUsuario?.sexo ?? null,
  lugarEntrenamiento: u.lugarEntrenamiento ?? u.DatosUsuario?.lugar_entrenamiento ?? null,
  following: u.following ?? [],
  followers: u.followers ?? [],
  ejerciciosElegidos: u.ejerciciosElegidos ?? []
});

export const registerUser = async (userData) => {
  const payload = {
    correo: userData.email || userData.correo,
    contrasenia: userData.password || userData.contrasenia,
    nombre: userData.nombre,
    edad: userData.edad ? Number(userData.edad) : 18
  };

  const response = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al registrar el usuario.');
  }

  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo: email, contrasenia: password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al iniciar sesión.');
  }

  localStorage.setItem('token', data.token);

  return mapUsuario(data.usuario);
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const response = await fetch(`${BASE}/api/auth/me`, {
    headers: authHeaders()
  });

  if (!response.ok) {
    localStorage.removeItem('token');
    return null;
  }

  const data = await response.json();
  return mapUsuario(data);
};

export const getAllUsers = async () => {
  const response = await fetch(`${BASE}/api/usuarios`, { headers: authHeaders() });
  if (!response.ok) throw new Error('Error al obtener usuarios.');
  const data = await response.json();
  const arr = Array.isArray(data) ? data : (data.data || []);
  return arr.map(mapUsuario);
};

export const getPaginatedUsers = async (page = 1, limit = 10) => {
  const response = await fetch(`${BASE}/api/usuarios?page=${page}&limit=${limit}`, {
    headers: authHeaders()
  });
  if (!response.ok) throw new Error('Error al obtener usuarios paginados.');
  const data = await response.json();
  const arr = Array.isArray(data) ? data : (data.data || []);
  return {
    data: arr.map(mapUsuario),
    total: data.total ?? arr.length,
    totalPages: data.totalPages ?? 1,
    currentPage: data.currentPage ?? page
  };
};

export const getUserById = async (userId) => {
  const response = await fetch(`${BASE}/api/usuarios/${userId}`, {
    headers: authHeaders()
  });
  if (!response.ok) throw new Error('Error al obtener el usuario.');
  const data = await response.json();
  return mapUsuario(data);
};

export const updateUser = async (userId, userData) => {
  const payload = { ...userData };
  if (userData.email) { payload.correo = userData.email; delete payload.email; }
  if (userData.password) { payload.contrasenia = userData.password; delete payload.password; }

  const response = await fetch(`${BASE}/api/usuarios/${userId}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Error al actualizar el usuario.');
  }
  const data = await response.json();
  return mapUsuario(data);
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${BASE}/api/usuarios/${userId}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!response.ok) throw new Error('Error al eliminar el usuario.');
};

export const checkUserExists = async (email) => {
  const response = await fetch(`${BASE}/api/usuarios?correo=${encodeURIComponent(email)}`, {
    headers: authHeaders()
  });
  if (!response.ok) return false;
  const data = await response.json();
  const arr = Array.isArray(data) ? data : (data.data || []);
  return arr.some(u => (u.correo || u.email || '').toLowerCase() === email.toLowerCase());
};

export const actualizarImg = async (userId, imageUrl) => {
  if (!imageUrl || imageUrl.startsWith('data:')) {
    throw new Error('La imagen no es una URL válida.');
  }
  const response = await fetch(`${BASE}/api/usuarios/${userId}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ avatar: imageUrl })
  });
  if (!response.ok) throw new Error('Error al actualizar la imagen.');
  const data = await response.json();
  return mapUsuario(data);
};

export const saveContactMessage = async (messageData) => {
  const response = await fetch(`${BASE}/api/mensajes`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(messageData)
  });
  if (!response.ok) throw new Error('Error al guardar el mensaje.');
  return await response.json();
};

export const getAllContactMessages = async () => {
  const response = await fetch(`${BASE}/api/mensajes`, { headers: authHeaders() });
  if (!response.ok) throw new Error('Error al obtener los mensajes.');
  return await response.json();
};

export const deleteContactMessage = async (messageId) => {
  const response = await fetch(`${BASE}/api/mensajes/${messageId}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!response.ok) throw new Error('Error al eliminar el mensaje.');
};
