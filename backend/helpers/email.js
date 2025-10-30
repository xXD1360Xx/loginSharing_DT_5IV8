import { Alert, Platform } from 'react-native';

export const enviarCodigoCorreo = async ({ correo, codigo }) => {
  const BACKEND_URL = await detectarBackend();

  try {
    const respuesta = await fetch(`${BACKEND_URL}/enviarCorreo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, codigo }),
    });

    const dato = await respuesta.json();

    if (!respuesta.ok || !dato.success) {
      const mensajeError = dato.error || 'No se pudo enviar el correo.';
      Platform.OS === 'web'
        ? alert(`Error: ${mensajeError}`)
        : Alert.alert('Error', mensajeError);
      return false;
    }

    Platform.OS === 'web'
      ? alert(`Código enviado a ${correo}: ${codigo}`)
      : Alert.alert('Correo enviado', `Se envió un código a ${correo}`);

    return true;
  } catch (error) {
    console.error('Error al enviar correo:', error);
    Platform.OS === 'web'
      ? alert('No se pudo conectar con el servidor. Verifica tu red o el backend.')
      : Alert.alert(
          'Error',
          'No se pudo conectar con el servidor. Verifica tu red o el backend.'
        );
    return false;
  }
};
