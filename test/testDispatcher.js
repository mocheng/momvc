var Dispatcher = require('../lib/dispatcher'),
    Route = require('../lib/route'),
    nodeunit = require('nodeunit');

exports['test Dispatcher'] = nodeunit.testCase({
    setUp: function(cb) {
        cb();
    },

    tearDown: function(cb) {
        cb();
    },

    'test dispatch' : function(test) {
        var routeconfig = [
                {
                    name: 'root',
                    path: '/',
                    params: {
                        module: 'm',
                        action: 'a'
                    }
                }
            ],
            mockRoute = new Route(routeconfig),
            dispatcher = new Dispatcher(mockRoute),
            req = {url: '/'},
            res = {},

            mockAction = function(ctx) {
            };

        dispatcher.getAction = function(routePath) {
            test.equals(routePath, 'm/a');
            return mockAction;
        };

        dispatcher.dispatch(req, res);

        test.done();
    }
});
