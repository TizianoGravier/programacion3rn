import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  
} from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      cargando: true,
      error: false,
      query: "", 
      filteredPosts: [], 
    };
  }

  componentDidMount() {
    db.collection('posts').orderBy('createdAt','desc').onSnapshot((docs) => {
      let post = []
      docs.forEach(doc => {
          post.push({
              id : doc.id,
              data: doc.data()
          })
      })
      this.setState({ posts: post , filteredPosts: post, cargando: false})
  })
  }

  handleSearch = (query) => {
    
    const filteredPosts = this.state.posts.filter(
      (post) =>
        post.data.email.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ query: query, filteredPosts });
  };

  render() {
    const { cargando, filteredPosts, error, query } = this.state;

    if (cargando) {
      return (
        <View style={styles.cargandoContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text>Actualizando feed...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Mi Red Social</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={query}
            onChangeText={this.handleSearch}
          />
        </View>
        {error ? (
          <Text style={styles.errorText}>Ha ocurrido un error.</Text>
        ) : filteredPosts.length > 0 ? (
          <FlatList
            data={filteredPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Post data={item} />}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.noPostsText}>No encontramos esos datos de registro.</Text>
        )}
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
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "transparent", 
    padding: 15,
    borderRadius: 10,
  },
  heading: {
    fontSize: 42, 
    fontWeight: "bold",
    color: "white", 
  },
  searchInput: {
    flex: 1, 
    height: 75,
    borderRadius: 8,
    marginLeft: 10,
    backgroundColor: "white", 
    color: "black", 
    fontSize: 20, 
    fontWeight: 'bold'
  },
  cargandoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  noPostsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#8899A6",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#E0245E", 
  },
});

export default Home;
