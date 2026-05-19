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
};
