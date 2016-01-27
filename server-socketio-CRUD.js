var express = require('express');
var app = express(); // create our app w/ express

var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var ip = require('ip');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var model = require('./db-model.js');


exports.getTasksList = function(socket) {
    console.log("function getTasksList");
    model.Todo.find(function(err, taskList) {
        if (err)
            console.log(err)

        console.log("getTasksList inner");
        //console.log(taskList);
        socket.emit('getTaskListIo', taskList);
        //console.log(taskList);
        return taskList;
    }).sort({
        id: 1
    });
    console.log("getTasksList outer");
}
exports.oneRow;
exports.getTask = function(req, socket) {
    console.log("function getTask");
    console.log(req);
    console.log(req['id']);
    model.Todo.find({
        _id: req['id']
    }, function(err, taskList) {
        if (err)
            console.log(err)

        console.log("getTask inner");
        socket.emit('getTaskIo', taskList);
        exports.oneRow = taskList;
        //console.log(exports.oneRow );
        return taskList;
    });
    console.log("getTasksList outer");

}

exports.addTask = function(req, socket) {
    console.log("function addTask");

    model.Todo.create({
        text: req['data'].text,
        priority: req['data'].priority["id"],
        date: req['data'].date,
        radio: req['data'].radio,
        done: false
    }, function(err, taskList) {
        if (err)
            res.send(err);

        // get and return all the taskList after you create another
        model.Todo.find(function(err, taskList) {
            if (err)
                console.log(err)

            console.log("getTasksList inner");
            socket.emit('getTaskListIo', taskList);
            //console.log(taskList);
            return taskList;
        });
    });
}

exports.removeTask = function(req, socket) {
    console.log("function removeTask");
    console.log(req);
    model.Todo.remove({
        _id: req['id']
    }, function(err, taskList) {
        if (err)
            console.log(err);
        model.Todo.find(function(err, taskList) {
            if (err)
                console.log(err)

            console.log("getTasksList inner");
            socket.emit('getTaskListIo', taskList);
            //console.log(taskList);
            return taskList;
        });
    });
}


exports.updateTask = function(req, socket) {
    console.log("req");
    console.log(req.data)
    var curdata = req.data;
    model.Todo.update({
        _id: curdata._id
    }, {
        text: curdata.text,
        priority: curdata.priority.id,
        date: curdata.date,
        radio: curdata.radio,
        description: curdata.description,
        done: false
    }, function(err, taskList) {
        if (err)
            console.log(err)

        model.Todo.find(function(err, taskList) {
            if (err)
                console.log(err)
            //console.log(taskList);
            socket.emit('getTaskListIo', taskList);
        });

    });
}
