'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({

    title: String,
    author: {type: String, require: true},
    edition: Number,
    key_words: {type: String, require: true},
    description: {type: String, require: true},
    frequency: String,
    theme: String,
    published: String,
    copies: Number,
    available: Number,
    type: String

});

module.exports = mongoose.model('bom', schema)