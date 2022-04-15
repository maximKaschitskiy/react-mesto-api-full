const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { BadRequest } = require('../errors/badRequest');
const { NotFound } = require('../errors/notFound');
const { Conflict } = require('../errors/conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = async (req, res, next) => {
  const {
    login, password,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  User.create({
    login, password: hash,
  })
    .then((user) => res.status(201).send({
      login: user.login,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest('Ошибка валидации'),
        );
      }
      if (err.code === 11000) {
        next(
          new Conflict('Пользователь существует'),
        );
      }
      next(err);
    })
    .catch((err) => next(err));
};

const getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(
          new NotFound('Пользователь не найден'),
        );
      }
      res.status(200).send(user);
    })
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { login, password } = req.body;
  console.log(login, password);
  if (!login || !password) {
    next(
      new BadRequest('Ошибка валидации'),
    );
  }
  User.findUserByCredentials(login, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch((err) => next(err));
};

module.exports = {
  createUser, getCurrentUserInfo, login,
};
