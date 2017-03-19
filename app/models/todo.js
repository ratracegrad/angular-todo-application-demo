'use strict';

const mongoose = require('mongoose');

// define model =================
const todoSchema = new mongoose.Schema({
  text : String,
  done: Boolean
});

module.exports = mongoose.model('Todo', todoSchema);