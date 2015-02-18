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
    };
}])
