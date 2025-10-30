import { detectarBackend } from './detectarBackend';

export const enviarCodigoCorreo = async ({ correo, codigo }) => {
  const BACKEND_URL = await detectarBackend();

  // Si no hay backend disponible, simula el envío 
  if (!BACKEND_URL) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { exito: false, codigo }; 
  }

  try {
    const respuesta = await fetch(`${BACKEND_URL}/enviarCorreo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, codigo }),
    });

    if (!respuesta.ok) {
      return { exito: false, codigo }; 
    }

    const dato = await respuesta.json();
    return dato.success === true ? { exito: true, codigo } : { exito: false, codigo };
  } catch {
    return { exito: false, codigo }; 
  }
};
