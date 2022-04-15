const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlPattern = require('../utils/regexp');

const {
  getCurrentUserInfo,
} = require('../controllers/users');

usersRouter.get('/users/me', getCurrentUserInfo);

module.exports = usersRouter;
