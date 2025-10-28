import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
const { width } = Dimensions.get('window');

const escalaWeb = Platform.OS === 'web' ? 0.83 : 1;

export const estilos = StyleSheet.create({
  fondo: { flex: 1 },


  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffffff", 
    marginBottom: 10,
    textAlign: "center",
  },

  subtitulo: {
        fontSize: 10,
    color: "#ffffffff", 
    marginBottom: 30,
    textAlign: "center",
  },

  contenedorPrincipal: {
    flex: 1,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 20,
    width: Platform.OS === 'web' ? 330 * escalaWeb : width,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
    padding: 12 * escalaWeb,
    marginVertical: Platform.OS === 'web' ? '1%' : 0,
  },

  contenedorInput: {
    width: '100%',
    minHeight: 90 * escalaWeb,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20 * escalaWeb,
    paddingVertical: 5 * escalaWeb,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 10 * escalaWeb,
    marginBottom: 30 * escalaWeb,
  },

  contenedorBotones: {
    flexDirection: 'row',      
    justifyContent: 'center',   
    alignItems: 'center',       
    gap: 10,                    
    marginTop: 20,
  },

  botonGrande: {
    width: 295 * escalaWeb,
    height: 70 * escalaWeb,
    justifyContent: 'center',
    alignItems: 'center',    
    backgroundColor: "#8a003a",    
    borderRadius: 30 * escalaWeb,
    boxShadow: '1px 1px 15px rgba(255, 77, 136, 0.5)',
  },

    textoBotonGrande: {
    fontSize: 30 * escalaWeb,
    color: '#ffffffff',
    fontWeight: 'bold',
    },

  botonChico: {
    width: 150 * escalaWeb,
    height: 50 * escalaWeb,
    justifyContent: 'center',
    alignItems: 'center',  
    flexDirection: 'row',      
    backgroundColor: "#8a003a",    
    borderRadius: 30 * escalaWeb,
    boxShadow: '1px 1px 15px rgba(255, 77, 136, 0.5)',
  },

    textoBotonChico: {
    fontSize: 20 * escalaWeb,
    color: '#ffffffff',
    fontWeight: 'bold', 
    textAlign: 'center',  
  },

  enlace: {
  color: '#ffffffff',
  textAlign: 'center',
  marginTop: 10,
  fontSize: 14,
  }



});
