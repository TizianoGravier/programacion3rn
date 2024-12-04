import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { auth } from "../firebase/config";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeMenu");
      } else {
        console.log("No hay usuario logueado.");
      }
    });
  }

  handleSubmit() {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.replace("HomeMenu");
      })
      .catch(() => {
        this.setState({ error: "Fallo el login. Verifique sus credenciales." });
      });
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.headerText}>Mi Red Social</Text>
        
       
        <Text style={styles.subHeading}>Ingresar</Text>
        
        {this.state.error ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}

        
        <TextInput
          style={styles.data}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="#8899A6"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.data}
          placeholder="Contraseña"
          placeholderTextColor="#8899A6"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        
        
        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={[styles.boton, styles.botonDos]}
        >
          <Text style={styles.botonText}>Entrar</Text>
        </TouchableOpacity>


        
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={[styles.boton, styles.Tres]}
        >
          <Text style={styles.botonCuatro}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a100d',
    padding: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 36, 
    fontWeight: "bold",
    color: "#fff", 
    textAlign: "center",
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 30, 
    fontWeight: "bold",
    color: "white", 
    textAlign: "left",
    marginBottom: 32,
  },
  data: {
    height: 50,
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
  botonDos: {
    backgroundColor: "#902923", 
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  botonTres: {
    backgroundColor: "#d6d5c9", 
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 15
  },
  botonCuatro: {
    color: "#",
    fontSize: 18,
    fontWeight: "600",
    textAlign: 'center'

  },
  linkText: {
    marginTop: 15,
    fontSize: 16,
    textAlign: "center",
    color: "#8899A6",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Login;
