var app = app || {};

app.AppView = Backbone.View.extend({
    // Use an existing element for manipulation
    // Selects a DOM element with the id todoapp
    el: "#todoapp",

    // Template for footer item
    // Create a template using Underscores micro-templating
    statsTemplate: _.template($("#stats-template").html()),

    // Events that control creating new todos, and clearing 
    // completed ones
    events: {
        "keypress #new-todo": "createOnEnter",
        "click #clear-completed" : "clearCompleted",
        "click #toggle-all": "toggleAllComplete"
    },

    // this.$() finds elements relative to this.$el
    // Bind to relevant events on the "Todos" collection
    // Start by loading preexisting todos from local storage
    initialize: function() {
      this.allCheckbox = this.$('#toggle-all')[0];
      this.$input = this.$('#new-todo');
      this.$footer = this.$('#footer');
      this.$main = this.$('#main');

      this.listenTo(app.Todos, 'add', this.addOne);
      this.listenTo(app.Todos, 'reset', this.addAll);

      this.listenTo(app.Todos, 'change:completed', this.filterOne);
      this.listenTo(app.Todos,'filter', this.filterAll);
      this.listenTo(app.Todos, 'all', this.render);

      app.Todos.fetch();
    },

    // Refresh the statistics at footer keep the rest of the
    // page the same
    render: function() {
        var completed = app.Todos.completed().length;
        var remaining = app.Todos.remaining().length;

        if(app.Todos.length) {
            this.$main.show();
            this.$footer.show();

            this.$footer.html(this.statsTemplate({
                completed: completed,
                remaining: remaining
            }));

            this.$('#filters li a')
            .removeClass('selected')
            .filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
            .addClass('selected');
        } else {
            this.$main.hide();
            this.$footer.hide();
        }

        this.allCheckbox.checked = !remaining;
    },


    // Create a view for todo then append to <ul>
    addOne: function (todo) {
        var view = new app.TodoView({model: todo});
        $("#todo-list").append(view.render().el);
    },

    // Batch manipulate by iterating over all todos and
    // calling addOne on each
    addAll: function() {
        this.$("#todo-list").html("");
        app.Todos.each(this.addOne, this);
    },

    filterOne: function(todo) {
        todo.trigger("visible");
    },

    filterAll: function() {
        app.Todos.each(this.filterOne, this);
    },

    // Create attributes for a new Todo
    newAttributes: function() {
        return {
            title: this.$input.val().trim(),
            order: app.Todos.nextOrder(),
            completed: false
        };
    },

    // Hitting enter on main input field creates a todo
    // and clears the main field for next input.
    createOnEnter: function(event) {
        if(event.which !== ENTER_KEY || !this.$input.val().trim()) {
            return;
        }

        app.Todos.create(this.newAttributes());
        this.$input.val("");
    },

    // Remove all completed todos when button is clicked
    clearCompleted: function() {
        _.invoke(app.Todos.completed(), "destroy");
        return false;
    },

    toggleAllComplete: function() {
        var completed = this.allCheckbox.checked;

        app.Todos.each(function(todo) {
            todo.save({
                "completed": completed
            });
        });
    }
});