import { API_BASE_URL } from './apiConfig';
const API_URL = API_BASE_URL;

export const fetchStoriesData = async () => {
    const [storiesRes, contributorsRes, topicsRes, commentsRes] = await Promise.all([
        fetch(`${API_URL}/publicaciones`),
        fetch(`${API_URL}/contribuidores`),
        fetch(`${API_URL}/temas`),
        fetch(`${API_URL}/comentarios`)
    ]);

    if (!storiesRes.ok || !contributorsRes.ok || !topicsRes.ok) {
        throw new Error('Error al cargar la información.');
    }

    const storiesDataRaw = await storiesRes.json();
    const contributorsData = await contributorsRes.json();
    const topicsData = await topicsRes.json();
    
    let commentsData = [];
    if (commentsRes.ok) {
        commentsData = await commentsRes.json();
    }
    
    // Map backend fields to frontend fields
    const storiesData = storiesDataRaw.map(s => ({
        id: s.idpublicaciones,
        title: s.titulo,
        text: s.texto,
        image: s.imagen,
        time: s.tiempo_Publicacion,
        userId: s.Usuario_idUsuario,
        category: s.CategoriaPublicacion ? s.CategoriaPublicacion.nombre : 'Pérdida de Peso',
        tag: s.CategoriaPublicacion ? s.CategoriaPublicacion.nombre : 'Pérdida de Peso',
        likes: s.likes || 0,
        comments: 0 // Will be calculated below
    }));

    // Attach accurate comments count to each story
    storiesData.forEach(story => {
        const storyComments = commentsData.filter(c => String(c.storyId) === String(story.id));
        story.comments = storyComments.length;
    });

    return { storiesData, contributorsData, topicsData };
};

export const createStory = async (storyPayload) => {
    const mappedPayload = {
        titulo: storyPayload.title,
        texto: storyPayload.text,
        imagen: storyPayload.image,
        categoria_nombre: storyPayload.category,
        Usuario_idUsuario: storyPayload.userId,
        tiempo_Publicacion: new Date().toISOString()
    };
    const response = await fetch(`${API_URL}/publicaciones`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mappedPayload)
    });

    if (!response.ok) {
        throw new Error('Hubo un error al publicar tu historia.');
    }

    const rawStory = await response.json();
    return {
        id: rawStory.idpublicaciones,
        title: rawStory.titulo,
        text: rawStory.texto,
        image: rawStory.imagen,
        time: rawStory.tiempo_Publicacion,
        fecha: rawStory.tiempo_Publicacion,
        userId: rawStory.Usuario_idUsuario,
        category: storyPayload.category,
        tag: storyPayload.category,
        userName: storyPayload.userName,
        userAvatar: storyPayload.userAvatar,
        likes: 0,
        comments: 0,
        likedBy: []
    };
};

export const updateStoryLikes = async (storyId, newLikes, likedBy) => {
    // In the real backend, likes might be handled by a separate /likes endpoint or incremented.
    // For now, we update the publicacion.
    const response = await fetch(`${API_URL}/publicaciones/${storyId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            likes: newLikes
            // likedBy mapping might be needed if the backend supports it
        })
    });

    if (!response.ok) {
        throw new Error('Hubo un error al actualizar los likes.');
    }

    return await response.json();
};

export const deleteStory = async (storyId) => {
    const response = await fetch(`${API_URL}/publicaciones/${storyId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Hubo un error al eliminar el testimonio.');
    }

    return response;
};

export const fetchCommentsByStory = async (storyId) => {
    const response = await fetch(`${API_URL}/comentarios?storyId=${storyId}`);
    if (!response.ok) {
        throw new Error('Error al cargar los comentarios.');
    }
    return await response.json();
};

export const addComment = async (commentPayload) => {
    const response = await fetch(`${API_URL}/comentarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentPayload)
    });
    if (!response.ok) {
        throw new Error('Error al publicar el comentario.');
    }
    return await response.json();
};

export const updateStoryCommentsCount = async (storyId, newCount) => {
    const response = await fetch(`${API_URL}/publicaciones/${storyId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comments: newCount })
    });
    if (!response.ok) {
        throw new Error('Error al actualizar el contador de comentarios.');
    }
    return await response.json();
};

export const getStoriesByUserId = async (userId) => {
    const [storiesRes, commentsRes] = await Promise.all([
        fetch(`${API_URL}/publicaciones?Usuario_idUsuario=${userId}`),
        fetch(`${API_URL}/comentarios`)
    ]);
    if (!storiesRes.ok) {
        throw new Error('Error al cargar las historias del usuario.');
    }
    
    const storiesRaw = await storiesRes.json();
    let commentsData = [];
    if (commentsRes.ok) {
        commentsData = await commentsRes.json();
    }
    
    const stories = storiesRaw.map(s => ({
        id: s.idpublicaciones,
        title: s.titulo,
        text: s.texto,
        image: s.imagen,
        time: s.tiempo_Publicacion,
        userId: s.Usuario_idUsuario,
        likes: s.likes || 0,
        comments: 0
    }));

    stories.forEach(story => {
        story.comments = commentsData.filter(c => String(c.storyId) === String(story.id)).length;
    });
    
    return stories;
};

export const createReport = async (reportPayload) => {
    const response = await fetch(`${API_URL}/reportes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            publicaciones_idpublicaciones: reportPayload.storyId,
            Usuario_idUsuario: reportPayload.reporterId,
            razones_Reporte_idrazones_Reporte: 1, // Default reason
            status: 'pending',
            fecha: new Date().toISOString()
        })
    });
    if (!response.ok) {
        throw new Error('Error al enviar el reporte.');
    }
    return await response.json();
};

export const getAllReports = async () => {
    const response = await fetch(`${API_URL}/reportes`);
    if (!response.ok) {
        throw new Error('Error al cargar los reportes.');
    }
    return await response.json();
};

export const deleteReport = async (reportId) => {
    const response = await fetch(`${API_URL}/reportes/${reportId}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Error al eliminar el reporte.');
    }
    return response;
};

export const getStoryById = async (storyId) => {
    const response = await fetch(`${API_URL}/publicaciones/${storyId}`);
    if (!response.ok) {
        throw new Error('Error al cargar la historia.');
    }
    return await response.json();
};
