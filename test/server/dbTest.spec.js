var should = require('should'),
    DB = require('../../server.js'),
    async = require('async');
describe('Model DB testing', function() {

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

    console.log(DB.Todo.collection);

    it('just in validation case, you can scroll further', function(done) {

        async.parallel([
            function(callback) {
                var test = DB.getTasksList();
                console.log(test);
                setTimeout(function() {
                    console.log(test);
                    testCollection = test;
                    console.log(test);
                    done();
                }, 200);
            }
        ]);

    });

    it('should add new row', function() {
        DB.addTask(data);
        newCollection = DB.getTasksList();
        setTimeout(function() {
            console.log(newCollection);
            console.log("---");
            console.log(newCollection.length + " --- " + testCollection.length);
            console.log("---");
            expect(newCollection.length).to.not.be.equal(testCollection.length);
            done();
        }, 200);
    });



    // it('should change "test record" to "Tr8r"', function() {
    //     data.text = "Tr8r";
    //     data.data=tmpObj;
    //     DB.updateTask(data);
    //     var dbCollection = DB.getTasksList();
    //     setTimeout(function() {
    //         expect(dbCollection.length).to.not.be.equal(testCount);
    //         done();
    //     }, 200);
    // });

    // it('should return only one row', function() {
    //     var id = newCollection[newCollection.length - 1]._id;

    //     var oneRow = DB.getTask(id);
    //     setTimeout(function() {
    //         console.log(oneRow);
    //         expect(oneRow.length).to.be.equal(1);
    //         done();
    //     }, 200);
    // });

    // console.log(newCollection);
})
