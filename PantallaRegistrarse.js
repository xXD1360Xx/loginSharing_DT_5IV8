import React, { useState } from 'react';
import { TextInput, Image, Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { estilos } from '../estilos/styles';  
import { SafeAreaView } from 'react-native-safe-area-context';


export default function PantallaRegistrarse({ navigation }) {

  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState(''); 

    const registrar = () => {
        if (usuario === '' || contrasena === '') {
            Alert.alert("Por favor, completa todos los campos");
        } else {
            Alert.alert("Cuenta creada exitosamente");
            navigation.navigate('MenuPrincipal');
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

            <TouchableOpacity onPress={() => navigation.navigate('MandarCorreo')} style={[estilos.botonChico, {backgroundColor: "#454545ff"}]}>
              <Text style={[estilos.textoBotonChico, { fontSize: 20 }]}>Regresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={registrar} style={estilos.botonChico}>
              <Text style={[estilos.textoBotonChico, { fontSize: 20 }]}>Crear cuenta</Text>
            </TouchableOpacity>

          </View>

        </SafeAreaView>

      </LinearGradient>

    
  );
}
