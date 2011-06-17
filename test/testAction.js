var action = require('../lib/action'),
    template = require('../lib/template'),
    Context = require('../lib/context'),
    events = require('events'),
    mustache = require('mustache'),
    nodeunit = require('nodeunit');

exports['test action'] = nodeunit.testCase({
    setUp: function(cb) {
        cb();
    },

    tearDown: function(cb) {
        cb();
    },

    'test action complete immediately' : function(test) {
        test.expect(2);
        var testAction = function(ctx) {
            ctx.done();
            test.equal(ctx.isDone(), true, 'the context shold have been done');
        };

        var req = new events.EventEmitter(),
            res = new events.EventEmitter(),
            ctx = new Context(req, res);

        res.end = function(result) {
            test.equal(result, undefined, 'should be undefined');
        };

        action.processAction(ctx, testAction);
        test.done();
    },

    'test action completed asynchronously' : function(test) {
        test.expect(3);

        var testAction = function(ctx) {
            setTimeout(function() {
                ctx.done();
                test.equal(ctx.isDone(), true, 'the context shold have been done');
                test.done();
            }, 500);

            test.equal(!ctx.isDone(), true, 'the context shold have been done');
        };

        var req = new events.EventEmitter(),
            res = new events.EventEmitter();

        res.end = function(result) {
            test.equal(result, undefined, 'should be undefined');
        };

        action.processAction(new Context(req, res), testAction);
    },

    'test action completed with string' : function(test) {
        var testAction = function(ctx) {
            ctx.done('hello world');
            test.equal(ctx.isDone(), true, 'the context shold have been done');
        };

        var req = new events.EventEmitter(),
            res = new events.EventEmitter();

        res.end = function (result) {
            test.equal('hello world', result);
            test.done();
        }

        action.processAction(new Context(req, res), testAction);
    },

    'test action completed with object' : function(test) {
        var testAction = function(ctx) {
            ctx.done({foo: 'bar'});
            test.equal(ctx.isDone(), true, 'the context shold have been done');
        };

        var req = new events.EventEmitter(),
            res = new events.EventEmitter();
            _render = template.render;

        template.render = function(result) {
            return mustache.to_html('hello world, {{foo}}', result);
        };
        res.end = function (result) {
            test.equal('hello world, bar', result);
            test.done();
        }

        action.processAction(new Context(req, res), testAction);

        template.render = _render;
    }

});

