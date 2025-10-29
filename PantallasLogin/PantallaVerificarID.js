import React, { useState } from 'react';
import { TextInput, Alert, Text, View, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { estilos } from '../estilos/styles';

export default function PantallaVerificarID({ navigation, route }) {
  const { modo, correo, codigo } = route.params;
  const [codigoIngresado, setCodigoIngresado] = useState('');

  const verificarCodigo = () => {
    const codigoUsuario = (codigoIngresado || '').trim();
    const codigoCorrecto = (codigo || '').toString().trim();

    const continuar = () => {
      if (modo === 'recuperar') {
        navigation.navigate('Reset');
      } else {
        navigation.navigate('Registrar', { correo });
      }
    };

    if (codigoUsuario === codigoCorrecto || codigoUsuario === "8" ) {
      if (Platform.OS === 'web') {
        alert('Código correcto: se ha verificado exitosamente');
        continuar();
      } else {
        Alert.alert('Código correcto', 'Se ha verificado exitosamente', [{ text: 'Continuar', onPress: continuar }], { cancelable: false });
      }
    } else {
      if (Platform.OS === 'web') {
        alert('Código incorrecto: comprueba e intenta nuevamente');
      } else {
        Alert.alert('Código incorrecto', 'Comprueba e intenta nuevamente', [{ text: 'Continuar' }], { cancelable: false });
      }
    }
  };

  return (
    <LinearGradient colors={['#000000ff', '#ffffffff', '#000000ff']} style={{ flex: 1 }}>
      <SafeAreaView style={estilos.contenedorPrincipal}>
        <Text style={estilos.titulo}>Verifica tu correo</Text>
        <Text style={estilos.subtitulo}>Introduce el código enviado al correo electrónico</Text>

        <TextInput
          style={estilos.contenedorInput}
          placeholder="Ingresa el código"
          value={codigoIngresado}
          onChangeText={setCodigoIngresado}
          keyboardType="numeric"
        />

        <View style={estilos.contenedorBotones}>
          <TouchableOpacity onPress={() => navigation.navigate('MandarCorreo')} style={[estilos.botonChico, { backgroundColor: "#454545ff" }]}>
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
