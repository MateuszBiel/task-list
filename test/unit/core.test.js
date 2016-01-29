  'use strict';

  describe('Controller: mainController', function() {
      var mainController,
          scope;

      // load the controller's module
      beforeEach(module('taskApp'));



      // Initialize the controller and a mock scope
      beforeEach(inject(function($controller, $rootScope) {
          scope = $rootScope.$new();
          AboutCtrl = $controller('mainController', {
              '$scope': scope
          });
      }));

      describe('just test', function() {
          it('sets ', function() {

              expect("asdf").toEqual("asdf");
          });
      });


  });
