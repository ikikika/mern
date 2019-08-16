import React, { Component } from "react";
import { connect } from "react-redux";

import { authUser, logout } from "../store/actions";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this); // if we use arrow function for handleChange, we dun need this line
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;
    const { authType } = this.props;

    this.props.authUser(authType, { username, password });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={this.handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={this.handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  { authUser, logout }
)(Auth);
