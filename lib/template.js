var _ = require('underscore'),
    mustache = require('mustache'),
    utils = require('./utils');

var _viewTemplates = {};

exports.render = function(routePath, resultObj) {
    var template = _viewTemplates[routePath];
    if (!template) {
        throw new Error('non-existent route path: ' + routePath);
    }

    return mustache.to_html(template, resultObj);
}

exports.addView = function(routePath, template) {
    _viewTemplates[routePath] = template;
}

exports.clearViews = function() {
    _viewTemplates = {};
}

