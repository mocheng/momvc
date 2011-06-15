var _ = require('underscore'),
    url = require('url'),
    route = require('./route'),
    utils = require('./utils');

exports.Dispatch = utils.buildClass(null,
function(route) {
    this._route = route;
},
// prototype properties
{
    dispatch: function(req, res) {
        var urlInfo,
            matchRoute,
            routePath,
            targetAction,
            context = new Context(req, res);

        urlInfo = url.parse(req.url);

        matchRoute = this._route.find(urlInfo.pathname);
        if (!matchRoute) {
            console.log('routing failed');
            utils.respond404(res);
            return;
        }

        routePath = matchRoute.arguments.module + '/' + matchRoute.arguments.action;

        //todo: get action method
        //
        //targetAction = require(routePath);

        action.processAction(context, targetAction);
    }
});

