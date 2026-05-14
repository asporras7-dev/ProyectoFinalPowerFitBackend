import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint chatbot
app.post("/chat", async (req, res) => {
  try {
    const { messages, contextoUsuario } = req.body;

    const systemPrompt = `ACTÚA COMO UN PREPARADOR FÍSICO PROFESIONAL Y COACH DE SALUD.
Tu misión es REFORZAR y profundizar en la solicitud del usuario bajo estas reglas:
1. Respuestas cortas, concretas y directas al punto.
2. Usa evidencia científica (PubMed) para validar tus consejos.
3. Mantén un tono motivador pero estrictamente profesional.
4. REGLA DE REFUERZO: Si el usuario pide algo específico, analízalo desde una perspectiva experta y dales consejos que potencien su solicitud.
5. REGLA DE CONTEXTO: Si la información es insuficiente para una recomendación segura, DEBES preguntar por su nivel, objetivos o limitaciones antes de responder.
6. REGLA DE DESCANSO: Siempre debes sugerir al usuario un tiempo de descanso recomendado entre series o ejercicios, dependiendo estrictamente de cuál sea su objetivo (ej: fuerza, hipertrofia, resistencia).`;

    const apiMessages = [
      {
        role: "system",
        content: `${systemPrompt}\n\nContexto del usuario:\n${contextoUsuario || 'No especificado'}`
      },
      ...(messages || []).map(m => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: apiMessages,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Groq API error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const responseText = data.choices[0].message.content;

    res.json({
      reply: responseText,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error en la API de Groq",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 3023;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
