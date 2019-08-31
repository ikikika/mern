import React from "react";
import { connect } from "react-redux";

import { vote } from "../store/actions";

const Poll = ({ poll, vote }) => {
  const answers =
    poll.options &&
    poll.options.map(option => (
      <button
        onClick={() => vote(poll._id, { answer: option.option })}
        key={option._id}
      >
        {option.option}
      </button>
    ));

  return (
    <div>
      <h3>{poll.question}</h3>
      <div>{answers}</div>
    </div>
  );
};

const mapStateToProps = store => ({ poll: store.currentPoll });

const mapActionsToProps = { vote };
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Poll);
