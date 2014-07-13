var app = app || {};

// The collection of todos which is locally stored
var TodoList = Backbone.Collection.extend({
    model: app.Todo,

    localStorage: new Backbone.LocalStorage('todos-backbone'),

    // Get todos that have been completed
    completed: function() {
        return this.filter(function(todo) {
            return todo.get("completed");
        });
    },

    // Get todos that have not been completed
    remaining: function() {
        return this.without.apply(this, this.completed());
    },

    // Generates a sequence
    nextOrder: function() {
        if( !this.length) {
            return 1;
        }
        return this.last().get("order") + 1;
    },

    // Used to sort by the order inserted
    comparator: function(todo) {
        return todo.get("order");
    }
});

app.Todos = new TodoList();