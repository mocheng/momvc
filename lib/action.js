var _ = require('underscore'),
    template = require('./template'),
    utils = require('./utils');

Context = utils.buildClass(null,
function(req, res) {
    this.request = req;
    this.response = res;
},
{
    end: function(result) {
        if (result === []._ || result === null) {
            this.response.end();
        } else if (_.isString(result)) {
            this.response.end(result);
        } else {
            this.response.end(template.render(result));
        }
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

    if (!(typeof action == 'function')) {
        throw new Error('action should be function');
    }

    try {
        action(context);
    } catch (e) {
        //TODO: handle error
        throw e;
    }
};


