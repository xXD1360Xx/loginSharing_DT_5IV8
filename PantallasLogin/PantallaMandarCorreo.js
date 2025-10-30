import React, { useState } from 'react';
import { TextInput, Alert, Text, View, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { estilos } from '../estilos/styles';
import { enviarCodigoCorreo } from '../backend/helpers/email';


export default function PantallaMandarCorreo({ navigation, route }) {
  const { modo } = route.params || {};
  const [correo, setCorreo] = useState('');

  const URL_LOCALHOST = 'http://localhost:3000';
  const URL_LAN = 'http://192.168.100.20:3000'; 
  const URL_TUNNEL = 'https://CAMBIAR.ngrok.io';  

const detectarBackend = async () => {
  if (Platform.OS === 'web') return URL_LOCALHOST;

  try {
    console.log('🔍 Probando LAN...');
    const resLAN = await fetch(`${URL_LAN}/ping`);
    if (resLAN.ok) {
      console.log('✅ Conectado por LAN');
      return URL_LAN;
    }
  } catch (e) {
    console.log('❌ LAN no responde');
  }

  try {
    console.log('🔍 Probando emulador (10.0.2.2)...');
    const resEmulador = await fetch('http://10.0.2.2:3000/ping');
    if (resEmulador.ok) {
      console.log('✅ Conectado por emulador (10.0.2.2)');
      return 'http://10.0.2.2:3000';
    }
  } catch (e) {
    console.log('❌ Emulador no responde');
  }

  console.log('🌐 Usando túnel remoto');
  return URL_TUNNEL;
};


  const enviarCorreo = async () => {
    if (!correo) {
      Platform.OS === 'web'
        ? alert('Ingresa un correo válido')
        : Alert.alert('Error', 'Ingresa un correo válido');
      return;
    }

    const codigo = Math.floor(1000 + Math.random() * 9000).toString();
    const BACKEND_URL = await detectarBackend();

    try {
      const respuesta = await fetch(`${BACKEND_URL}/enviarCorreo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, codigo }),
      });

      const dato = await respuesta.json();
      console.log('Respuesta backend:', dato);

      if (!respuesta.ok || !dato.success) {
        const mensajeError = dato.error || 'No se pudo enviar el correo.';
        Platform.OS === 'web'
          ? alert(`Error: ${mensajeError}`)
          : Alert.alert('Error', mensajeError);
        return;
      }

      if (Platform.OS === 'web') {
        alert(`Código enviado a ${correo}: ${codigo}`);
        navigation.navigate('VerificarID', { modo, correo, codigo });
      } else {
        Alert.alert('Correo enviado',`Se envió un código a ${correo}`,
          [
            {
              text: 'continuar', onPress: () => navigation.navigate('VerificarID', { modo, correo, codigo }),
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error al enviar correo:', error);
      Platform.OS === 'web'? alert('No se pudo conectar con el servidor. Verifica tu red o el backend.')
      : Alert.alert('Error', 'No se pudo conectar con el servidor. Verifica tu red o el backend.');
    }
  };

  return (
    <LinearGradient colors={['#000000ff', '#ffffffff', '#000000ff']} style={{ flex: 1 }}>
      <SafeAreaView style={estilos.contenedorPrincipal}>
        <Text style={[estilos.titulo, { fontSize: 26 }]}>Verifica tu identidad</Text>
        <Text style={[estilos.subtitulo, { fontSize: 12 }]}>
          Te enviaremos un código al correo electrónico para validar tu identidad
        </Text>

        <TextInput
          style={estilos.contenedorInput}
          placeholder="Ingresa tu correo electrónico"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={estilos.contenedorBotones}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[estilos.botonChico, { backgroundColor: '#454545ff' }]}
          >
            <Text style={[estilos.textoBotonChico, { fontSize: 17 }]}>Regresar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={enviarCorreo} style={estilos.botonChico}>
            <Text style={[estilos.textoBotonChico, { fontSize: 17 }]}>Mandar correo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
