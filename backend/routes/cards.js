const cardsRouter = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const urlPattern = require('../utils/regexp');

const { getCards, createCard } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    descriptionFirst: Joi.string().required().pattern(/^[A-Za-zА-Яа-яЁё]{2,40}$/),
    descriptionSecond: Joi.string().required().pattern(/^[A-Za-zА-Яа-яЁё]{2,40}$/),
  }),
}), createCard);

module.exports = cardsRouter;
