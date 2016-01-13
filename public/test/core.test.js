describe('mainController', function() {
    var scope, $state, createController;

    beforeEach(module('taskApp')); //<--- Hook module

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        createController = function() {
            return $controller('mainController', {
                '$scope': scope
            });
        };
    }));

    describe('example test ', function() {
        it('should be true', function() {
            expect('foo').toBe('foo');
        });
    });

    describe('check.grade2', function() {
        it('sets ', function() {

            expect(scope.test2).toEqual();
        });
    });
});
