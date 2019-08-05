const router = require("express").Router();

const handle = require("../handlers");

router
  .route("/")
  .get(handle.showPolls)
  .post(handle.createPoll);

module.exports = router;
