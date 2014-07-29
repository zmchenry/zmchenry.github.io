(function() {
 var app = angular.module('todo', []);

 app.controller("TodoController", function TodoController($scope) {
    $scope.todos = todos;

    // Create todos
    $scope.todo = {};
    $scope.addTodo = function(form) {
        $scope.todos.push($scope.todo);
        $scope.todo = {};
        form.$setPristine();
    };

    // Remove todos
    $scope.removeTodo = function(item) {
        var index = this.todos.indexOf(item);
        this.todos.splice(index, 1);
    };

    // Get completed items
    $scope.completed = 0;
    $scope.$watch("todos", function(todos) {
        var selectedItems = 0;
        angular.forEach(todos, function(todo) {
            selectedItems += todo.completed ? 1 : 0;
        });
        $scope.completed = selectedItems;
    }, true);

});

 app.directive("headerTodo", function() {
    return {
        restrict: "E",
        templateUrl: "partials/header-todo.html"
    };
});

 app.directive("listTodo", function() {
    return {
        restrict: "E",
        templateUrl: "partials/list-todo.html"
    };
});

 app.directive("footer", function() {
    return {
        restrict: "E",
        templateUrl: "partials/footer.html"
    };
});

 var todos = [{
  title: "Learn Angular",
  completed: false
}, 
{
  title: "Learn Bootstrap",
  completed: true
}
];
})();

