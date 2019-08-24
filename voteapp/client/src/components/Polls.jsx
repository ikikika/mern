import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getPolls, getUserPolls, getCurrentPoll } from "../store/actions";

class Polls extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getPolls } = this.props;
    getPolls();
  }

  handleSelect(id) {
    const { getCurrentPoll } = this.props;
    getCurrentPoll(id);
  }

  render() {
    const polls = this.props.polls.map(poll => (
      <li key={poll._id} onClick={() => this.handleSelect(poll._id)}>
        {poll.question}
      </li>
    ));
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

const mapActionsToProps = { getPolls, getUserPolls, getCurrentPoll };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Polls);
