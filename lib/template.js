var _ = require('underscore'),
    mustache = require('mustache'),
    utils = require('./utils');

exports.render = function(request, resultObj) {
    //todo: get template from file system.
    mustache.to_html('', resultObj);
}
