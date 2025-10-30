import React, { useState, useEffect } from 'react';
import { TextInput, Image, Alert, Text, View, TouchableOpacity, Platform} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { estilos } from '../estilos/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import { autenticarConGoogle } from '../backend/helpers/google';
import { autenticarConFacebook } from '../backend/helpers/facebook';

WebBrowser.maybeCompleteAuthSession();

export default function PantallaLogin({ navigation }) {

  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const [solicitudGoogle, respuestaGoogle, iniciarGoogle] = Google.useAuthRequest({
    androidClientId: '875101074375-kttkiehldj4dbup7ta66vrgd3evpl4v9.apps.googleusercontent.com',
    webClientId: '875101074375-s6bp5dbcrf6s3cooi2i0bdou721b3n37.apps.googleusercontent.com',
  });

  const [solicitudFacebook, respuestaFacebook, iniciarFacebook] = Facebook.useAuthRequest({
    clientId: 'TU_FACEBOOK_APP_ID',
  });

  const manejarLoginManual = () => {
    if (usuario === 'admin' && contrasena === '1234') {
      if (Platform.OS === 'web') {
        alert('Inicio de sesión exitoso');
      } else {
        Alert.alert('Éxito', 'Inicio de sesión exitoso', [
          { text: 'Continuar', onPress: () => navigation.navigate('MenuPrincipal', { usuario }) },
        ]);
      }
    } else {
      if (Platform.OS === 'web') {
        alert('Usuario o contraseña incorrectos');
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
      setContrasena('');
    }
  };

  const manejarLoginGoogle = async () => {
    try {
      const resultado = await iniciarGoogle();
      if (resultado?.type === 'success') {
        const datos = await autenticarConGoogle(resultado.authentication.accessToken);
        console.log('Usuario autenticado con Google:', datos);
        navigation.navigate('MenuPrincipal', { usuario: datos.usuario });
      }
    } catch (error) {
      console.error('Error iniciando sesión con Google:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión con Google.');
    }
  };

  const manejarLoginFacebook = async () => {
    try {
      const resultado = await iniciarFacebook();
      if (resultado?.type === 'success') {
        const datos = await autenticarConFacebook(resultado.authentication.accessToken);
        console.log('Usuario autenticado con Facebook:', datos);
        navigation.navigate('MenuPrincipal', { usuario: datos.usuario });
      }
    } catch (error) {
      console.error('Error iniciando sesión con Facebook:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión con Facebook.');
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = 'Inicio de sesión';
    }
  }, []);

  return (
    <LinearGradient colors={['#000000ff', '#ffffffff', '#000000ff']} style={{ flex: 1 }}>
      <SafeAreaView style={estilos.contenedorPrincipal}>
        <Text style={[estilos.titulo, { fontSize: 40 }]}>Iniciar sesión</Text>
        <Text style={estilos.subtitulo}>
          Inicia sesión para acceder a todo nuestro contenido
        </Text>

        <TextInput
          style={estilos.contenedorInput}
          placeholder="Ingresa tu nombre de usuario"
          value={usuario}
          onChangeText={setUsuario}
        />

        <TextInput
          style={estilos.contenedorInput}
          placeholder="Ingresa tu contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />

        <TouchableOpacity onPress={manejarLoginManual} style={estilos.botonGrande}>
          <Text style={estilos.textoBotonGrande}>Iniciar sesión</Text>
        </TouchableOpacity>

        <View style={estilos.separador} />

        <Text style={estilos.subtituloInferior}>Puedes iniciar sesión con tus redes</Text>

        <View style={estilos.contenedorRedes}>
          <TouchableOpacity style={estilos.botonRed} onPress={manejarLoginGoogle}>
            <Image source={require('../recursos/img/google.png')} style={estilos.iconoRed} />
            <Text style={estilos.textoBotonRed}>Continuar con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botonRed} onPress={manejarLoginFacebook}>
            <Image source={require('../recursos/img/facebook.png')} style={estilos.iconoRed} />
            <Text style={estilos.textoBotonRed}>Continuar con Facebook</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
