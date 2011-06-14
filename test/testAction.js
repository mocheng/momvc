var action = require('../lib/action'),
    template = require('../lib/template'),
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
            ctx.end();
            test.equal(ctx.isDone(), true, 'the context shold have been done');
        };

        var req = new events.EventEmitter(),
            res = new events.EventEmitter();

        res.end = function(result) {
            test.equal(result, undefined, 'should be undefined');
        };

        action.processAction(req, res, testAction);
        test.done();
    },

    'test action completed asynchronously' : function(test) {
        test.expect(3);

        var testAction = function(ctx) {
            setTimeout(function() {
                ctx.end();
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

        action.processAction(req, res, testAction);
    },

    'test action completed with string' : function(test) {
        var testAction = function(ctx) {
            ctx.end('hello world');
            test.equal(ctx.isDone(), true, 'the context shold have been done');
        };

        var req = new events.EventEmitter(),
            res = new events.EventEmitter();

        res.end = function (result) {
            test.equal('hello world', result);
            test.done();
        }

        action.processAction(req, res, testAction);
    },

    'test action completed with object' : function(test) {
        var testAction = function(ctx) {
            ctx.end({foo: 'bar'});
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

        action.processAction(req, res, testAction);

        template.render = _render;
    }

});

