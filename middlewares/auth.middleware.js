const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log("reached");
  try {
    let token = req.headers['authorization']
   // const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({
        message: "jwt must be provided",
      });
      token = token.slice(7);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res.status(401).json({
          message: "Invalid Authentication.",
        });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
