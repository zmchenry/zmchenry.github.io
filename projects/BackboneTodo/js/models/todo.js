var app = app || {};

// Todo Model
// ----------
// Our basic **Todo** model has "title" and "completed" attributes.

// Default model for todo
app.Todo = Backbone.Model.extend({
    defaults: {
        title: "",
        completed: false
    },

    // Toggle the completed state of this todo item.
    toggle: function() {
        this.save({
            completed: !this.get("completed")
        });
    }
});