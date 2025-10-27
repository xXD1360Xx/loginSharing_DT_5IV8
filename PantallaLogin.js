import React, { useState } from 'react';
import { TextInput, Image, Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { estilos } from '../estilos/styles';  
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';

export default function PantallaLogin({ navigation }) {
  
  const [validacion, setValidacion] = useState('false');
  const [usuario, setUsuario] = useState('');a
  const [contrasena, setContrasena] = useState(''); 

  const login = () => { 
    if (usuario === 'admin' && contrasena === '1234') {
      setValidacion('true');
      alert("Inicio de sesión exitoso");
      navigation.navigate('MenuPrincipal');
    } else {
      setValidacion('false');
    }
  };

    useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Reestablecer contraseña';
  
    }
  }, []);


  return (


      <LinearGradient
        colors={['#000000ff', '#ffffffff', '#000000ff']}
        style={{ flex: 1 }}
      > 

        <SafeAreaView style={estilos.contenedorPrincipal}>

          <Text style={[estilos.titulo, {fontSize: 40 }]}>Iniciar sesión</Text>

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
            placeholder="Ingresa tu contrasena"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />


            <TouchableOpacity onPress={login} style={estilos.botonGrande}>
              <Text style={estilos.textoBotonGrande}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('MandarCorreo', { modo: 'recuperar', usuario: usuario, contrasena: contrasena })}>
            <Text style={estilos.enlace}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('MandarCorreo', { modo: 'crear', usuario: usuario, contrasena: contrasena })}>
              <Text style={estilos.enlace}>¿No tienes cuenta? Crear cuenta</Text>
            </TouchableOpacity>

        </SafeAreaView>

      </LinearGradient>

   
  );
}
