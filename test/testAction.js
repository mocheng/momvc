var action = require('../lib/action'),
    events = require('events'),
    nodeunit = require('nodeunit');

exports['test action'] = nodeunit.testCase({
    setUp: function(cb) {
        cb();
    },

    tearDown: function(cb) {
        cb();
    },

    'test action complete immediately' : function(test) {
        var testAction = function(ctx) {
            ctx.end();
            test.equal(ctx.isDone(), true, 'the context shold have been done');
        };

        var req = new events.EventEmitter(),
            res = new events.EventEmitter();

        action.processAction(req, res, testAction);
        test.done();
    },

    'test action completed asynchronously' : function(test) {
        test.expect(2);

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

        action.processAction(req, res, testAction);
    }
});

