import React, { useState } from 'react';
import { TextInput, Alert, Text, View, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { estilos } from '../estilos/styles';  
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PantallaRegistrarse({ navigation, route }) {
  const { correo } = route.params || {};
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState(''); 

  const registrar = async () => {

    if (usuario === '' || contrasena === '' || !correo) {
      Alert.alert("Por favor, completa todos los campos");
      return;
    }

    try {
      // aquí va la lógica para registrar en base de datos

      if (Platform.OS === 'web') {
        alert('Cuenta creada correctamente');
       } else {
          Alert.alert('[Exito', 'Cuenta creada correctamente', [{ text: 'Continuar' }], { cancelable: false });
       }
      navigation.navigate('MenuPrincipal', { usuario, contrasena, correo });

    } catch (error) {
      console.error("Error al registrar:", error);
      Alert.alert("Error", "No se pudo crear la cuenta. Intenta de nuevo.");
    }
  };

  return (
    <LinearGradient
      colors={['#000000ff', '#fff', '#000000ff']}
      style={{ flex: 1 }}
    > 
      <SafeAreaView style={estilos.contenedorPrincipal}>

        <Text style={estilos.titulo}>Crea tu cuenta</Text>

        <Text style={estilos.subtitulo}>
          Ingresa tus datos para crear una cuenta
        </Text>

        <TextInput
          style={estilos.contenedorInput}
          placeholder="Crea tu usuario"
          value={usuario}
          onChangeText={setUsuario}
        />

        <TextInput
          style={estilos.contenedorInput}
          placeholder="Crea tu contraseña"
          value={contrasena}
          secureTextEntry={true}
          onChangeText={setContrasena}
        />

        <View style={estilos.contenedorBotones}>
          <TouchableOpacity onPress={() => navigation.navigate('MandarCorreo')} style={[estilos.botonChico, { backgroundColor: "#454545ff" }]} >
            <Text style={[estilos.textoBotonChico, { fontSize: 20 }]}> Regresar </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={registrar} style={estilos.botonChico}>
            <Text style={[estilos.textoBotonChico, { fontSize: 20 }]}> Crear cuenta </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}
