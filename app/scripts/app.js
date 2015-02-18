'use strict';

var app = angular.module('todoapp', []);

app.controller('TodoCtrl', ['$scope', '$filter', function($scope, $filter) {
    $scope.todos = [{
        'name': 'Ma première tâche',
        'completed': true
    }, {
        'name': 'Ma seconde tâche',
        'completed': false
    }];

    var todos = $scope.todos;

    $scope.$watch('todos', function() {
        $scope.remaining = $filter('filter')(todos, {
            completed: false
        }).length;
    }, true);

    $scope.addTodo = function() {
        todos.push({
            'name': $scope.newTodo,
            'completed': false
        });

        $scope.newTodo = '';
    };

    $scope.removeTodo = function(index) {
        todos.splice(index, 1);
    };

    $scope.checkAllTodo = function(completed) {
        todos.forEach(function(todo) {
            todo.completed = completed;
        });
    };

    $scope.editTodo = function(todo, editing) {
        todo.editing = editing;

        if (editing === true) {
            // Clone the original todo to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
            $scope.originalTodo.editing = false;
        }
    };

    $scope.revertTodo = function(todo) {
        todos[todos.indexOf(todo)] = $scope.originalTodo;
    };
}]);

app.directive('todoEscape', function() {

    var ESCAPE_KEY = 27;

    return {
        restrict : 'A',
        // Par défaut, équivalent à postlink
        link: function(scope, elem, attrs) {
            elem.bind('keydown', function(event) {
                if (event.keyCode === ESCAPE_KEY) {
                    scope.$apply(attrs.todoEscape);
                }
            });
        }
    };
});