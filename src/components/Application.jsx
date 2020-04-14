import React, { Component } from "react";

import Posts from "./Posts";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

class Application extends Component {
  state = {
    posts: [],
  };

  unSubscribe = null;

  componentDidMount = async () => {
    // // snapshot - represents database state in that moment (real-time)
    // const snapshot = await firestore.collection("posts").get();
    // // console.log({ snapshot });
    // // snapshot -> documents [rows] -> data
    // const posts = snapshot.docs.map(collectIdsAndDocs);
    // this.setState({ posts });

    // subscribe to the data instead
    // @returns - a function you can call to unsubsribe to the database.
    this.unSubscribe = firestore.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => {
    this.unSubscribe();
  };

  handleRemove = async (id) => {
    const allPosts = this.state.posts;

    // remove from db using path
    await firestore.doc(`posts/${id}`).delete();

    // new array without post with id
    const posts = allPosts.filter((post) => post.id !== id);

    this.setState({ posts });
  };

  handleCreate = async (post) => {
    const { posts } = this.state;

    await firestore.collection("posts").add(post); // componentdidmount subscribed to database live pulls new data

    // // inserts post to the database and returns path to document.
    // const docRef = await firestore.collection("posts").add(post);
    // // fetch post returns a document* snapshot promise
    // const doc = await docRef.get();
    // // extract data from promise snapshot
    // const newPost = collectIdsAndDocs(doc);
    // this.setState({ posts: [newPost, ...posts] });
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts
          posts={posts}
          onCreate={this.handleCreate}
          onRemove={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
