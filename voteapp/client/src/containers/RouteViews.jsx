import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import { getCurrentPoll } from "../store/actions";

import AuthPage from "../pages/AuthPage";
import TestPage from "../pages/TestPage";
import Homepage from "../pages/Homepage";
import PollPage from "../pages/PollPage";

const RouteViews = ({ auth, getCurrentPoll }) => (
  <main>
    <Switch>
      <Route exact path="/" render={props => <Homepage {...props} />} />
      <Route
        exact
        path="/login"
        render={() => (
          <AuthPage authType="login" isAuthenticated={auth.isAuthenticated} />
        )}
      />
      <Route
        path="/register"
        render={() => (
          <AuthPage
            authType="/register"
            isAuthenticated={auth.isAuthenticated}
          />
        )}
      />
      <Route
        exact
        path="/poll/:id"
        render={props => (
          <PollPage getPoll={id => getCurrentPoll(id)} {...props} />
        )}
      />
      <Route exact path="/test" render={() => <TestPage />} />
    </Switch>
  </main>
);

const mapStateToProps = store => ({ auth: store.auth });

export default withRouter(
  connect(
    mapStateToProps,
    { getCurrentPoll }
  )(RouteViews)
);
