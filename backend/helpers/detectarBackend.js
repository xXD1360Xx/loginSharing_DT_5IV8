// helpers/detectarBackend.js
import { Alert, Platform } from 'react-native';

export const URL_LOCALHOST = 'http://localhost:3000';
export const URL_LAN = 'http://192.168.100.20:3000';  // 👈 cambia por tu IP local si es otra
export const URL_TUNNEL = 'https://TU_TUNNEL.ngrok.io';

export const detectarBackend = async () => {
  if (Platform.OS === 'web') return URL_LOCALHOST;

  try {
    const respuesta = await fetch(`${URL_LAN}/ping`);
    if (respuesta.ok) return URL_LAN;
  } catch (e) {
    console.warn('⚠️ No se detectó LAN, usando túnel.');
    return URL_TUNNEL;
  }

  return URL_TUNNEL;
};
