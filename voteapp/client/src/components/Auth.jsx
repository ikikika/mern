import React, { Component } from "react";
import { connect } from "react-redux";

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

  handleChange() {}

  handleSubmit() {}

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label for="username">Username</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={this.handleChange}
          />

          <label for="password">Password</label>
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

export default Auth;
