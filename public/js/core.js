angular.
module('taskApp', []).
controller('mainController', ['$scope', '$http', '$filter', 'getTaskFromWebSocket', function($scope, $http, $filter, getTaskFromWebSocket) {

    $scope.formData = {};
    $scope.currentElement = {};
    $scope.isSelect = true;
    $scope.Active = true;
    $scope.Completed = true;
    var socket = io();
    // when landing on the page, get all taskList and show them

    //WEB SOCKET
    $scope.getTasksIo = function() {
        console.log("call");
        var tmp = socket.emit('getTaskListIo');
        console.log('----');
        console.log(tmp);
    };

    $scope.getTaskIo = function(id) {
        getTaskFromWebSocket.getTaskListIo();
        $scope.isSelect = false;
        console.log("call getTaskIo");
        socket.emit('getTaskIo', id);
        socket.on('getTaskIo', function(msg) {
            console.log('----');
            $scope.currentElement = tmp[0];
            console.log("a----");
            console.log($scope.currentElement);
            $scope.currentElement.priority = $scope.selectOptions[$scope.currentElement.priority - 1];
        });
    };

    //REST
    $http.get('/api/taskList')
        .success(function(data) {
            $scope.taskList = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.updateData = function() {
        $http.get('/api/taskList')
            .success(function(data) {
                $scope.taskList = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // when submitting the add form, send the text to the node API
    $scope.addTask = function() {
        if ($scope.formData.text) {
            $scope.formData.date = $('#date-input').val();
            if (!$scope.formData.date) {
                $scope.date = new Date();
                $scope.tomorrow = new Date();
                $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
                $scope.formData.date = $filter('date')($scope.tomorrow, 'yyyy-MM-dd');
            }
            if (!$scope.formData.radio) {
                $scope.formData.radio = "Active";
            };
            console.log($scope.formData);
            $http.post('/api/taskList', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.formData.priority = $scope.selectOptions[0];
                    console.log($scope.formData);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }

    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {

        $scope.isSelect = true;

        $http.delete('/api/taskList/' + id)
            .success(function(data) {
                $scope.taskList = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getTask = function(id) {
        console.log("asdf");

        $scope.isSelect = false;
        console.log("get task");
        $http.get('/api/taskList/' + id)
            .success(function(data) {
                $scope.currentElement = data[0];
                //this code is very strange
                //----
                //display actual object from current application scope
                console.log($scope.formData);
                //display recived elemnt
                console.log($scope.currentElement);
                //try to check objects
                console.log($scope.formData.priority + " : " + $scope.currentElement.priority);
                //try to check objects ------- objects are equal
                console.log(angular.equals($scope.selectOptions[0], $scope.currentElement.priority));
                // here doesn't work
                // below function works perfects
                console.log("--");
                // display selectced object from select option object
                console.log($scope.selectOptions[$scope.currentElement.priority - 1]);
                console.log($scope.currentElement.priority);
                //objects are the smae but works olny from  $scope.selectOptions
                $scope.currentElement.priority = $scope.selectOptions[$scope.currentElement.priority - 1];
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };

    $scope.editTask = function(id) {
        console.log($scope.currentElement);
        $http.put('/api/taskList/' + id, $scope.currentElement)
            .success(function(data) {
                $scope.currentElement = data[0];
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    };

    $scope.clearTask = function() {
        $scope.currentElement = {};
    };

    $scope.predicate = 'text';
    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
        console.log($scope.predicate);
        console.log($scope.reverse);
    };
    $scope.callNotify = function() {
        getTaskFromWebSocket();
    };

    $scope.selectOptions = [{
        "id": 1,
        "label": "1"
    }, {
        "id": 2,
        "label": "2"
    }, {
        "id": 3,
        "label": "3"
    }];
}]).
factory('getTaskFromWebSocket', ['$window', function() {

    var socket = io.connect('http://localhost:8080');
    //This part is only for login users for authenticated socket connection between client and server.
    //If you are not using login page in you website then you should remove rest piece of code..
    var tmpFactory = {};
    
    var getTaskListIo = function(){
        socket.on('getTaskListIo', function(msg) {
            console.log("asdf " + msg);
            tmpFactory = msg;
            console.log(msg);
        });
    }

    var getTaskIo = function(msg){
        socket.on('getTasktIo', function(msg) {
            console.log("asdf " + msg);
            tmpFactory = msg;
            console.log(msg);
        });
    }

    return {getTaskListIo:getTaskListIo,getTaskIo:getTaskIo};
}]);
