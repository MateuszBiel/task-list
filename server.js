// server.js

// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var os = require('os');
// configuration =================

mongoose.connect('mongodb://localhost:/data/db'); // connect to mongoDB database on modulus.io


app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/node_modules')); // set the static files location /public/img will be /img for users

app.use('/node_modules', express.static(__dirname + '/node_modules'));


app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());

// routes ======================================================================
// define model =================
var Todo = mongoose.model('taskList', {
    text: String,
    priority: String
});
// api ---------------------------------------------------------------------
// get all taskList
app.get('/api/taskList', function(req, res) {

    // use mongoose to get all taskList in the database
    Todo.find(function(err, taskList) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(taskList); // return all taskList in JSON format
    });
});

// create todo and send back all taskList after creation
app.post('/api/taskList', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text: req.body.text,
        priority: req.body.text,
        done: false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the taskList after you create another
        Todo.find(function(err, taskList) {
            if (err)
                res.send(err)
            res.json(taskList);
        });
    });

});

// delete a todo
app.delete('/api/taskList/:taskList_id', function(req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the taskList after you create another
        Todo.find(function(err, taskList) {
            if (err)
                res.send(err)
            res.json(taskList);
        });
    });
});

// application -------------------------------------------------------------
// app.get('*', function(req, res) {
//     res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log(addresses + ":8080");
