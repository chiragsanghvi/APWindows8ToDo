﻿/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY, Appacitive */
var app = WinJS.Application;

(function ($) {
    'use strict';

    var ENTER_KEY = 13;
    var ESC_KEY = 27;

    // Todo Item View
    // --------------

    // The DOM element for a todo item...
    app.TodoView = Backbone.View.extend({
        //... is a list tag.
        tagName: 'li',

        // Cache the template function for a single item.
        template: _.template($('#item-template').html()),

        // The DOM events specific to an item.
        events: {
            'click .toggle': 'toggleCompleted',
            'dblclick label': 'edit',
            'click .destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'keydown .edit': 'revertOnEscape',
            'blur .edit': 'close'
        },

        // The TodoView listens for changes to its model, re-rendering. Since
        // there's a one-to-one correspondence between a **Todo** and a
        // **TodoView** in this app, we set a direct reference on the model for
        // convenience.
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },

        // Re-render the titles of the todo item.
        render: function () {
            this.$el.html(this.template(this.model.getParsed()));
            this.$el.toggleClass('completed', this.model.tryGet('completed', false, 'boolean'));
            this.toggleVisible();
            this.$input = this.$('.edit');
            return this;
        },

        // Render/hide todo item
        toggleVisible: function () {
            this.$el.toggleClass('hidden', this.isHidden());
        },

        isHidden: function () {
            var isCompleted = this.model.tryGet('completed', false, 'boolean');
            return (// hidden cases only
				(!isCompleted && app.TodoFilter === 'completed') ||
				(isCompleted && app.TodoFilter === 'active')
			);
        },

        // Toggle the `"completed"` state of the model.
        toggleCompleted: function () {
            this.model.toggle();
        },

        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function () {
            this.$el.addClass('editing');
            this.$input.focus();
        },

        // Close the `"editing"` mode, saving changes to the todo.
        close: function () {
            var value = this.$input.val();
            var trimmedValue = value.trim();

            // We don't want to handle blur events from an item that is no
            // longer being edited. Relying on the CSS class here has the
            // benefit of us not having to maintain state in the DOM and the
            // JavaScript logic.
            if (!this.$el.hasClass('editing')) return;


            if (trimmedValue && trimmedValue.length > 0) {
                this.model.set('title', trimmedValue);
                this.model.save();
            } else {
                this.clear();
            }

            this.$el.removeClass('editing');
        },

        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function (e) {
            if (e.which === ENTER_KEY) {
                this.close();
            }
        },

        // If you're pressing `escape` we revert your change by simply leaving
        // the `editing` state.
        revertOnEscape: function (e) {
            if (e.which === ESC_KEY) {
                this.$el.removeClass('editing');
            }
        },

        // Remove the item, destroy the model from Appacitive and delete its view.
        clear: function () {
            this.model.destroy(true);
        }
    });
})(jQuery);