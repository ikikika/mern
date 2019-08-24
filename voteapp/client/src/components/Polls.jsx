import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getPolls, getUserPolls } from "../store/actions";

class Polls extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getPolls } = this.props;
    getPolls();
  }

  render() {
    const polls = this.props.polls.map(poll => <li>{poll.question}</li>);
    return (
      <Fragment>
        <ul>{polls}</ul>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.auth,
  polls: store.polls
});

const mapActionsToProps = { getPolls, getUserPolls };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Polls);
