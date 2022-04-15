const Card = require('../models/cards');
const {
  BadRequest
} = require('../errors/badRequest');
const {
  Forbidden
} = require('../errors/forbidden');
const {
  NotFound
} = require('../errors/notFound');
const fs = require('fs');
const path = require('path');
const fileTypes = require('../utils/filetypes');


const getCards = (req, res, next) => {
  Card.find({})
    .sort({
      _id: -1
    })
    .limit(1)
    .then((cards) => {
      if (cards.length === 0) {
        res.status(200).send({ message: 'База пуста' })
      } else {
        res.status(200).send(cards)
      }
    })
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {

  if (req.files.length !== 1) {
    next(
      new BadRequest('Ошибка валидации'),
    );
  }

  const [file] = req.files;

  if (!fileTypes.includes(file.mimetype) || file.size > 5242880) {
    next(
      new BadRequest('Ошибка валидации'),
    );
  }

  const object = {
    descriptionFirst: req.body.descriptionFirst,
    descriptionSecond: req.body.descriptionSecond,
    file: req.protocol + "://" + req.get('host') + "/" + file.filename
  };

  Card.create(object)
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные'),
        );
      }
      next(err);
    })
    .catch((err) => next(err));
};

module.exports = {
  getCards,
  createCard,
};