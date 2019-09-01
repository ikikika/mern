import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getPolls, getUserPolls } from "../store/actions";

class Polls extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { getPolls } = this.props;
    getPolls();
  }

  handleSelect(id) {
    const { history } = this.props;
    history.push(`/poll/${id}`);
  }

  render() {
    const { auth, getPolls, getUserPolls } = this.props;

    const polls = this.props.polls.map(poll => (
      <li key={poll._id} onClick={() => this.handleSelect(poll._id)}>
        {poll.question}
      </li>
    ));
    return (
      <Fragment>
        {auth.isAuthenticated && (
          <div>
            <button onClick={getPolls}>All Polls</button>
            <button onClick={getUserPolls}>My Polls</button>
          </div>
        )}
        <ul>{polls}</ul>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.auth,
  polls: store.polls
});

export default connect(
  mapStateToProps,
  { getPolls, getUserPolls }
)(Polls);
