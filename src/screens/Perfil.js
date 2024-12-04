import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  
} from "react-native";
import { db, auth } from "../firebase/config";
import Post from "../components/Post";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      posts: [],
    };
  }

  componentDidMount() {
    const user = auth.currentUser;
    if (user) {
      this.setState({
        email: user.email,
        username: user.displayName,
      });

      db.collection("posts")
        .where("email", "==", auth.currentUser.email)
        .onSnapshot((docs) => {
          let posts = [];
          docs.forEach((doc) => {
            posts.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          this.setState({ posts: posts });
        });
    }
  }

  handleDeletePost(postId) {
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Posteo eliminado correctamente.");
      })
      .catch((error) => {
        console.error("Error eliminando posteo:", error.message);
      });
  }

  handleLogout() {
    auth
      .signOut()
      .then(() => {
        console.log("Sesión cerrada correctamente.");
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error al cerrar la sesión:", error.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Mi Perfil</Text>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.profileHeader}>
            <Text style={styles.userText}>{this.state.email}</Text>
            <Text style={styles.userText}>
              Total de posteos: {this.state.posts.length}
            </Text>
          </View>
        </View>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Post data={item} />{" "}
              <TouchableOpacity
                style={styles.deleteboton}
                onPress={() => this.handleDeletePost(item.id)}
              >
                <Text style={styles.deleteText}>Eliminar Post</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.logoutboton}
          onPress={() => this.handleLogout()}
        >
          <Text style={styles.logoutbotonText}>CERRAR SESIÓN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a100d",
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#0a100d",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#38444D",
  },
  headerText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  userInfo: {
    backgroundColor: "#0a100d",
    padding: 20,
    margin: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  userText: {
    fontSize: 15,
    color: "white",
    marginBottom: 10,
    fontFamily: "Arial",
  },
  post: {
    backgroundColor: "#0a100d",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  postText: {
    fontSize: 20,
    color: "#E1E8ED",
    marginBottom: 10,
    fontFamily: "Arial",
  },
  deleteboton: {
    alignSelf: "flex-end",
    backgroundColor: "#902923",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  logoutboton: {
    backgroundColor: "",
    margin: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutbotonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default Profile;
