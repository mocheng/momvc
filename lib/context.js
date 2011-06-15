var _ = require('underscore'),
    template = require('./template'),
    utils = require('./utils');

exports.Context = utils.buildClass(null,
function(req, res) {
    this.request = req;
    this.response = res;
},
{
    done: function(result) {
        if (result === []._ || result === null) {
            this.response.end();
        } else if (_.isString(result)) {
            this.response.end(result);
        } else {
            this.response.end(template.render(result));
        }

        this._isDone = true;
    },

    isDone: function() {
        return this._isDone;
    }
},
{
});


