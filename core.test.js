
describe('mainController', function() {
    
    var socket;

    beforeEach(function(done) {
        // Setup
        socket = io.connect('http://localhost:8080', {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
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
        if(socket.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });

    describe('example test ', function() {
        it('should be true', function() {
            expect('foo').toBe('foo');
        });
    });

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

    describe('check.grade2', function() {
        it('sets ', function() {

            expect(scope.test2).toEqual();
        });
    });
});
