import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase/app";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conteo: 0,
      miLike: this.props.data.data.likes.includes(auth.currentUser.email),
      likes: this.props.data.data.likes.length,
      datosUsuario: {},
    };
  }
  componentDidMount() {
    db.collection("users")
      .where("mail", "==", this.props.data.data.email)
      .onSnapshot((data) => {
        data.forEach((doc) => {
          console.log(doc.data());
          this.setState({ datosUsuario: doc.data() });
        });
      });
  }
  Likear() {
    db.collection("posts")
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({
          likes: this.props.data.data.likes.length,
          miLike: true,
        });
      });
  }
  Deslikear() {
    db.collection("posts")
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() => {
        this.setState({
          likes: this.props.data.data.likes.length,
          miLike: false,
        });
      });
  }
  render() {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.email}>Usuario: {this.props.data.data.email}</Text>
        <Text style={styles.mensaje}>{this.props.data.data.mensaje}</Text>
        <View style={styles.fyl}>
          <Text style={styles.fecha}>
            {this.props.data.data.createdAt
              ? "Fecha :" +
                this.props.data.data.createdAt.toDate().toLocaleString()
              : "Fecha desconocida"}
          </Text>

          {this.state.miLike ? (
            <TouchableOpacity
              style={[styles.botonLikeDos]}
              onPress={() => this.Deslikear()}
            >
              <Text style={styles.botonLikeTres}>{"</3"}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.botonLike]}
              onPress={() => this.Likear()}
            >
              <Text style={styles.botonLikeTres}>{"<3"}</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.likes}>
          {this.props.data.data.likes.length
            ? this.props.data.data.likes.length
            : 0}{" "}
          Likes
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#d6d5c9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  email: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18,
    color: "black",
    textDecorationLine: "underline",
  },
  mensaje: {
    marginBottom: 10,
    fontSize: 20,
    color: "black",
    fontWeight: "600",
  },
  fecha: {
    fontSize: 14,
    color: "black",
    marginBottom: 10,
  },
  likes: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  botonLike: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 60
  },
  botonLikeDos: {
    backgroundColor: "#902923",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 60
  },
  botonLikeTres: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  fyl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default Post;
