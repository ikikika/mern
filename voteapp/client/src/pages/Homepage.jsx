import React from "react";

import Polls from "../components/Polls";
import ErrorMessage from "../components/ErrorMessage";

const Homepage = props => (
  <div>
    <h1>Home</h1>
    <ErrorMessage />
    <Polls {...props} />
  </div>
);

export default Homepage;
