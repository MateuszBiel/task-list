describe('Protractor Demo App', function() {

    var socket;

    beforeEach(function(done) {
        // Setup
        socket = io.connect('http://localhost:8080', {
            'reconnection delay': 0,
            'reopen delay': 0,
            'force new connection': true
        });
        socket.on('connect', function() {
            console.log('worked...');
            done();
        });
        socket.on('disconnect', function() {
            console.log('disconnected...');
        })
    });

    afterEach(function(done) {
        // Cleanup
        if (socket.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });

    describe('First (hopefully useful) test', function() {

        it('Doing some things with indexOf()', function(done) {
            socket.emit('getTaskListIo', {});
         
            waitsFor(function() {
                var test =  socket.on('getTaskListIo', function(data){
                    return data;
                });
                return test;
            }, "The Value should be incremented", 5000);
            expect(true).to.be.equal(-1);
               done();
        });

        it('Doing something else with indexOf()', function(done) {
            expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
            expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
            done();
        });

    });

    it('should have a title', function() {
        browser.get('localhost:8080');

        expect(browser.getTitle()).toEqual('task list');
    });
});
