'use strict';

(function() {
  angular.module('todoController', [])
    .controller('mainController', function($scope, $http, Todos) {
      $scope.formData = {};

      Todos.get()
        .success(function(data) {
          $scope.todos = data;
        })
        .catch((err) => {
          console.log(`Error in getting Todo with error: ${err}`);
        });

      $scope.createTodo = function() {
        Todos.create($scope.formData)
          .success(function(data) {
            $scope.formData = {};
            $scope.todos = data;
          })
          .catch((err) => {
            console.log(`Error in creating Todo with error: ${err}`);
          });
      };


      $scope.deleteTodo = function(id) {
        Todos.delete(id)
          .success(function(data) {
            $scope.todos = data;
          })
          .catch((err) => {
            console.log(`Error in deleting Todo with error: ${err}`);
          });
      };
    });

}());

