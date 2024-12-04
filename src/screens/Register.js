import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase/config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      bio: "",
      usuario: "",
      error: "",
    };
  }

  handleSubmit() {
    const { usuario, email, password, bio } = this.state;

    console.log("Nombre de usuario:", usuario);
    console.log("Contraseña:", password);
    console.log("Email:", email);

    if (!usuario || usuario.length < 5) {
      this.setState({
        error: "El usuario debe tener más de 4 caracteres",
      });
      return;
    }
    if (!email || !email.includes("@")) {
      this.setState({ error: "El email no es correcto" });
      return;
    }
    if (!password || password.length < 6) {
      this.setState({
        error: "Su contraseña debe tener más de 6 caracteres",
      });
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return db.collection("users").add({
          email: email,
          usuario: usuario,
          bio: bio,
          createdAt: Date.now(),
        });
      })
      .then(() => {
        console.log("Su usuario fue registrado ");
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error al registrar usuario:", error.message);
        if (error.code === "auth/email-already-in-use") {
          this.setState({ error: "Este email ya existe" });
        } else {
          this.setState({
            error: "Error, vuelva a intentar",
          });
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Registrarse</Text>

        {this.state.error ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}
        <Text style={styles.labelText}> Usuario</Text>
        <TextInput
          style={styles.data}
          placeholder="Ingrese su usuario"
          onChangeText={(text) => this.setState({ usuario: text })}
          value={this.state.usuario}
        />
        <Text style={styles.labelText}> Email</Text>

        <TextInput
          style={styles.data}
          placeholder="Ingrese su email"
          keyboardType="email-address"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <Text style={styles.labelText}> Bio</Text>

        <TextInput
          style={styles.data}
          placeholder="Ingrese una bio"
          onChangeText={(text) => this.setState({ bio: text })}
          value={this.state.bio}
        />
        <Text style={styles.labelText}> Contraseña</Text>

        <TextInput
          style={styles.data}
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <View style={{marginTop: 25}}> 
        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={[styles.boton, styles.botonDos]}
        >
          <Text style={styles.botonCuatro}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={[styles.boton, styles.botonTres]}
        >
          <Text style={styles.botonCuatro}>Tengo cuenta</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0a100d",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
    textAlign: "center",
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
    marginTop: 15,
  },
  botonCuatro: {
    color: "#",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  error: {
    color: "#E0245E",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
  },
  labelText: {
    color: "white",
    fontSize: 20, 
    fontWeight: '600',
    marginBottom: 8
  },
});

export default Register;
