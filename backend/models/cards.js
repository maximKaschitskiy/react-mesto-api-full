const mongoose = require('mongoose');
const urlPattern = require('../utils/regexp');

const cardSchema = new mongoose.Schema({
  descriptionFirst: {
    type: String,
    required: [true, 'Обязательное поле'],
    minlength: 2,
    maxlength: 50,
    validate: {
      validator: function(v) {
        return /^[A-Za-z]{2,50}$/.test(v);
      },
      message: props => `${props.value} Цифры недопустимы`
    },
  },
  descriptionSecond: {
    type: String,
    required: [true, 'Обязательное поле'],
    minlength: 2,
    maxlength: 50,
    validate: {
      validator: function(v) {
        return /^[A-Za-z]{2,50}$/.test(v);
      },
      message: props => `${props.value} Цифры недопустимы`
    },
  },
  file: {
    type: String,
    required: [true, 'Обязательное поле'],
  }
});

module.exports = mongoose.model('card', cardSchema);
