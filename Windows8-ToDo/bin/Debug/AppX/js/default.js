// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    /*global $ */
    /*jshint unused:false */
   
    console.log("Appacitive Initializing");

    window.sdkLogs = [];

    Appacitive.initialize({
        apikey: 'sjzGiu1HcfuzvZAFNWQNsrizoflOUhA2qHxycfQ4Pd0=',
        env: 'sandbox',
        appId: '56564813671825740',
        apiLog: function (l) {
            window.sdkLogs.push(l);
        }
    });

    var todoapp = (function ($) {
        // kick things off by creating the `App`

        var initialize = function () {

            console.log("Appacitive Initialized. Rendering appView");

            new app.AppView();
        };

        return { initialize: initialize };
    }(jQuery));

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.

                todoapp.initialize();
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
