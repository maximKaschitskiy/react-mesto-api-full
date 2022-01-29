const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlPattern = require('../utils/regexp');

const {
  getCards, createCard, likeCard, deleteCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(urlPattern),
    }),
  }),
  createCard,
);

cardsRouter.put(
  '/cards/:_id/likes',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  likeCard,
);

cardsRouter.delete(
  '/cards/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteCard,
);

cardsRouter.delete(
  '/cards/:_id/likes',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  dislikeCard,
);

module.exports = cardsRouter;
