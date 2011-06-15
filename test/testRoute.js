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
                    path: '/',
                    params: {
                        module: 'm',
                        action: 'a'
                    }
                }
            ],
            r = new route.Route(routeconfig);

        var matchRoute = r.find('/');
        test.equal(matchRoute.name, 'root');
        test.equal(matchRoute.path, '/');
        test.equal(matchRoute.arguments.module, 'm');
        test.equal(matchRoute.arguments.action, 'a');
        test.done();
    },

    'test find single route with route arguments': function(test) {
        var routeconfig = [
                {
                    name: 'root',
                    path: '/',
                    params: {
                        module: 'm',
                        action: 'a',
                        foo: 'bar'
                    }
                }
            ],
            r = new route.Route(routeconfig);

        var matchRoute = r.find('/');
        test.equal(matchRoute.name, 'root');
        test.equal(matchRoute.path, '/');
        test.equal(matchRoute.arguments.module, 'm');
        test.equal(matchRoute.arguments.action, 'a');
        test.equal(matchRoute.arguments.foo, 'bar');
        test.done();
    },

    'test route config with no module and action': function(test) {
        var routeconfig = [
                {
                    name: 'root',
                    path: '/',
                }
            ];

        test.throws(function() {
            new route.Route(routeconfig);
        });

        test.done();
    },

    'test find nonexistent route': function(test) {
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
            r = new route.Route(routeconfig);

        var matchRoute = r.find('/abc');
        test.equal(matchRoute, undefined);
        test.done();
    },

    'test find in multple route': function(test) {
        var routeConfig = [
                {
                    name: 'root',
                    path: '/',
                    params: {
                        module: 'm',
                        action: 'a'
                    }
                },
                {
                    name: 'index',
                    path: '/index',
                    params: {
                        module: 'm',
                        action: 'a'
                    }

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
                    path: '/index',
                    params: {
                        module: 'm',
                        action: 'a'
                    }
                },
                {
                    name: 'show',
                    path: '/:module/:action/:id',
                    params: {
                        module: 'm',
                        action: 'a'
                    }
                }
            ],
            r = new route.Route(routeConfig);

        var matchRoute = r.find('/blog/show/112');
        test.equal(matchRoute.name, 'show');
        test.equal(matchRoute.path, '/:module/:action/:id');
        //console.log(matchRoute.arguments);
        test.equal(matchRoute.arguments.module, 'blog');
        test.equal(matchRoute.arguments.action, 'show');
        test.equal(matchRoute.arguments.id, '112');
        test.done();
    },

    'test find route with high priority': function(test) {
        var routeConfig = [
                {
                    name: 'index',
                    path: '/index',
                    params: {
                        module: 'm',
                        action: 'a'
                    }
                },
                {
                    name: 'category_list',
                    path: '/category/list',
                    params: {
                        module: 'm',
                        action: 'a'
                    }
                },
                {
                    name: 'category',
                    path: '/category/:op/:catname'
                },
                {

                    name: 'show',
                    path: '/:module/:action/:id'
                }
            ],
            r = new route.Route(routeConfig);

        var matchRoute = r.find('/category/show/112');
        test.equal(matchRoute.name, 'category');

        var matchListRoute = r.find('/category/list');
        test.equal(matchListRoute.name, 'category_list');
        test.done();
    }

});
