import React, { useState } from 'react';
import { TextInput, Alert, Text, View, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { estilos } from '../estilos/styles';  
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PantallaRegistrarse({ navigation, route }) {
  const { correo } = route.params || {};
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState(''); 
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  const roles = [
    'Estudiante universitario',
    'Egresado/a de una carrera',
    'Docente/orientador',
    'Estudiante explorando opciones de carreras'
  ];


  const registrar = async () => {
  let mensajeError = null;

  if (
    (usuario?.trim?.() ?? '') === '' ||
    (contrasena?.trim?.() ?? '') === '' ||
    (correo?.trim?.() ?? '') === ''
  ) {
    mensajeError = "Por favor, completa todos los campos";
  } else if (!/^.{6,}$/.test(usuario)) {
    mensajeError = "El usuario debe tener al menos 6 caracteres";
  } else if (!/^(?=.*\d).{6,}$/.test(contrasena)) {
    mensajeError = "La contraseña debe tener al menos 6 caracteres y contener un número";
  } else if (!rolSeleccionado) {
    mensajeError = "Por favor, selecciona un rol";
  }

if (mensajeError) {
  if (Platform.OS === 'web') {
    alert(mensajeError);
  } else {
    Alert.alert("Error", mensajeError);
  }
  return;
}

    try {
      // aquí va la lógica para registrar en base de datos

      const rolTexto = roles[rolSeleccionado];

      if (Platform.OS === 'web') {
        alert('Cuenta creada correctamente');
        navigation.navigate('MenuPrincipal', { usuario, contrasena, correo, rolSeleccionado, rolTexto });
      } else {
        Alert.alert(
          'Éxito',
          'Cuenta creada correctamente',
          [
            { text: 'Continuar', onPress: () => navigation.navigate('MenuPrincipal', { usuario, contrasena, correo, rolSeleccionado, rolTexto }) }
          ],
          { cancelable: false }
        );
      }
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

        <View style={estilos.contenedorRoles}>
          <Text style={estilos.subtitulo}>Selecciona el rol que mejor te represente</Text>
          {roles.map((rol, index)=>(
            <TouchableOpacity key={index} style={estilos.rolOpcion} onPress={()=>setRolSeleccionado(index)}>
              <View style={estilos.rolCirculo}>{rolSeleccionado===index&&<View style={estilos.rolCirculoSeleccionado}/>}</View>
              <Text style={estilos.textoRol}>{rol}</Text>
            </TouchableOpacity>
          ))}
        </View>

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
