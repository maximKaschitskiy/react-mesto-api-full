const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlPattern = require('../utils/regexp');

const {
  getUsers, getUserId, getCurrentUserInfo, updateUser, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getCurrentUserInfo);

usersRouter.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  }),
  getUserId,
);

usersRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

usersRouter.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(urlPattern),
    }),
  }),
  updateAvatar,
);

module.exports = usersRouter;
