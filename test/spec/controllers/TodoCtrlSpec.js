'use strict';

describe('Controller: TodoCtrl', function() {

    // load the controller's module
    beforeEach(module('todoapp'));

    var TodoCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        TodoCtrl = $controller('TodoCtrl', {
            $scope: scope
        });

        scope.$digest();
    }));

    it('doit contenir 2 tâches', function() {
        expect(scope.todos.length).toBe(2);
    });

    it('doit rester seulement une tâche non terminée', function() {
        expect(scope.remaining).toBe(1);
    });

    it('doit rester seulement deux tâches non terminées', function() {
        scope.addTodo({
            'name': 'Ma nouvelle tâche'
        });
        scope.$digest();

        expect(scope.remaining).toBe(2);
    });

});
