const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodeToken = jwt.verify(token, 'secret_of_jwt');
      req.userData = {
        username: decodeToken.username,
        userId: decodeToken.id,
        role: decodeToken.role
      };
      next();
    } catch (err) {
      res.status(401).json({ message: "Authentication failed."});
    }
  };