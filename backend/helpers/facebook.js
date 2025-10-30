// helpers/facebook.js
import axios from 'axios';
import { detectarBackend } from './detectarBackend';

// 🔹 Función para autenticar con Facebook
export const autenticarConFacebook = async (tokenAcceso) => {
  try {
    const BACKEND_URL = await detectarBackend();
    const respuesta = await axios.post(`${BACKEND_URL}/api/auth/facebook`, {
      access_token: tokenAcceso,
    });

    console.log('✅ Respuesta del backend (Facebook):', respuesta.data);
    return respuesta.data;
  } catch (error) {
    console.error('❌ Error autenticando con Facebook:', error.message);
    throw error;
  }
};
