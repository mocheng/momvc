var nodeunit = require('nodeunit'),
    utils = require('../lib/utils')

exports['test utils'] = nodeunit.testCase({
    setUp: function(cb) {
        cb();
    },

    tearDown: function(cb) {
        cb();
    },

    'test buildClass with members' : function(test) {
        var newClass = utils.buildClass(null, null,
            {
                foo: 'foo xx'
            }, {
                bar: 'bar xx'
            }),
            newObj = new newClass();

        test.equal(newObj.foo, 'foo xx', 'prototype property foo should be assigned'); 
        test.equal(newClass.bar, 'bar xx', 'static property bar should be assigned'); 
        test.done();
    },

    'test buildClass with ctor' : function(test) {
        var newClass = utils.buildClass(null, function(foo, bar){
                this.foo = foo;
                this.bar = bar;
            });
            newObj = new newClass('foo xx', 'bar xx');

        test.equal(newObj.foo, 'foo xx', 'prototype property foo should be assigned'); 
        test.equal(newObj.bar, 'bar xx', 'prototype property bar should be assigned'); 
        test.done();
    }


});

