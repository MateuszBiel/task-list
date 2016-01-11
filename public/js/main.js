// Require.js allows us to configure shortcut alias
require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    'socketio': {
      exports: 'io'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }
  },
  paths: {
    jquery: 'jquery.min',
    underscore: 'lodash.min',
    backbone: 'backbone',
    socketio: '../socket.io/socket.io',
  }
});

define([
  'jquery',
  'backbone',
  'socketio',
], function( $, Backbone, io ) {

      var socket = io.connect('http://localhost');
      socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
        });


      //Ready to write Backbone Models and Socket.io communication protocol in here :)


});