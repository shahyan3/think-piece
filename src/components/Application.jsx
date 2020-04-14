import React, { Component } from "react";

import Posts from "./Posts";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";
import Authentication from "./Authentication";
import { auth } from "firebase";

class Application extends Component {
  state = {
    posts: [],
    user: null,
  };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    // subscribe to the data instead
    // @returns - a function you can call to unsubsribe to the database updates realtime.
    this.unsubscribeFromFirestore = firestore
      .collection("posts")
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ posts });
      });

    // invoked everytime user froms from logged-out/logged-in and logged-in/logged-out
    // @return user object or null
    this.unsubscribeFromAuth = auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
