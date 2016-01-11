// public/core.js
var taskApp = angular.module('taskApp', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all taskList and show them
    $http.get('/api/taskList')
        .success(function(data) {
            $scope.taskList = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.addTask = function() {
        console.log($scope.formData);
        $http.post('/api/taskList', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/taskList/' + id)
            .success(function(data) {
                $scope.taskList = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
