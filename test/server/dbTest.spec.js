var should = require('should'),
    server = require('../../server.js'),
    DB = require('../../server-socketio-CRUD.js'),
    should = require('should'),
    async = require('async'),
    expect = require('expect.js'),

    model = require('../../db-model.js');

describe('Model DB testing:', function() {

    var data = {};
    var newCollection = {};
    var testCollection = {};
    var testCount = 0;
    var testId = 0;
    var tmpObj = {}
    tmpObj.text = "Finn";
    tmpObj.priority = {
        label: '2',
        id: 2
    };
    tmpObj.date = '2016-01-22T00:00:00.000Z';
    tmpObj.radio = 'Active';

    console.log("--");
    data.data = tmpObj;
    var fakeSocket = server.testCaseSocket;
    console.log(fakeSocket);

    it('Just in validation case, you can scroll further', function(done) {

        setTimeout(function() {
            model.Todo.find(function(err, taskList) {
                testCollection = taskList;
                console.log(taskList.length);

            });
            done();
        }, 200);
    });

    it('should add new record', function(done) {
        console.log('should add new record');
        data.data = tmpObj;
        DB.addTask(data, fakeSocket);
        var tmpDB;
        setTimeout(function() {
            model.Todo.find(function(err, taskList) {
                tmpDB = taskList;
            })
        }, 200);
        console.log();
        console.log(tmpDB);
        setTimeout(function() {
            testId = tmpDB[tmpDB.length - 1]._id;
            console.log(tmpDB.length + " : " + testCollection.length);
            expect(tmpDB.length).to.not.be.equal(testCollection.length);
            done();
        }, 300);
    });

    it('should change "test record" to "Tr8r"', function(done) {
        tmpObj._id = testId;
        tmpObj.text = "Tr8r";
        tmpObj.description = "just Finn";
        data.data = tmpObj;

        DB.updateTask(data, fakeSocket);
        var tmpDB;
        setTimeout(function() {
            model.Todo.find(function(err, taskList) {
                tmpDB = taskList;
            })
        }, 200);
        setTimeout(function() {
            console.log(tmpDB._id + " : " + testCollection.length);
            expect(tmpDB[tmpDB.length - 1].text).to.not.be.equal(data.text);
            done();
        }, 300);
    });

    it('should return "Finn the Tr8r"', function(done) {

        var id = {};
        id.id = testId;
        //console.log("--- "+id);
        var test = DB.getTask(id, fakeSocket);
        setTimeout(function() {
            //console.log(DB.oneRow);
            expect(DB.oneRow.length).to.be.equal(1);
            done();
        }, 200);

    });

    it('deleting added row', function(done) {
        var id = {};
        id.id = testId;
        DB.removeTask(id, fakeSocket);
        var tmpDB;
        setTimeout(function() {
            model.Todo.find(function(err, taskList) {
                tmpDB = taskList;
            })
        }, 200);
        setTimeout(function() {
            testId = tmpDB[tmpDB.length - 1]._id;
            console.log(tmpDB.length + " : " + testCollection.length);
            expect(tmpDB.length).to.be.equal(testCollection.length);
            done();
        }, 300);
    });
    // console.log(newCollection);
})
