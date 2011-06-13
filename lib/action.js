var _ = require('underscore'),
    utils = require('./utils');

Context = utils.buildClass(null, 
function(req, res) {
    this.request = req;
    this.response = res;
},
{
    end: function() {
        this.done();
    },

    done: function() {
        this._isDone = true;
    },

    isDone: function() {
        return this._isDone;
    }
},
{
});

exports.processAction = function(req, res, action) {
    var context = new Context(req, res);

    if (!(action instanceof Function)) {
        throw new Error('action should be function');
    }

    try {
        action(context);
    } catch (e) {
        //TODO: handle error
        throw e;
    }
};


