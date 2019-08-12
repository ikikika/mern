import React, { Component } from "react";

import api from "../services/api";

// const App = () => <div>App Works</div>;

class App extends Component {
  async componentDidMount() {
    const result = await api.call("post", "auth/login", {
      username: "user1",
      password: "password"
    });

    console.log(result);
  }
  render() {
    return <div>App Work111s</div>;
  }
}

export default App;
