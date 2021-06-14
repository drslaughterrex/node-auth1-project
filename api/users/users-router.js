// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */

// Don't forget to add the router to the `exports` object so it can be required in other modules
const { Router } = require("express");
const { restricted } = require("../auth/auth-middleware.js");
const router = Router();
const users = require("./users-model.js");

router.get("/", restricted, (req, res, next) => {
	users
		.find()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch(next);
});

module.exports = router;
