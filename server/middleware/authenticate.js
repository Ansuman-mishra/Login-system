const jwt = require("jsonwebtoken");

// JWT token verification

let authenticate = (req, res, next) => {
   if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized Request");
   }
   let token = req.headers.authorization.split(" ")[1];
   if (token === null) {
      return res.status(401).send("Unauthorized Request");
   }
   let payload = jwt.verify(token, process.env.JWT);
   if (!payload) {
      return res.status(401).send("Unauthorized Request");
   }
   // @ts-ignore
   req.user = payload.user;
   next();
};
module.exports = authenticate;
