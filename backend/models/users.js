const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const { Unauthorized } = require('../errors/unauthorized');
const urlPattern = require('../utils/regexp');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true,
    index: true,
    minlength: 2,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function userFind(login, password) {
  return this.findOne({ login })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неверный логин или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new Unauthorized('Неверный логин или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
