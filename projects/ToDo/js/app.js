(function() {
 var app = angular.module('todo', []);

 app.factory("todoList", function() {
    var todos = [{
        title: "Learn Angular",
        completed: false
    }, 
    {
        title: "Learn Bootstrap",
        completed: true
    }]; 
    return todos;
 });

 app.controller("TodoController", function TodoController($scope, todoList) {
    $scope.todos = todoList;
    $scope.filt = "all";
    // Create todos
    $scope.todo = {};
    $scope.addTodo = function(form) {
        if($scope.todo.title) {
            $scope.todo.title = $scope.todo.title.trim();
            $scope.todos.push($scope.todo);
        } else {
            return;
        }
        $scope.todo = {};
        form.$setPristine();
    };

    // Remove todos
    $scope.removeTodo = function(item) {
        var index = this.todos.indexOf(item);
        this.todos.splice(index, 1);
    };

    $scope.changeFilter = function(item) {
        switch(item) {
            case "all":
                $scope.filt = "all";
                break;
            case "active":
                $scope.filt= "active";
                break;
            case "completed":
                $scope.filt= "completed";
                break;
            default: 
                console.log(item);
        }
    };

    // Get in progress items
    $scope.inprogress = 0;
    $scope.$watch("todos", function(todos) {
        var selectedItems = 0;
        angular.forEach(todos, function(todo) {
            selectedItems += todo.completed ? 0 : 1;
        });
        $scope.inprogress = selectedItems;
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

})();

