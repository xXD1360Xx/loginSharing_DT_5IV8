import React, { useState, useEffect } from 'react';
import { TextInput, Alert, Text, View, TouchableOpacity, Platform, ActivityIndicator  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { estilos } from '../estilos/styles';
import { enviarCodigoCorreo } from '../backend/helpers/email';


export default function PantallaMandarCorreo({ navigation, route }) {
  const { modo, correo: correoParam } = route.params || {};
  const regexCorreo = /^[A-Za-z0-9._%+-]{5,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const [cargando, setCargando] = useState(false);
  const [correo, setCorreo] = useState(correoParam || "");
  
  useEffect(() => {
    if (correoParam) {
      setCorreo(correoParam);
    }
  }, [correoParam]);

const enviarCorreo = async () => {
  if (!correo || (correo !== "8" && !regexCorreo.test(correo))) {
    const msg = 'Ingresa un correo válido';
    Platform.OS === 'web' ? alert(msg) : Alert.alert('Error', msg);
    setCorreo("");
    return;
  }

  const codigo = Math.floor(1000 + Math.random() * 9000).toString();
  let exito = false;
  setCargando(true);

  try {
    const resultado = await enviarCodigoCorreo({ correo, codigo });
    exito = resultado.exito;

    if (exito) {
      // Si se logró enviar el correo
      if (Platform.OS === 'web') {
        alert(`Éxito enviando... se ha enviado correctamente el código al correo: ${correo}`);
        setTimeout(() => navigation.navigate('VerificarID', { modo, correo, codigo }), 100);
      } else {
        Alert.alert(
          'Éxito enviando...',
          `Se ha enviado correctamente el código al correo: ${correo}`,
          [{ text: 'Continuar', onPress: () => navigation.navigate('VerificarID', { modo, correo, codigo }) }],
          { cancelable: false }
        );
      }
    } else {
      // Si no se pudo enviar el correo
      const mensaje = `No se pudo enviar el correo... pero puedes continuar con el código: ${codigo}`;

      if (Platform.OS === 'web') {
        alert(mensaje);
        navigation.navigate('VerificarID', { modo, correo, codigo })
      } else {
        Alert.alert(
          'No se pudo enviar el correo...',
          mensaje,
          [{ text: 'Continuar', onPress: () => navigation.navigate('VerificarID', { modo, correo, codigo }) }],
          { cancelable: false }
        );
      }
    }
  } catch (error) {
    // Maneja cualquier error adicional aquí
    console.error("Error al intentar enviar el correo: ", error);
  } finally {
    // Ocultar indicador de carga al finalizar
    setCargando(false);
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
            style={[estilos.botonChico, { backgroundColor: '#454545ff' }]}>
            <Text style={[estilos.textoBotonChico, { fontSize: 17 }]}>Regresar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={enviarCorreo} style={estilos.botonChico}>
            <Text style={[estilos.textoBotonChico, { fontSize: 17 }]}>Mandar correo</Text>
          </TouchableOpacity>
        </View>

        {cargando && (
          <View style={{ marginTop: 15, alignItems: "center" }}>
            <ActivityIndicator size="small" />
            <Text style={{ marginTop: 6 }}>Enviando correo...</Text>
          </View>
        )}
        
      </SafeAreaView>
    </LinearGradient>
  );
}
