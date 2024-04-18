const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
});

const Book = mongoose.model("bookrecord", bookSchema);

module.exports = Book;