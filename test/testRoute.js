var route = require('../lib/route'),
    nodeunit = require('nodeunit');

exports['test route'] = nodeunit.testCase({
    setUp: function(cb) {
        cb();
    },

    tearDown: function(cb) {
        cb();
    },

    'test find single route': function(test) {
        var routeconfig = [
                {
                    name: 'root',
                    path: '/'
                }
            ],
            r = new route.Route(routeconfig);

        var matchRoute = r.find('/');
        test.equal(matchRoute.name, 'root');
        test.equal(matchRoute.path, '/');
        test.done();
    },

    'test find nonexistent route': function(test) {
        var routeconfig = [
                {
                    name: 'root',
                    path: '/'
                }
            ],
            r = new route.Route(routeconfig);

        var matchRoute = r.find('/abc');
        test.equal(matchRoute, undefined);
        test.done();
    },

    'test find in multple route': function(test) {
        var routeConfig = [
                {
                    name: 'root',
                    path: '/'
                },
                {
                    name: 'index',
                    path: '/index'
                }
            ],
            r = new route.Route(routeConfig);

        var matchRoute = r.find('/index');
        test.equal(matchRoute.name, 'index');
        test.equal(matchRoute.path, '/index');
        test.done();
    },

    'test find route with argument matching': function(test) {
        var routeConfig = [
                {
                    name: 'index',
                    path: '/index'
                },
                {

                    name: 'show',
                    path: '/:controller/:action/:id'
                }
            ],
            r = new route.Route(routeConfig);

        var matchRoute = r.find('/blog/show/112');
        test.equal(matchRoute.name, 'show');
        test.equal(matchRoute.path, '/:controller/:action/:id');
        //console.log(matchRoute.arguments);
        test.equal(matchRoute.arguments.controller, 'blog');
        test.equal(matchRoute.arguments.action, 'show');
        test.equal(matchRoute.arguments.id, '112');
        test.done();
    }

});
