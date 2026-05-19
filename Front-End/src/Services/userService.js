<<<<<<< HEAD
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
=======
import { API_BASE_URL, BASE_URL } from './apiConfig';

// Helper to handle mapping between both db.json and Sequelize models dynamically
export const mapUser = (user) => {
  if (!user) return null;
  return {
    id: user.id || user.idUsuario || user.id_usuario,
    email: user.email || user.correo,
    nombre: user.nombre,
    rol: user.rol || (user.Rol ? user.Rol.nombre : (user.Rol_idRol === 1 || user.id_rol === 1 ? 'admin' : 'client')),
    
    // Flat properties from db.json
    edad: user.edad,
    sexo: user.sexo,
    altura: user.altura,
    peso: user.peso,
    lugarEntrenamiento: user.lugarEntrenamiento,
    alergias: user.alergias,
    pesoMeta: user.pesoMeta,
    plazoSemanas: user.plazoSemanas,
    pesoActual: user.pesoActual || user.peso || user.DatosUsuario?.peso || '',
    deficitEstimado: user.deficitEstimado || user.DatosUsuario?.decifitEstimado || 450,
    semanasEnProgreso: user.semanasEnProgreso || user.DatosUsuario?.semanas_En_Progreso || 1,
    ultimoFeedbackDieta: user.ultimoFeedbackDieta || user.DatosUsuario?.ultimo_Feedback_Dieta || '',
    ultimoFeedbackEjercicio: user.ultimoFeedbackEjercicio || user.DatosUsuario?.ultimo_Feedback_Ejercicio || '',
    avatar: user.avatar || user.Perfil?.foto_Perfil || '',
    cover: user.cover || user.Perfil?.foto_Portada || '',
    following: user.following || user.Perfil?.Following?.map(p => p.Usuario_idUsuario) || [],
    followers: user.followers || user.Perfil?.Followers?.map(p => p.Usuario_idUsuario) || [],
    ejerciciosElegidos: user.ejerciciosElegidos || user.DatosUsuario?.Rutinas?.[0]?.Ejercicios?.map(e => e.idEjercicios) || [],
    ...user
  };
};

const multiFetch = async (endpoint, options = {}) => {
  return await fetch(`${API_BASE_URL}${endpoint}`, options);
};

export const registerUser = async (userData) => {
  try {
    const mappedData = {
      email: userData.email,
      password: userData.password,
      nombre: userData.nombre,
      edad: userData.edad || null,
      rol: userData.rol || 'client',
      followers: [],
      following: [],
      avatar: userData.avatar || '',
      cover: userData.cover || '',
      sexo: userData.sexo || '',
      altura: userData.altura || '',
      peso: userData.peso || '',
      lugarEntrenamiento: userData.lugarEntrenamiento || '',
      alergias: userData.alergias || '',
      pesoMeta: userData.pesoMeta || 0,
      plazoSemanas: userData.plazoSemanas || 8,
      pesoActual: userData.pesoActual || userData.peso || '',
      deficitEstimado: userData.deficitEstimado || 450,
      semanasEnProgreso: 1,
      ejerciciosElegidos: []
    };
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mappedData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const savedUser = await response.json();
    return mapUser(savedUser);
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}?email=${encodeURIComponent(email)}`);

    if (!response.ok) {
      throw new Error(`Error del servidor (${response.status}). Asegúrate de que el backend esté activo.`);
    }

    const users = await response.json();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      throw new Error("Credenciales inválidas. Revisa tu correo y contraseña.");
    }

    return mapUser(user);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await multiFetch("");
    if (!response.ok) {
      throw new Error("Error fetching users");
    }
    const usersRaw = await response.json();
    return usersRaw.map(user => mapUser(user));
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getPaginatedUsers = async (page = 1, limit = 10) => {
  try {
    const response = await multiFetch(`?_page=${page}&_limit=${limit}`);
    if (!response.ok) {
      throw new Error("Error fetching paginated users");
    }
    const data = await response.json();
    const usersArray = Array.isArray(data) ? data : (data.data || []);
    return {
      data: usersArray.map(user => mapUser(user)),
      total: parseInt(response.headers.get("x-total-count") || usersArray.length, 10)
    };
  } catch (error) {
    console.error("Error fetching paginated users:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await multiFetch(`/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const checkUserExists = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}?email=${encodeURIComponent(email)}`);
    if (!response.ok) {
      throw new Error("Error fetching users");
    }
    const users = await response.json();
    return users.length > 0;
  } catch (error) {
    console.error("Check user error:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await multiFetch(`/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const updatedUser = await response.json();
    return mapUser(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};

export const saveContactMessage = async (messageData) => {
  try {
    const response = await fetch(`${BASE_URL}/contactos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Contact form error:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await multiFetch(`/${userId}`);
    if (!response.ok) {
      throw new Error("Error fetching user");
    }
    const user = await response.json();
    return mapUser(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const getAllContactMessages = async () => {
  try {
    const response = await fetch(`${BASE_URL}/contactos`);
    if (!response.ok) {
      throw new Error("Error fetching contact messages");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    throw error;
  }
};

export const deleteContactMessage = async (messageId) => {
  try {
    const response = await fetch(`${BASE_URL}/contactos/${messageId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting contact message");
    }
  } catch (error) {
    console.error("Error deleting contact message:", error);
    throw error;
  }
};

export const actualizarImg = async (userId, imageUrl) => {
  try {
    if (!imageUrl || imageUrl.startsWith("data:")) {
      throw new Error("La imagen no es una URL válida");
    }

    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error actualizando imagen:", error);
    throw error;
  }
>>>>>>> f7e7d2999b6066b1f637d367a8065ff0b1adbd23
};
