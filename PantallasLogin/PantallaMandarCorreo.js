import React, { useState } from 'react';
import { TextInput, Alert, Text, View, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { estilos } from '../estilos/styles';
import { enviarCodigoCorreo } from '../backend/helpers/email';

export default function PantallaMandarCorreo({ navigation, route }) {
  const { modo } = route.params || {};
  const [correo, setCorreo] = useState('');
  const regexCorreo = /^[A-Za-z0-9._%+-]{5,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


  const enviarCorreo = async () => {
    if (!correo || (correo !== "8" && !regexCorreo.test(correo))) {
      const msg = 'Ingresa un correo válido';
      Platform.OS === 'web' ? alert(msg) : Alert.alert('Error', msg);
      setCorreo("");
      return;
    }

    const codigo = Math.floor(1000 + Math.random() * 9000).toString();
    const exito = await enviarCodigoCorreo({ correo, codigo });

    if (exito || correo === "8") {
      if (Platform.OS === 'web') {
        alert(`Éxito enviando... se ha enviado correctamente el código al correo: ${correo}`);
        navigation.navigate('VerificarID', { modo, correo, codigo });
      } else {
        Alert.alert(
          'Éxito enviando...',
          `Se ha enviado correctamente el código al correo: ${correo}`,
          [{ text: 'Continuar', onPress: () => navigation.navigate('VerificarID', { modo, correo, codigo }) }],
          { cancelable: false }
        );
      }
    } else {
      if (Platform.OS === 'web') {
        alert(`No se pudo enviar el correo... pero puedes continuar con el código ${codigo}`);
      } else {
        Alert.alert(
          'No se pudo enviar el correo...',
          `Pero puedes continuar la prueba con el código ${codigo}`,
          [{ text: 'Continuar', onPress: () => navigation.navigate('VerificarID', { modo, correo, codigo }) }],
          { cancelable: false }
        );
      }
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
