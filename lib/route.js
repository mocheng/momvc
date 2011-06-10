var fs = require('fs'),
    _ = require('underscore');

var Route = exports.Route = function(config) {
    this._config = _.clone(config);

    _.each(this._config, function(route) {
        route.parameterName = [];
        route.regex = route.path.replace(/:([^\/]*)/g, function(m, g1) {
            route.parameterName.push(g1);
            return '([^/]*)';
        });
        route.regex = '^' + route.regex + '$';
        //console.log(route.regex);
    });
};

/**
 * match like Rails
 */
function match(route, path) {
    //console.log('route.regex=' + route.regex);
    var matches = path.match(route.regex),
        matchRoute;

    if (!matches) return []._; // return undefined
    matches.shift();

    matchRoute = _.clone(route);
    matchRoute.arguments = {};

    _.each(matches, function(m, i) {
        matchRoute.arguments[route.parameterName[i]] = m;
    });
    return matchRoute;
}

Route.prototype.find = function(path) {
    var matchRoute;
    _.detect(this._config, function(route) {
        if (route.path == path) {
            matchRoute = route;
        } else {
            matchRoute = match(route, path);
        }
    });
    return matchRoute;
};

