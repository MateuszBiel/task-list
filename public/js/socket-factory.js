(function() {
    'use strict';
    angular
    .module('taskApp')
    .factory('socket', ['$rootScope', function($rootScope) {
        var listeningIp='http://localhost:8080';
        var socket = io.connect('http://localhost:8080');
        console.log(socket);
        return {
            on: function(eventName, callback) {
                function wrapper() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                }

                socket.on(eventName, wrapper);

                return function() {
                    socket.removeListener(eventName, wrapper);
                };
            },

            emit: function(eventName, data, callback) {
                socket.emit(eventName, data, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }]);
    
}());