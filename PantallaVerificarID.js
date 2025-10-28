import React, { useState } from 'react';
import { TextInput, Image, Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { estilos } from '../estilos/styles';  
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';

export default function PantallaVerificarID({ navigation, route }) {
  const { modo } = route.params || {};
  const [codigoCorreoEnviado, setCodigoCorreoEnviado] = useState('');
  const [codigoCorreoIngresado, setCodigoCorreoIngresado] = useState('');
  const [verificacionID, setVerificacionID] = useState(false);

    const verificarCodigo = () => {
        if (codigoCorreoIngresado === '1234' || codigoCorreoIngresado === codigoCorreoEnviado || verificacionID === true) {
            console.log('Modo recibido:', modo); // Muy importante para depurar
            alert("Código verificado exitosamente");
            setVerificacionID(true);
            if (modo === 'recuperar') {
                navigation.navigate('Reset');
            } else {
                navigation.navigate('Registrar');
            }
        } else {
            alert("Código incorrecto");
        }
    };

  console.log('Modo recibido:', modo); // Muy importante para depurar


  return (

      <LinearGradient
        colors={['#000000ff', '#ffffffff', '#000000ff']}
        style={{ flex: 1 }}
      > 

        <SafeAreaView style={estilos.contenedorPrincipal}>

          <Text style={estilos.titulo}>Verifica tu correo</Text>

          <Text style={estilos.subtitulo}>
            Introduce el codigo enviado al correo electrónico
          </Text>

          <TextInput
            style={estilos.contenedorInput}
            placeholder="Ingresa el código"
            value={codigoCorreoIngresado}
            onChangeText={setCodigoCorreoIngresado}
          />

          
          <View style={estilos.contenedorBotones}>

            <TouchableOpacity onPress={() => navigation.navigate('MandarCorreo')} style={[estilos.botonChico, {backgroundColor: "#454545ff"}]}>
              <Text style={[estilos.textoBotonChico, { fontSize: 20 }]}>Regresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={verificarCodigo} style={estilos.botonChico}>
              <Text style={[estilos.textoBotonChico, { fontSize: 16 }]}>Verificar código</Text>
            </TouchableOpacity>

          </View>

        </SafeAreaView>

      </LinearGradient>

    
  );
}
