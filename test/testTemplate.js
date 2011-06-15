var template = require('../lib/template'),
    nodeunit = require('nodeunit');

exports['test route'] = nodeunit.testCase({
    setUp: function(cb) {
        template.clearViews();
        cb();
    },

    tearDown: function(cb) {
        cb();
    },

    'test render nonexistent ': function(test) {
        test.throws(function() {template.render('abc', {});});
        test.done();
    },

    'test render': function(test) {
        template.addView('c/a', 'hello world {{foo}}');

        test.equal(template.render('c/a', {foo: 'bar'}), 'hello world bar');
        test.done();
    }

});
