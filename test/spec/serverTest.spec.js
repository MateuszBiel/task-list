var io = require('socket.io-client'),
    assert = require('assert'),
    expect = require('expect.js');


describe('Suite of unit tests', function() {

    var socket = io.connect('http://10.30.0.104:8080');
    beforeEach(function() {
        var socket = io.connect('http://10.30.0.104:8080');
    });

    describe('First (hopefully useful) test', function() {
        this.timeout(6000);

        it('just for test tastcase', function(done) {
            expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
            expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
            done();
        });

        it('simple connection', function(done) {
            console.log("simple connection test");

            var result = socket.emit('getTaskListIo', {});
            console.log(io.protocol);
            console.log("---");
            var test;
            socket.on('getTaskListIo', function(data) {
                test = data;
            });
            socket.emit('getTaskListIo', {});
            console.log("2");
            socket.on('test', function(data) {
                console.log(data);
            });
            setTimeout(function() {
                console.log("inside");
                expect(test).to.not.be.equal("");
                console.log("----");
                done();
            }, 200);


        })

        it('should log all requests to a log file and change it', function(done) {

            socket.on('getTaskListIo', function(data) {
                console.log(data);
            });


            done();
        });

    });

});
