var express = require('express');
var app = express(); // create our app w/ express

app.get('/api/taskList', function(req, res) {
    // use mongoose to get all taskList in the database
    Todo.find(function(err, taskList) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.json(taskList); // return all taskList in JSON format
    });
});

app.get('/api/taskList/:taskList_id', function(req, res) {
    Todo.find({
        _id: req.params.taskList_id
    }, function(err, taskList) {

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
        priority: req.body.priority["id"],
        date: req.body.date,
        radio: req.body.radio,
        done: false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the taskList after you create another
        Todo.find(function(err, taskList) {
            if (err)
                res.send(err)
            res.json(taskList);
            io.emit('chat message', taskList);
        });
    });
});

app.put('/api/taskList/:taskList_id', function(req, res) {
    Todo.update({
        _id: req.params.taskList_id
    }, {
        text: req.body.text,
        priority: req.body.priority,
        date: req.body.date,
        radio: req.body.radio,
        description: req.body.description,
        done: false
    }, function(err, todo) {
        if (err)
            res.send(err);

        Todo.find(function(err, taskList) {
            if (err)
                res.send(err)
            res.json(taskList);
        });
    });
})

// delete a todo
app.delete('/api/taskList/:taskList_id', function(req, res) {
    Todo.remove({
        _id: req.params.taskList_id
    }, function(err, todo) {
        if (err)
            res.send(err);
        io.emit('chat message', "update");
        // get and return all the taskList after you create another
        Todo.find(function(err, taskList) {
            if (err)
                res.send(err)
            res.json(taskList);
        });
        Todo.find(function(err, taskList) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            res.json(taskList); // return all taskList in JSON format
        });
    });
});