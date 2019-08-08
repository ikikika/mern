const db = require("../models");

exports.showPolls = async (req, res, next) => {
  try {
    const polls = await db.Poll.find().populate("user", ["username", "id"]);
    return res.status(200).json(polls);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.usersPolls = async (req, res, next) => {
  const { id } = req.decoded;
  try {
    const user = await db.User.findById(id).populate("polls");

    return res.status(200).json(user.polls);
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.createPoll = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const user = await db.User.findById(id);

    const { question, options } = req.body;
    const poll = await db.Poll.create({
      question,
      user,
      options: options.map(option => ({ option, votes: 0 }))
    });
    user.polls.push(poll._id);
    await user.save();

    return res.status(201).json({ ...poll._doc, user: user._id });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.getPoll = async (req, res, next) => {
  try {
    const { id } = req.params;

    const poll = await db.Poll.findById(id).populate("user", [
      "username",
      "id"
    ]);

    if (!poll) throw new Error("No poll found");

    return res.status(200).json(poll);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.deletePoll = async (req, res, next) => {
  try {
    const { id: pollId } = req.params;
    const { id: userId } = req.decoded;

    const poll = await db.Poll.findById(pollId);

    if (!poll) throw new Error("No poll found");
    if (poll.user.toString() !== userId) {
      throw new Error("Unauthroised access");
    }

    await poll.remove();

    return res.status(202).json(poll);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};
