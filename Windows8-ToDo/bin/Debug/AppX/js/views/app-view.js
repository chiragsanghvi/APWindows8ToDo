﻿/*global Backbone, jQuery, _, ENTER_KEY */
var app = WinJS.Application;

(function ($) {
    'use strict';

    // The Application
    // ---------------

    // Our overall **AppView** is the top-level piece of UI.
    // The main view for the app
    app.AppView = Backbone.View.extend({
        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: $("#todoapp"),

        initialize: function () {
            this.render();
        },

        render: function () {
            if (Appacitive.Users.current()) {
                new app.TodosView();
            } else {
                new app.LogInView();
            }
        }
    });
})(jQuery);