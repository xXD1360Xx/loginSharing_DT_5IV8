import { Alert, Platform } from 'react-native';
import { detectarBackend } from './detectarBackend';

export const enviarCodigoCorreo = async ({ correo, codigo }) => {
  try {
    const BACKEND_URL = await detectarBackend();
    const respuesta = await fetch(`${BACKEND_URL}/enviarCorreo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, codigo }),
    });

    if (!respuesta.ok) return false;
    const dato = await respuesta.json();
    return dato.success === true;

  } catch (error) {
    console.error('Error al enviar correo:', error);
    return false;
  }
};
