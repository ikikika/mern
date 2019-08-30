import React from "react";

import Polls from "../components/Polls";
import ErrorMessage from "../components/ErrorMessage";

const Homepage = () => (
  <div>
    <h1>Home</h1>
    <ErrorMessage />
    <Polls />
  </div>
);

export default Homepage;
