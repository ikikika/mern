import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getPosts } from "../store/actions/postsAction";

class Posts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
    const abc = this.props.getPosts;
    abc();
  }

  render() {
    const posts = this.props.posts.map(post => {
      return <li key={post.id}>{post.content}</li>;
    });

    return (
      <Fragment>
        <h1>Posts</h1>
        <ul>{posts}</ul>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  posts: store.posts
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
