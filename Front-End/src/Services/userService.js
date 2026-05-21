import { API_BASE_URL, BASE_URL } from './apiConfig';

// Helper to handle mapping between both db.json and Sequelize models dynamically
export const mapUser = (user) => {
  if (!user) return null;
  
  // Format Alergias array from MySQL to comma-separated string
  let alergiasString = user.alergias || '';
  if (user.DatosUsuario?.Alergias && Array.isArray(user.DatosUsuario.Alergias)) {
    alergiasString = user.DatosUsuario.Alergias.map(a => a.nombre).join(', ');
  } else if (user.DatosUsuario?.alergias) {
    alergiasString = user.DatosUsuario.alergias;
  }

  return {
    id: user.id || user.id_usuario,
    email: user.email || user.correo,
    nombre: user.nombre,
    rol: user.rol || (user.Rol ? user.Rol.nombre : (user.id_rol === 1 ? 'admin' : 'client')),
    edad: user.edad,
    
    // Physical stats (handles flat db.json and nested Sequelize model)
    sexo: user.sexo || user.DatosUsuario?.sexo || '',
    altura: user.altura || user.DatosUsuario?.altura || '',
    peso: user.peso || user.DatosUsuario?.peso || '',
    lugarEntrenamiento: user.lugarEntrenamiento || user.DatosUsuario?.lugar_entrenamiento || '',
    alergias: alergiasString,
    pesoMeta: user.pesoMeta !== undefined ? user.pesoMeta : (user.DatosUsuario?.peso_meta !== undefined ? user.DatosUsuario.peso_meta : 0),
    plazoSemanas: user.plazoSemanas !== undefined ? user.plazoSemanas : (user.DatosUsuario?.plazo_semanas !== undefined ? user.DatosUsuario.plazo_semanas : 8),
    pesoActual: user.pesoActual || user.DatosUsuario?.peso || user.peso || '',
    deficitEstimado: user.deficitEstimado !== undefined ? user.deficitEstimado : (user.DatosUsuario?.deficit_estimado !== undefined ? user.DatosUsuario.deficit_estimado : 450),
    semanasEnProgreso: user.semanasEnProgreso !== undefined ? user.semanasEnProgreso : (user.DatosUsuario?.semanas_progreso !== undefined ? user.DatosUsuario.semanas_progreso : 1),
    ultimoFeedbackDieta: user.ultimoFeedbackDieta || user.DatosUsuario?.feedback_dieta || '',
    ultimoFeedbackEjercicio: user.ultimoFeedbackEjercicio || user.DatosUsuario?.feedback_ejercicio || '',
    
    // Perfil attributes
    avatar: user.avatar || user.Perfil?.foto_perfil || '',
    cover: user.cover || user.Perfil?.foto_portada || '',
    
    // Followers/Following
    following: user.following || user.Perfil?.Following?.map(p => p.id_usuario) || [],
    followers: user.followers || user.Perfil?.Followers?.map(p => p.id_usuario) || [],
    
    // Exercises
    ejerciciosElegidos: user.ejerciciosElegidos || user.DatosUsuario?.Rutinas?.[0]?.Ejercicios?.map(e => e.id_ejercicio) || [],
    
    // Add raw user fields
    ...user
  };
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
};

const multiFetch = async (endpoint, options = {}) => {
  return await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  });
};

export const registerUser = async (userData) => {
  try {
    const mappedData = {
      correo: userData.email,
      contrasenia: userData.password,
      nombre: userData.nombre,
      edad: userData.edad || 20,
      id_rol: userData.rol === 'admin' ? 1 : 2,
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
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.error || `Error: ${response.statusText}`);
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
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: email,
        contrasenia: password
      })
    });

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.error || "Credenciales inválidas. Revisa tu correo y contraseña.");
    }

    const { token, usuario } = await response.json();
    
    // Store JWT token and user in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(mapUser(usuario)));

    return mapUser(usuario);
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
    const response = await multiFetch(`?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Error fetching paginated users");
    }
    const data = await response.json();
    const usersArray = Array.isArray(data) ? data : (data.data || []);
    return {
      data: usersArray.map(user => mapUser(user)),
      total: data.total || usersArray.length
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
  // Kept for backward compatibility, but unique constraint is enforced at DB level
  try {
    const response = await fetch(`${API_BASE_URL}?email=${encodeURIComponent(email)}`);
    if (!response.ok) {
      return false;
    }
    const users = await response.json();
    return users.length > 0;
  } catch (error) {
    return false;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    // Map camelCase fields to snake_case backend names if needed, but since our
    // UsuarioController already parses camelCase properties, we can send it directly!
    const response = await multiFetch(`/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.error || `Error: ${response.statusText}`);
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
    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) : null;
    const response = await fetch(`${BASE_URL}/mensajes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: messageData.nombre,
        telefono: String(messageData.contacto),
        correo: messageData.email,
        mensaje: messageData.mensaje,
        pais: messageData.pais,
        fecha: messageData.fecha || new Date().toISOString().slice(0, 19).replace('T', ' '),
        id_usuario: user?.id || messageData.id_usuario
      }),
    });

    if (!response.ok) {
      throw new Error("Error sending contact message");
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
    const response = await fetch(`${BASE_URL}/mensajes`, {
      headers: getAuthHeaders()
    });
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
    const response = await fetch(`${BASE_URL}/mensajes/${messageId}`, {
      method: "DELETE",
      headers: getAuthHeaders()
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

    const response = await multiFetch(`/${userId}`, {
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
};
