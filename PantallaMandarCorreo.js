import React, { useState } from 'react';
import { TextInput, Image, Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { estilos } from '../estilos/styles';  
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';


export default function PantallaMandarCorreo({ navigation, route }) {
    const { modo } = route.params || {};
    const { usuario } = route?.params || {};
    const [correo, setCorreo] = useState('');

    

    const mandarCorreo = () => {
         if (modo === 'recuperar') {
                navigation.navigate('VerificarID', { modo: 'recuperar' });
            } else {
                navigation.navigate('VerificarID', { modo: 'crear' });
            }
    };



  return (

      <LinearGradient
        colors={['#000000ff', '#ffffffff', '#000000ff']}
        style={{ flex: 1 }}
      > 

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
          />

          
          <View style={estilos.contenedorBotones}>

            <TouchableOpacity onPress={() => navigation.goBack()} style={[estilos.botonChico, {backgroundColor: "#454545ff"}]}>
              <Text style={[estilos.textoBotonChico, { fontSize: 17 }]}>Regresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={mandarCorreo} style={estilos.botonChico}>
              <Text style={[estilos.textoBotonChico, { fontSize: 17 }]}>Mandar correo</Text>
            </TouchableOpacity>

          </View>

        </SafeAreaView>

      </LinearGradient>

    
  );
}
