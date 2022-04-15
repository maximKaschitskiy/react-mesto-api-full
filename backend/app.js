require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { celebrate, Joi, errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { getCards, createCard } = require('./controllers/cards');
const auth = require('./middlewares/auth');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { Unauthorized } = require('./errors/unauthorized');
const { NotFound } = require('./errors/notFound');
const corsMiddleware = require('./middlewares/corsMiddleware');
const urlPattern = require('./utils/regexp');
const multer = require('multer');
const storage = require('./middlewares/upload');

const { PORT = 3001 } = process.env;

const app = express();

app.use(express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Сервер стартовал. Порт: ${PORT}`);
});

app.use(corsMiddleware);

mongoose.connect('mongodb://localhost:27017/emg-test', { autoIndex: true })
  .then(() => console.log('Подключение к БД удалось'))
  .catch(() => console.log('Подключение к БД не удалось'));

mongoose.connection.on('open', () => console.log('Подключение к БД активно'));
mongoose.connection.on('error', () => console.log('Подключение к БД прервано'));
mongoose.set('autoIndex', true);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.get('/cards', getCards);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      login: Joi.string().required().min(5).max(30),
      password: Joi.string().required().min(8).max(30),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      login: Joi.string().required().min(5).max(30),
      password: Joi.string().required().min(8).max(30),
    }),
  }),
  createUser,
);

app.use(auth);

app.use(multer(storage).any());

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use(errors());

app.use('*', (req, res, next) => {
  if (!req.user) {
    return next(new Unauthorized('Неавторизовано'));
  }
  return next(new NotFound('Не найдено'));
});

app.use(errorMiddleware);
