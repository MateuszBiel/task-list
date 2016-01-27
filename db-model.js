var mongoose = require('mongoose'); // mongoose for mongodb
mongoose.connect('mongodb://localhost:/data/db'); // connect to mongoDB database on modulus.io
exports.dbConnection= Todo;
var Todo = mongoose.model('taskList', {
    text: String,
    priority: Object,
    date: Date,
    radio: String,
    description: String
});


exports.Todo = Todo;