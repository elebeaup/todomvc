'use strict';

var app = angular.module('todoapp', ['ngRoute']);

app.controller('TodoCtrl', ['$scope', '$filter', '$routeParams', function($scope, $filter, $routeParams) {
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

    // Monitor the current route for changes and adjust the filter accordingly.
    $scope.$on('$routeChangeSuccess', function() {
        var status = $scope.status = $routeParams.status || '';

        $scope.statusFilter = (status === 'active') ? {
            completed: false
        } : (status === 'completed') ? {
            completed: true
        } : null;
    });
}]);

app.directive('todoEscape', function() {

    var ESCAPE_KEY = 27;

    return {
        restrict: 'A',
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

app.config(['$routeProvider', function($routeProvider) {
    var routeConfig = {
        controller: 'TodoCtrl',
        templateUrl: 'todo-index.html'
    };

    $routeProvider
        .when('/', routeConfig)
        .when('/:status', routeConfig)
        .otherwise({
            redirectTo: '/'
        });
}]);
