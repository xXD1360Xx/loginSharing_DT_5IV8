
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Share, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { estilos } from '../estilos/styles';

let Sharing;
if (Platform.OS !== 'web') {
  Sharing = require('expo-sharing');
}

export default function PantallaPrincipal({ navigation, route }) {
  const [imageUri, setImageUri] = useState(null);
  const usuario = route?.params?.usuario || '';
  const correo = route?.params?.correo || '';
  const contrasena = route?.params?.contrasena || '';
  
  const seleccionarImagen = async () => {
    try {
      // en móvil pedimos permisos
      if (Platform.OS !== 'web') {
        const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permiso.granted) {
          Alert.alert('Permiso denegado', 'Se necesita acceso a tus fotos');
          return;
        }
      }

      // abrimos selector 
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets?.[0]?.uri || result.uri;
        if (uri) setImageUri(uri);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const compartir = async () => {
    if (!imageUri) {
      Alert.alert('Primero selecciona una imagen');
      return;
    }

    try {
      if (Platform.OS === 'web') {
        // Si es en web entonces intentamos usar API nativa del navegador
        if (navigator.share) {
          await navigator.share({
            title: 'Compartir imagen',
            text: 'Te comparto mi imagen de perfil',
            url: imageUri,
          });
        } else {
          Alert.alert('Tu navegador no soporta compartir');
        }
      } else if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(imageUri);
      } else {
        await Share.share({
          // Sino podemos enviar el archivo, enviamos el link
          title: 'Compartir imagen',
          message: 'Te comparto mi foto de perfil de Rumbo',
          url: imageUri,
        });
      }
    } catch (error) {
      Alert.alert('Error al compartir', error.message);
    }
  };

  
  const cerrarSesion = () => {
    Alert.alert('Cerrar sesión', '¿Deseas salir?', 
      [{text: 'Cancelar', style: 'cancel'}, 
      { text: 'Sí', onPress: () => navigation.replace('Login') }]);
  };

  


  return (
    <View style={estilos.fondo}>
      <View style={estilos.contenedorPrincipal}>
        <Text style={estilos.titulo}>Bienvenido {usuario}</Text>
        {correo ? <Text style={estilos.subtitulo}>{correo}</Text> : null}

        <TouchableOpacity onPress={seleccionarImagen} activeOpacity={0.8}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={nuevoEstilo.imagenPerfil} />
          ) : (
            <View style={nuevoEstilo.contenedorImagen}>
              <Image
                source={{
                  uri: 'https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg',
                }}
                style={nuevoEstilo.imagenDefault}
              />
            </View>
          )}
        </TouchableOpacity>

        <View style={estilos.contenedorBotones}>
          <TouchableOpacity style={estilos.botonChico} onPress={compartir}>
            <Text style={estilos.textoBotonChico}>Compartir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[estilos.botonChico, { backgroundColor: '#b00020' }]}
            onPress={cerrarSesion}
          >
            <Text style={estilos.textoBotonChico}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const nuevoEstilo = {
  imagenPerfil: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  imagenDefault: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  contenedorImagen: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
};
