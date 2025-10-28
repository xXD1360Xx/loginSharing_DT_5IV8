import React, { useState } from 'react';
import { TextInput, Image, Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { estilos } from '../estilos/styles';  
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';


export default function PantallaReset({ navigation }) {

  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState(''); 

  const cambiarContrasena = () => { 
    if (contrasena === confirmarContrasena) {
      alert("Contraseña cambiada correctamente");
      navigation.navigate('Login');
    } else {
      alert("Las contraseñas no coinciden. Por favor, intenta de nuevo.");
      setContrasena('');
      setConfirmarContrasena('');
    }
  };


  return (

      <LinearGradient
        colors={['#000000ff', '#ffffffff', '#000000ff']}
        style={{ flex: 1 }}
      > 

        <SafeAreaView style={estilos.contenedorPrincipal}>

          <Text style={[estilos.titulo, { fontSize: 22 }]}>Reestablecer contraseña</Text>

          <Text style={[estilos.subtitulo, { fontSize: 12 }]}>
            Crea tu nueva contraseña 
          </Text>

         <TextInput
            style={estilos.contenedorInput}
            placeholder="Crea una nueva contraseña"
            value={contrasena}
            secureTextEntry={true}
            onChangeText={setContrasena}
          />


          <TextInput
            style={estilos.contenedorInput}
            placeholder="Confirma tu nueva contraseña"
            value={confirmarContrasena}
            secureTextEntry={true}
            onChangeText={setConfirmarContrasena}
          />


          <View style={estilos.contenedorBotones}>
   

            <TouchableOpacity onPress={() => navigation.goBack()} style={[estilos.botonChico, {backgroundColor: "#454545ff"}]}>
              <Text style={[estilos.textoBotonChico, { fontSize: 17 }]}>Regresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={cambiarContrasena} style={estilos.botonChico}>
              <Text style={[estilos.textoBotonChico, { fontSize: 17 }]}>Cambiar contraseña</Text>
            </TouchableOpacity>

          </View>

        </SafeAreaView>

      </LinearGradient>

 
  );
}
