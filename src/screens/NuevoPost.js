import React, { Component } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { db, auth } from '../firebase/config'; 
import firebase from 'firebase'; 

class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensaje: '',
    };
  }

  handleSubmit = () => {
    const { mensaje } = this.state;
    const userEmail = auth.currentUser ? auth.currentUser.email : 'Anónimo';
    if (mensaje != '') {
      db.collection('posts')
      .add({
        mensaje: mensaje,
        email: userEmail,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes: []
      })
      .then(() => {
        Alert.alert('Posteo creado', 'Tu posteo está publicado');
        this.setState({ mensaje: '' }); 
      })
      .catch((error) => {
        console.error('Error al crear el posteo:', error.mensaje);
        Alert.alert('No se pudo guardar el posteo');
      });
    }   
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Nuevo Post!</Text>
        <TextInput
          style={styles.data}
          placeholder="Escribe posteo..."
          multiline={true}
          onChangeText={(text) => this.setState({ mensaje: text })}
          value={this.state.mensaje}
        />
        <TouchableOpacity style={styles.boton} onPress={this.handleSubmit}>
          <Text style={styles.botonText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0a100d", 
    flexDirection: 'column',
    justifyContent: 'center'
  },
  heading: {
    marginBottom: 20,
    fontSize: 42, 
    fontWeight: "bold",
    color: "white", 
    textAlign: "center",
  },
  data: {
    height: 100,
    borderColor: "black", 
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "white", 
    color: "black", 
    fontSize: 16,
  },
  boton: {
    backgroundColor: "#902923", 
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  botonText: {
    color: "#ffffff", 
    fontSize: 18,
    fontWeight: "600",
  },
});

export default NuevoPost;
