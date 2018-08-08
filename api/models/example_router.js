const mongoose = require('mongoose');

const example_schema = mongoose.Schema({
    example_column_one: String,
    example_column_two: Number,
    example_column_three: String
});

module.exports = mongoose.model('ExampleSchema', example_schema);