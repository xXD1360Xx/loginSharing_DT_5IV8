import React, { useState } from 'react';
import { TextInput, Alert, Text, View, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { estilos } from '../estilos/styles';  
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PantallaReset({ navigation }) {
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState(''); 


  const limpiarContrasena = async () => { 
    setContrasena('');
    setConfirmarContrasena('');
  }

  const cambiarContrasena = async () => { 
    if (contrasena !== confirmarContrasena) {
      if (Platform.OS === 'web') {
        alert('Las contraseñas no coinciden. Por favor, intenta de nuevo.');
      } else {
        Alert.alert('Error', 'Las contraseñas no coinciden. Por favor, intenta de nuevo.', [{ text: 'Reintentar', onPress: limpiarContrasena }], { cancelable: false });
      }
      return;
    }

    try {
      // Aquí ira la lógica para actualizar la contraseña en la base de datos
      if (Platform.OS === 'web') {
        alert('Contraseña actualizada correctamente.');
        navigation.navigate('MenuPrincipal');
      } else {
        Alert.alert(
          'Éxito',
          'Contraseña actualizada correctamente.',
          [
            { text: 'Continuar', onPress: () => navigation.navigate('MenuPrincipal') }
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        alert('Error al actualizar la contraseña: ' + error.message);
      } else {
        Alert.alert('Error', 'Error al actualizar la contraseña: ' + error.message);
      }
    }
  };

  return (
    <LinearGradient colors={['#000000ff', '#ffffffff', '#000000ff']} style={{ flex: 1 }}>
      <SafeAreaView style={estilos.contenedorPrincipal}>

        <Text style={[estilos.titulo, { fontSize: 22 }]}>Reestablecer contraseña</Text>
        <Text style={[estilos.subtitulo, { fontSize: 12 }]}>Crea tu nueva contraseña</Text>

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

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[estilos.botonChico, { backgroundColor: "#454545ff" }]}
          >
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
