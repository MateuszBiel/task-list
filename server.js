// server.js

// set up ========================
var express = require('express');
var app = express(); // create our app w/ express

var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var ip = require('ip');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var Todo = require('./db-model.js');
require('./server-rest-CRUD.js');
var socketIo = require('./server-socketio-CRUD.js');

// var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
// configuration =================



app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/node_modules')); // set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
// app.use(methodOverride());

// routes ======================================================================
// define model =================




// api ---------------------------------------------------------------------
// get all taskList


// application -------------------------------------------------------------
// app.get('*', function(req, res) {
//     res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });


// socket API

// ORM functions

var addresses = ip.address();

io.on('connect', function(socket) {
    socket.on('getTaskListIo', function() {
        console.log('getTaskListIo just list');
        socketIo.getTasksList(io);
        //console.log("some logs");
        //console.log(tmp);
        // io.emit('getTaskListIo', tmp);
    });
    socket.on('getTaskIo', function(msg) {
        console.log('2 getTaskListIo');
        socketIo.getTask(msg, io);
        // console.log("some logs");
        //console.log(tmp);
        // io.emit('getTaskIo', tmp);
    });
    socket.on('addNewTaskIo', function(msg) {
        console.log('addNewTaskIo');
        // console.log(msg);
        socketIo.addTask(msg, io);
        // console.log("some logs");
        //console.log(tmp);
        // io.emit('getTaskListIo', tmp);
    });
    socket.on('removeTaskIo', function(msg) {
        console.log('removeTaskIo');
        // console.log(msg);
        socketIo.removeTask(msg, io);
        // console.log("some logs");
        //console.log(tmp);
        // io.emit('getTaskListIo', tmp);
    });
    socket.on('updateTaskIo', function(msg) {
        console.log("updateTaskIo");
        socketIo.updateTask(msg, io);
    })
    socket.on('getTaskListIo', function(data) {
        console.log(data);
    });
    

});

exports.testCaseSocket= io;

console.log(exports.testCaseSocket);


http.listen(8080, function() {
    console.log(addresses + ':8080');
});
// // // listen (start app with node server.js) ======================================
// app.listen(8080);
// console.log(addresses + ":8080");
