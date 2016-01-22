(function() {
    'use strict';

    angular
        .module('taskApp')
        .controller('mainController', mainController);
    mainController.$inject = ['$scope', '$http', '$filter', 'socket'];

    function mainController($scope, $http, $filter, socket) {
        var vm = this;

        vm.formData = {};
        vm.currentElement = {};
        vm.isSelect = true;
        vm.Active = true;
        vm.Completed = true;
        var socket = io();
        vm.taskList = [];
        // when landing on the page, get all taskList and show them

        //WEB SOCKET
        socket.on('getTaskListIo', function(data) {
            console.log("function getTaskListIo");
            
            //check if scope is empty
            if (!$scope.$$phase) {
                $scope.$apply(function() { //let angular know the changes
                    vm.taskList = data;
                });
            }
            console.log(vm.taskList);
        });

        socket.on('getTaskIo', function(data) {
            console.log("function getTaskIo");
            vm.isSelect = false;
            console.log(data);
            $scope.$apply(function() { //let angular know the changes
                vm.currentElement = data[0];
                console.log(vm.currentElement);
                vm.currentElement.date = new Date(data[0].date);
                vm.currentElement.priority = vm.selectOptions[vm.currentElement.priority - 1];
            });

            console.log("---");
            console.log(vm.currentElement);
        });

        vm.getTaskListIo = function() {
            //alert("here i have to send command to socket io ");
            socket.emit('getTaskListIo', {});
        };

        vm.getTaskIo = function(id) {
            console.log("function getTaskIo b");
            socket.emit('getTaskIo', {
                id
            });
        }

        vm.addTaskIo = function() {
            console.log("function addTaskIo");
            if (vm.formData.text) {
                vm.formData.date = $('#date-input').val();
                if (!vm.formData.date) {
                    vm.date = new Date();
                    vm.tomorrow = new Date();
                    vm.tomorrow.setDate(vm.tomorrow.getDate() + 1);
                    vm.formData.date = $filter('date')(vm.tomorrow, 'yyyy-MM-dd');
                }
                if (!vm.formData.radio) {
                    vm.formData.radio = "Active";
                };
                var data = vm.formData;
                console.log(data);
                console.log('--');
                socket
                    .emit('addNewTaskIo', {
                        data
                    });
                console.log('--');
                vm.formData = {};
            }
        };

        vm.updateDataIo = function() {
            console.log("function updateDataIo");
            var data = vm.currentElement;
            console.log(data);
            console.log('--');
            socket
                .emit('updateTaskIo', {
                    data
                });
            console.log('--');
        };

        vm.removeTaskIo = function(id) {
            vm.isSelect = true;
            socket
                .emit('removeTaskIo', {
                    id
                });
        };

        vm.getTaskListIo();

        vm.clearTask = function() {
            vm.currentElement = {};
        };
        vm.returnSmth = function (){
            return "asdf";
        }

        vm.predicate = 'text';
        vm.reverse = true;
        vm.order = function(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
            console.log(vm.predicate);
            console.log(vm.reverse);
        };
        // vm.callNotify = function() {
        //     getTaskFromWebSocket();
        // };

        vm.selectOptions = [{
            "id": 1,
            "label": "1"
        }, {
            "id": 2,
            "label": "2"
        }, {
            "id": 3,
            "label": "3"
        }];
    }


}());
