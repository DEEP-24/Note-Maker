const express = require("express");
const { signUp, signIn } = require("../controllers/auth");
const router = express.Router();

//route to sigin
router.post("/signup", signUp);

//route to signup when a user is new
router.post("/signin", signIn);
module.exports = router;

//localhost: 8000 / auth / signin;
//localhost: 8000 / auth / signup;
