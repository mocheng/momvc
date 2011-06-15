var _ = require('underscore'),
    template = require('./template'),
    utils = require('./utils');

exports.processAction = function(context, action) {
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


