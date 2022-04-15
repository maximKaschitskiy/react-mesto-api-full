const jwt = require('jsonwebtoken');

const { JWT_MODE } = require('../utils/config.js');
const { Unauthorized } = require('../errors/unauthorized');

const auth = (req, res, next) => {
  console.log(req.headers);
  const { authorization } = req.headers;
  let token = null;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Неверный токен'));
  }
  token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_MODE);
  } catch (err) {
    return next(new Unauthorized('Неавторизовано'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
