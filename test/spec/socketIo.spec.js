var io = require('socket.io-client'),
    assert = require('assert'),
    expect = require('expect.js');


describe('test siut for socket Io', function() {

    var socket = io.connect('http://10.30.0.139:8080');

    describe('Socket Io test', function() {
        this.timeout(6000);

        var globalLastRow;
        var data = {};
        data.text = "Finn";
        data.priority = {
            label: '2',
            id: 2
        };
        data.date = '2016-01-22T00:00:00.000Z';
        data.radio = 'Active';

        it('just for test tastcase', function(done) {
            expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
            expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
            done();
        });

        it('getting all data', function(done) {
            console.log("simple connection test");

            var result = socket.emit('getTaskListIo', {});
            console.log("---");
            var test;
            socket.on('getTaskListIo', function(data) {
                test = data;
            });
            socket.emit('getTaskListIo', {});
            socket.on('test', function(data) {
                console.log(data);
            });
            setTimeout(function() {
                expect(test).to.not.be.equal("");
                done();
            }, 200);
        })

        it('should add new task', function(done) {

            var result = socket.emit('getTaskListIo', {});
            var resultList;

            socket.emit('addNewTaskIo', {
                data
            });
            socket.on('getTaskListIo', function(data) {
                resultList = data;
            });

            setTimeout(function() {
                console.log("firsth wait");
                expect(resultList[resultList.length - 2].text).to.not.be.equal(resultList[resultList.length - 1].text);
                console.log("----");
                globalLastRow = resultList[resultList.length - 1]._id;
                done();
            }, 200);
        });

        it('name of the obcject should be changed from "test record" to "Tr8r"', function(done) {
            data.text = "Tr8r";
            socket.emit('updateTaskIo', {
                data
            });
            var resultList;

            socket.on('getTaskListIo', function(data) {
                resultList = data;
            });
            setTimeout(function() {
                //console.log("firsth wait");
                console.log(data.text+" != " +resultList[resultList.length-1].text);
                expect(resultList[resultList.length - 1].text).to.not.be.equal(data.text);
                done();
            }, 200)
            
        });

        it('this test should remove last task', function(done) {
            console.log('---');
            console.log('test remove data');
            var id = globalLastRow;
            socket
                .emit('removeTaskIo', {
                    id
                });


            var resultList;

            socket.on('getTaskListIo', function(data) {
                resultList = data;
            });
            setTimeout(function() {
                //console.log("firsth wait");
                //console.log(id+" " +resultList[resultList.length-1]._id);
                expect(resultList[resultList.length - 1]._id).to.not.be.equal(id);
                done();
            }, 200)
        })

    });


});
