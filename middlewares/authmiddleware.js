const jwt = require("jsonwebtoken");
const client = require("../configs/db");

//whenever a user wants to do modification to his notes then he must be a authorised user for that this verifytoken will chech whether user is authorised user or not
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Server error occured!" });
    }
    const userEmail = decoded.email; //mail assoicated with the token

    client
      .query(`SELECT * FROM users WHERE email = '${userEmail}';`)
      .then((data) => {
        if (data.rows.length === 0) {
          res.status(400).json({ message: "Invalid token" });
        } else {
          req.email = userEmail;
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Database error occured" });
      });
  });
};
