var fs = require('fs'),
    _ = require('underscore'),
    utils = require('./utils');

/**
 * match like Rails
 */
function match(route, path) {
    //console.log('path=' + path);
    //console.log('route.regex=' + route.regex);

    var matches = path.match(route.regex),
        matchRoute;

    //console.log('matches=' + matches);

    if (!matches) return []._; // return undefined
    matches.shift();

    matchRoute = _.clone(route);
    appendArguments(matchRoute);

    _.each(matches, function(m, i) {
        matchRoute.arguments[route.parameterName[i]] = m;
    });

    return matchRoute;
}

function appendArguments(route) {
    route.arguments = {};

    _.each(route.params, function(v, k) {
        route.arguments[k] = v;
    });
}

module.exports = utils.buildClass(null,
//constructor
function(config) {
    var hasModule, hasAction;

    this._config = _.clone(config);

    _.each(this._config, function(route) {
        route.parameterName = [];
        route.regex = route.path.replace(/:([^\/]*)/g, function(m, g1) {
            hasModule = hasModule || g1 == 'module';
            hasAction = hasAction || g1 == 'action';

            route.parameterName.push(g1);
            return '([^/]*)';
        });
        route.regex = '^' + route.regex + '$';
        //console.log(route.regex);
        //

        if (route.params) {
            hasModule = hasModule || ('module' in route.params);
            hasAction = hasAction || ('action' in route.params);
        }

        if (!hasModule || !hasAction) {
            throw new Error('missing module & action for route ' + route.name);
        }
    });
},
{
    find : function(path) {
        var matchRoute;
        _.detect(this._config, function(route) {
            if (route.path == path) {
                matchRoute = _.clone(route);
                appendArguments(matchRoute);
            } else {
                matchRoute = match(route, path);
            }
            return matchRoute;
        });
        return matchRoute;
    },
});

